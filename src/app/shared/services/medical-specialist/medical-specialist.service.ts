import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import 'rxjs/add/operator/toPromise';
import {Router} from "@angular/router";

@Injectable()
export class MedicalSpecialistService {


    constructor(private http: HttpClient, private router: Router) {
    }

    fetchUser(): Promise<any> {
        let url = environment.endpoint + '/ms/accountDetails';
        return this.http.get(url)
            .toPromise()
            .then(response => {
                var data:any = response;
                console.log(data);
                if(data.code == 1){
                    localStorage.removeItem("midom_user");
                    this.router.navigate(['sessions/signin']);
                    return false;
                }
                return data as any
            })
            .catch(this.handleError);
    }
    updateUser(data): Promise<any> {
        let url = environment.endpoint + '/ms/changeAccountDetails';
        return this.http.post(url, data)
            .toPromise()
            .then(response => {
                var data:any = response;
                console.log(data);
                if(data.code == 1){
                    localStorage.removeItem("midom_user");
                    this.router.navigate(['sessions/signin']);
                    return false;
                }
                return data as any
            })
            .catch(this.handleError);
    }


    changeStatus(data): Promise<any> {
        let url = environment.endpoint + '/ms/changeStatus';
        return this.http.post(url,data)
            .toPromise()
            .then(response => {
                var data:any = response;
                console.log(response);
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