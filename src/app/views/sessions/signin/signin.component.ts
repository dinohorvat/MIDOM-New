import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../../shared/services/login.service';
import {isNullOrUndefined} from "util";
import {GlobalService} from '../../../shared/services/global.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;
  returnUrl: string;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private loginService: LoginService, private globalService: GlobalService ) { }

  ngOnInit() {
      // Ensures the User is logged out upon visiting Sign In page
      localStorage.removeItem("midom_user");

      this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
      console.log(this.returnUrl);
      this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    })
  }

  signin() {
    const signinData = this.signinForm.value;
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
    let user = {
      username: signinData.username,
      password: signinData.password
    };
      Promise.resolve(this.loginService.login(user)
          .then(response => {
              let res: any = response;
              localStorage.setItem("midom_user", JSON.stringify(user));
              console.log(response);
              if (res.code == 0) {
                  if(!isNullOrUndefined(this.returnUrl)){
                      this.router.navigate([this.returnUrl]);
                      return true;
                  }
                  this.router.navigate(['main'], {relativeTo: this.route.parent});
              }
              else {
                  this.globalService.showNotice(res.message);
                  //this.globalService.typeError("Please check your credentials", "Wrong Username / Password!");
              }
          }).catch(err => {
              //this.globalService.typeError("Please try again later", "Something went wrong!");
              console.log(err.message || err);
          })
      );
    this.submitButton.disabled = false;
    this.progressBar.mode = 'determinate';
  }

}
