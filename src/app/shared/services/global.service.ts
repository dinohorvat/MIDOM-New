import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {CrMessageModel} from '../models/cr-message.model';
import {ConsultationRequestsService} from './medical-specialist/consultation-requests.service';
import {ConsultationRequestModel} from '../models/consultation-request.model';

@Injectable()
export class GlobalService {
    crMessageList: CrMessageModel[] = [];
    crId: string = '';
    crStatus: string = '';
    consultationRequestList: ConsultationRequestModel[] = [];
    dicomImages: any = [];
    constructor(public snackBar: MatSnackBar, private consultationRequestService: ConsultationRequestsService) { }

    showNotice(message) {
        this.snackBar.open(message, 'Close', { duration: 2000 });
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

    setConsultationRequest(request){
        this.consultationRequestList = request;
    }
}

