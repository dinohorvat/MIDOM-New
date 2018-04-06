import {Component, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {AccountService} from '../../../../shared/services/medical-specialist/account.service';
import {GlobalService} from '../../../../shared/services/global.service';
import {ThemeService} from '../../../../shared/services/theme.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  public hasBaseDropZoneOver: boolean = false;
  constructor(private accountService: AccountService,private globalService: GlobalService,
              private themeService: ThemeService, private renderer: Renderer2) { }
    console = console;
    passwordForm: FormGroup;
    egretThemes: any[] = [];

    ngOnInit() {
        this.egretThemes = this.themeService.egretThemes;
        console.log(this.themeService.activatedTheme);
        let password = new FormControl('', Validators.required);
        let confirmPassword = new FormControl('', CustomValidators.equalTo(password));
        this.passwordForm = new FormGroup({
            password: password,
            confirmPassword: confirmPassword
        })
    }

    changePassword(){
        console.log(this.passwordForm);
      let data = {
          password: this.passwordForm.value.password,
          repeatedPassword: this.passwordForm.value.password
      };
      Promise.resolve(this.accountService.changePassword(data).then(res =>{
          this.globalService.showNotice(res.message);
      }).catch(err =>{
          console.log(err);
      }))
    }
    changeTheme(theme) {
        this.themeService.changeTheme(this.renderer, theme);
    }


}
