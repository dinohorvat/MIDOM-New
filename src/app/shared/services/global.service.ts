import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class GlobalService {
    constructor(public snackBar: MatSnackBar) { }

    showNotice(message) {
        this.snackBar.open(message, 'Close', { duration: 2000 });
    }
}

