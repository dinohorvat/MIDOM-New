import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {ConsultationRequestModel} from '../../../shared/models/consultation-request.model';
import {CrMessageModel} from '../../../shared/models/cr-message.model';
import {ConsultationRequestsService} from '../../../shared/services/medical-specialist/consultation-requests.service';
import {GlobalService} from '../../../shared/services/global.service';
import {NgxTablePopupComponent} from '../ngx-table-popup/ngx-table-popup.component';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {AppConfirmService} from '../../../shared/services/app-confirm/app-confirm.service';
import {AppLoaderService} from '../../../shared/services/app-loader/app-loader.service';
import {StudyService} from '../../../shared/services/medical-specialist/study.service';
import {AccountService} from '../../../shared/services/medical-specialist/account.service';
import {CornerstoneService} from '../../../shared/services/cornerstone.service';
import * as JSZip from 'jszip';

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
    activeCr: any;
    imageData: any;

    ngOnInit() {
        this.getConsultationRequest("Pending");
        // this.csS.fetchDicomImage(`http://localhost:4200/assets/slika.dcm`)
        //     .subscribe(res =>  this.imageData = res);
    }

    statusChange(status){
        this.getConsultationRequest(status.value);
    }

    constructor(private consultationRequestService: ConsultationRequestsService,
                private router: Router,
                private studyService: StudyService,
                public globalService: GlobalService,
                private dialog: MatDialog,
                private snack: MatSnackBar,
                private confirmService: AppConfirmService,
                private loader: AppLoaderService,
                private accountService: AccountService,
                private csS: CornerstoneService) {
    }

    showStudy(data) {
        this.activeCr = data.id;
        this.globalService.crStatus = data.status;
        this.getCrMessages(this.activeCr);
        console.log(data);
            Promise.resolve(this.studyService.fetchStudy(data.study).then(studyRes =>{
                Promise.resolve(this.accountService.fetchAccountDetails(studyRes.message.ownerId).then(res=>{
                    studyRes.message.studyOwner = res.message;
                    console.log("STUDY");
                    console.log(studyRes);
                    let title = 'Study Information';
                    let dialogRef: MatDialogRef<any> = this.dialog.open(NgxTablePopupComponent, {
                        width: '720px',
                        disableClose: false,
                        data: {dicom:false, title: title, payload: studyRes.message, activeCr:this.activeCr}
                    });
                    dialogRef.afterClosed()
                        .subscribe(res => {
                            console.log(res);
                            if(res == 'reject'){
                                this.getConsultationRequest("Pending");
                            }
                        });

                }).catch(err=>{

                }));

            }).catch(err=>{

            }));


    }
    showImages(data){
        Promise.resolve(this.studyService.fetchDICOMImages(data.study)).then(res =>{
            let title = 'Study Information / DICOM';
            let dialogRef: MatDialogRef<any> = this.dialog.open(NgxTablePopupComponent, {
                width: '100%',
                height: '100%',
                disableClose: false,
                data: {dicomArr:res, dicom:true, title: title,  payload: {}, activeCr:this.activeCr}
            });
        }).catch(err => {

        });
    }

    getConsultationRequest(status) {
        this.consultationRequestList = [];
        Promise.resolve(this.consultationRequestService
            .fetchConsultationRequest(status).then(res => {
                this.consultationRequestList = res.message;
                this.consultationRequestList.reverse();
                if(status == "Pending"){
                }
                console.log(this.consultationRequestList);
            }).catch(err => {
                console.log(err);
            }))
    }
    getCrMessages(id) {
        this.crMessageList = [];
        Promise.resolve(this.consultationRequestService
            .fetchCrMessages(id).then(res => {
                this.crMessageList = res.message;
                console.log(this.crMessageList);
                this.globalService.crMessageList = this.crMessageList;
                this.globalService.crId = id;
            }).catch(err => {
                console.log(err);
            }))
    }

    }

