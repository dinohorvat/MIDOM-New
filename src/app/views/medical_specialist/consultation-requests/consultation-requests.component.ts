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

declare var cornerstone: any;
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
    @ViewChild('abc') abc;

    dynamicImage:any;
    ngOnInit() {
        this.dynamicImage = {
            imageId: "notneeded",
            minPixelValue: 0,
            maxPixelValue: 255,
            slope: 1.0,
            intercept: 0,
            windowCenter: 127,
            windowWidth: 256,
            render: cornerstone.renderGrayscaleImage,
            getPixelData: this.getPixelData,
            rows: 256,
            columns: 256,
            height: 256,
            width: 256,
            color: false,
            columnPixelSpacing: 1.0,
            rowPixelSpacing: 1.0,
            invert: false,
            sizeInBytes: 256 * 256 * 2,
            data: {
                opacity: 0.5
            }
        };

        console.log(this.dynamicImage);
        this.getConsultationRequest("Pending");
        cornerstone.enable(this.abc.nativeElement);
        cornerstone.displayImage(this.abc.nativeElement, this.dynamicImage);


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
                private accountService: AccountService) {
    }

    showStudy(data) {
        this.activeCr = data.id;
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
                        disableClose: true,
                        data: {dicom:false, title: title, payload: studyRes.message, activeCr:this.activeCr}
                    });

                }).catch(err=>{

                }));

            }).catch(err=>{

            }));


    }
    showImages(data){
        let title = 'Study Information';
        let dialogRef: MatDialogRef<any> = this.dialog.open(NgxTablePopupComponent, {
            width: '720px',
            disableClose: true,
            data: {dicom:true, title: title,  payload: {}, activeCr:this.activeCr}
        });
        Promise.resolve(this.studyService.fetchDICOM(data.study)).then(res =>{

        }).catch(err => {

        });
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
     getPixelData() {
        const width = 256;
        const height = 256;
        const numPixels = width * height;
        const pixelData = new Uint16Array(numPixels);
        let index = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                pixelData[index] = ((x) % 256) * 1;
                index++;
            }
        }
        console.log(pixelData);
        return pixelData;
    }
    }

