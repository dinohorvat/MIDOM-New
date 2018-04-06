import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MedicalSpecialistService} from '../../../shared/services/medical-specialist/medical-specialist.service';
import {MedicalSpecialistModel} from '../../../shared/models/medical-specialist.model';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private medicalSpecialistService: MedicalSpecialistService) { }

  user: MedicalSpecialistModel = new MedicalSpecialistModel();
  isAvailable: boolean = false;
  ngOnInit() {
    this.getUser();
      this.router.navigate(['/dashboard/profile-overview']);
  }

    getUser(){
        Promise.resolve(this.medicalSpecialistService.fetchUser())
            .then(response => {
                let res: any = response;
                this.user = res.message;
                this.isAvailable = this.user.isAvailable;
            }).catch(err => {
            console.log(err);
        })

    }
    changeStatus(state){
        let currStatus;
        if(state.checked){
            currStatus = 'available';
        }
        else{
            currStatus = 'not available';
        }
        let data = {
            status: currStatus
        };
        console.log(data);
        Promise.resolve(this.medicalSpecialistService.changeStatus(data))
            .then(response => {

            }).catch(err => {
            console.log(err);
        })
    }


}
