import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";

@Injectable()
export class ConsultationRequestsService {

    constructor(private http: HttpClient, private router: Router) {
    }

    fetchConsultationRequest(status): Promise<any> {
        let url = environment.endpoint + '/ms/getCr/'+status;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                var data:any = response;
                if(data.code == 1){
                    localStorage.removeItem("midom_user");
                    this.router.navigate(['sessions/signin']);
                    return false;
                }
                console.log(data);
                return data as any
            })
            .catch(this.handleError);
    }
    fetchCrMessages(id): Promise<any> {
        let url = environment.endpoint + '/ms/geCrMessages/'+id;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                var data:any = response;
                if(data.code == 1){
                    localStorage.removeItem("midom_user");
                    this.router.navigate(['sessions/signin']);
                    return false;
                }
                console.log(data);
                return data as any
            })
            .catch(this.handleError);
    }
    acceptCr(data): Promise<any> {
        let url = environment.endpoint + '/ms/acceptRequest';
        console.log(data);
        return this.http.post(url, data)
            .toPromise()
            .then(response => {
                var data:any = response;
                if(data.code == 1){
                    localStorage.removeItem("midom_user");
                    this.router.navigate(['sessions/signin']);
                    return false;
                }
                console.log(data);
                return data as any
            })
            .catch(this.handleError);
    }
    rejectCr(data): Promise<any> {
        let url = environment.endpoint + '/ms/rejectRequest';
        console.log(data);
        return this.http.post(url, data)
            .toPromise()
            .then(response => {
                var data:any = response;
                if(data.code == 1){
                    localStorage.removeItem("midom_user");
                    this.router.navigate(['sessions/signin']);
                    return false;
                }
                console.log(data);
                return data as any
            })
            .catch(this.handleError);
    }
    newCrMessage(data): Promise<any> {
        let url = environment.endpoint + '/ms/setCrAnswer';
        console.log(data);
        return this.http.post(url, data)
            .toPromise()
            .then(response => {
                var data:any = response;
                if(data.code == 1){
                    localStorage.removeItem("midom_user");
                    this.router.navigate(['sessions/signin']);
                    return false;
                }
                console.log(data);
                return data as any
            })
            .catch(this.handleError);
    }
    uploadAudioFile(data,id, fileName?): Promise<any> {
        let url = environment.endpoint + '/ms/setCrAnswer';
        console.log(data);
        let tempData = {
            comment: fileName,
            crId: id
        };
        return this.http.post(url, tempData)
            .toPromise()
            .then(response => {
                console.log(response);
                var res:any = response;
                if(res.code == 1){
                    localStorage.removeItem("midom_user");
                    this.router.navigate(['sessions/signin']);
                    return false;
                }
                let commentId = res.message.id;
                let url = environment.endpoint + '/ms/uploadAudioFile/'+commentId;
                return this.http.post(url, data)
                    .toPromise()
                    .then(response => {
                        var data:any = response;
                        if(data.code == 1){
                            localStorage.removeItem("midom_user");
                            this.router.navigate(['sessions/signin']);
                            return false;
                        }
                        console.log(data);
                        return data as any
                    })
                    .catch(this.handleError);
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