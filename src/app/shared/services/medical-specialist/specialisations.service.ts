import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import 'rxjs/add/operator/toPromise';
import {Router} from "@angular/router";

@Injectable()
export class SpecialisationsService {


    constructor(private http: HttpClient, private router: Router) {
    }

    fetchAllSpecialisations(): Promise<any> {
        let url = environment.endpoint + '/ms/getAllSpecialisations';
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
    fetchSpecialisation(id): Promise<any> {
        let url = environment.endpoint + '/ms/getSpecialisations/'+id;
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
    updateSpecialisations(data): Promise<any> {
        let url = environment.endpoint + '/ms/updateSpecialisations';
        return this.http.post(url,data)
            .toPromise()
            .then(response => {
                var data:any = response;
                return data as any
            })
            .catch(this.handleError);
    }
    public handleError(error: any): Promise<any> {
        if(error.indexOf('404 OK') >=0) {
            return null;
        } else {
            console.log("HTTP error response received:")
            console.log(error);
            // this.globalService.showErrorMessage("HTTP request error " + error.status + " occured. " + error._body);
            return Promise.reject(error);
        }

    }
}