import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) {
    }

    login(user): Promise<any[]> {
        let url = environment.endpoint + '/ms/login';
        return this.http.post(url, user)
            .toPromise()
            .then(response => {
                let data = response;
                return data as any
            })
            .catch(this.handleError);
    }
    logout(): Promise<any> {
        let url = environment.endpoint + '/ms/logout';
        return this.http.get(url)
            .toPromise()
            .then(response => {
                let data = response;
                return data as any
            })
            .catch(this.handleError);
    }
    public handleError(error: any): Promise<any> {
            console.log("HTTP error response received:");
            console.log(error);
            // this.globalService.showErrorMessage("HTTP request error " + error.status + " occured. " + error._body);
            return Promise.reject(error);
        }


}