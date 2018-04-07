import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable()
export class AccountService {

    constructor(private http: HttpClient, private router: Router) {
    }

    fetchAccountDetails(id): Promise<any> {
        let url = environment.endpoint + '/ms/getAccount/' + id;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                var data: any = response;
                if (data.code == 1) {
                    localStorage.removeItem("midom_user");
                    this.router.navigate(['sessions/signin']);
                    return false;
                }
                return data as any
            })
            .catch(this.handleError);
    }
    changeAccountDetails(data): Promise<any> {
        let url = environment.endpoint + '/ms/changeAccountDetails';
        return this.http.post(url, data)
            .toPromise()
            .then(response => {
                var data: any = response;
                if (data.code == 1) {
                    localStorage.removeItem("midom_user");
                    this.router.navigate(['sessions/signin']);
                    return false;
                }
                console.log(data);
                return data as any
            })
            .catch(this.handleError);
    }
    changePassword(data): Promise<any> {
        let url = environment.endpoint + '/ms/changePassword';
        return this.http.post(url, data)
            .toPromise()
            .then(response => {
                var data: any = response;
                if (data.code == 1) {
                    localStorage.removeItem("midom_user");
                    this.router.navigate(['sessions/signin']);
                    return false;
                }
                console.log(data);
                return data as any
            })
            .catch(this.handleError);
    }

    public handleError(error: any): Promise<any> {
        console.log("HTTP error response received:")
        console.log(error);
        // this.globalService.showErrorMessage("HTTP request error " + error.status + " occured. " + error._body);
        return Promise.reject(error);


    }
}