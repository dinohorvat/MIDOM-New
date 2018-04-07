import { Component, OnInit } from '@angular/core';
import {ConsultationRequestsService} from '../../../../shared/services/medical-specialist/consultation-requests.service';
import {ConsultationRequestModel} from '../../../../shared/models/consultation-request.model';
import {AccountService} from '../../../../shared/services/medical-specialist/account.service';
import {SpecialisationModel} from '../../../../shared/models/medical-specialist.model';
import {MedicalSpecialistService} from '../../../../shared/services/medical-specialist/medical-specialist.service';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.css']
})
export class ProfileOverviewComponent implements OnInit {

  consultationRequestList: ConsultationRequestModel[] = [];

  userSpecialisations: SpecialisationModel = new SpecialisationModel();
  constructor(private consultationRequestsService: ConsultationRequestsService,
              private accountService: AccountService,
              private medicalSpecialistsService: MedicalSpecialistService) { }

  ngOnInit() {
    this.getUser();
    this.getConsultationRequest("Pending");
    this.getConsultationRequest("Consulted");
  }

    getConsultationRequest(status) {
    if(this.consultationRequestList.length === 5){
      return true;
    }
        Promise.resolve(this.consultationRequestsService
            .fetchConsultationRequest(status).then(res => {
                if(res.message.length > 0){
                    res.message.reverse();
                    for(let item of res.message){
                        Promise.resolve(this.accountService.fetchAccountDetails(item.studyOwner).then(res=>{
                            item.owner = res.message;
                            if(this.consultationRequestList.length ===5){
                                return true;
                            }
                            this.consultationRequestList.push(item);
                        }).catch(err=>{

                        }));
                }
              }
                console.log(this.consultationRequestList);
            }).catch(err => {
                console.log(err);
            }))
    }

    getUser(){
        Promise.resolve(this.medicalSpecialistsService.fetchUser())
            .then(response => {
                let res: any = response;
                this.userSpecialisations = res.message.specialisations;
            }).catch(err => {
            console.log(err);
        })

    }


}
