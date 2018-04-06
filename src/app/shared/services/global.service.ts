import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {CrMessageModel} from '../models/cr-message.model';

@Injectable()
export class GlobalService {
    crMessageList: CrMessageModel[] = [];
    crId: string = '';
    constructor(public snackBar: MatSnackBar) { }

    showNotice(message) {
        this.snackBar.open(message, 'Close', { duration: 2000 });
    }
}

