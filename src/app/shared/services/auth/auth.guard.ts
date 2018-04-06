import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(public auth: AuthService, public router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['sessions/signin'], { queryParams: { returnUrl: state.url }});
            return false;
        }
        return true;
    }
}