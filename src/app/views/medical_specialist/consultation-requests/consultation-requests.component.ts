import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Router} from "@angular/router";
import {ConsultationRequestModel} from '../../../shared/models/consultation-request.model';
import {CrMessageModel} from '../../../shared/models/cr-message.model';
import {ConsultationRequestsService} from '../../../shared/services/medical-specialist/consultation-requests.service';
import {GlobalService} from '../../../shared/services/global.service';

@Component({
    selector: 'app-consultation-requests',
    templateUrl: './consultation-requests.component.html',
    styleUrls: ['./consultation-requests.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ConsultationRequestsComponent implements OnInit {


    consultationRequestList: ConsultationRequestModel[] = [];
    crMessageList: CrMessageModel[] = [];

    statusList: string[] =[
        "Pending","Accepted","Consulted", "Closed", "Rejected","Revoked"
    ];
    selectedStatus:string = "Pending";

    ngOnInit() {
        this.getConsultationRequest("Pending");
    }

    statusChange(status){
        this.getConsultationRequest(status.value);
    }

    constructor(private consultationRequestService: ConsultationRequestsService,
                private router: Router,
                public globalService: GlobalService) {
    }

    getConsultationRequest(status) {
        this.consultationRequestList = [];
        Promise.resolve(this.consultationRequestService
            .fetchConsultationRequest(status).then(res => {
                this.consultationRequestList = res.message;
                this.consultationRequestList.reverse();
                console.log(this.consultationRequestList);
            }).catch(err => {
                console.log(err);
            }))
    }
    getCrMessages(id) {
        console.log(id);
        this.crMessageList = [];
        Promise.resolve(this.consultationRequestService
            .fetchCrMessages(id).then(res => {
                this.crMessageList = res.message;
                console.log(this.crMessageList);
                // this.globalService.crMessageList = this.crMessageList;
                // this.globalService.crId = id;
                // this.router.navigate(['/main/chat']);
                // console.log(res.message);
            }).catch(err => {
                console.log(err);
            }))
    }

    acceptCr(id){
        let data = {
            requestId: id.toString()
        };
        Promise.resolve(this.consultationRequestService.acceptCr(data)
            .then(res => {
                this.getConsultationRequest("Pending");
                console.log(res);
            }).catch(err =>{
                    console.log(err);
                }
            ))
     }
     rejectCr(id){
        let data = {
            requestId: id.toString()
        };
        Promise.resolve(this.consultationRequestService.rejectCr(data)
            .then(res => {
                this.getConsultationRequest("Pending");
                console.log(res);
            }).catch(err =>{
                    console.log(err);
                }
            ))
     }
    }

