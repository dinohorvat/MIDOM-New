import { Injectable } from '@angular/core';
import {isNullOrUndefined} from 'util';
@Injectable()
export class AuthService {
    constructor() {}

    token:string = '';

    public isAuthenticated(): boolean {
        const storage:any = localStorage.getItem('midom_user');
        let currentUser:any = null;
        if(!isNullOrUndefined(storage) || storage != ''){
            currentUser = JSON.parse(storage);
        }
        // Check whether the token is expired and return
        if( currentUser != null && currentUser.username != null ){
            // Set Authorisation
            this.token = currentUser.username;
            return true
        }
        return false;
    }
}