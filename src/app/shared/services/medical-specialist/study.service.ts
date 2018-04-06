// import {Injectable} from "@angular/core";
// import {HttpClient} from "@angular/common/http";
// import {environment} from "../../../../environments/environment";
// import 'rxjs/add/operator/toPromise';
// import {Router} from "@angular/router";
// import {ResponseContentType} from "@angular/http";
// import * as JSZip from 'jszip';
// import * as JSZipUtils from 'jszip-utils';
//
// @Injectable()
// export class StudyService {
//
//
//     constructor(private http: HttpClient, private router: Router) {
//     }
//     fetchStudy(id): Promise<any> {
//         let url = environment.endpoint + '/ms/getStudy/'+id;
//         return this.http.get(url)
//             .toPromise()
//             .then(response => {
//                 var data:any = response;
//                 console.log(data);
//                 if(data.code == 1){
//                     localStorage.removeItem("midom_user");
//                     this.router.navigate(['login']);
//                     return false;
//                 }
//                 return data as any
//             })
//             .catch(this.handleError);
//     }
//
//     fetchDICOM(id){
//         Promise.resolve(this.fetchStudyArchiveUncompressed(id).then(
//             res =>{
//                 console.log("UTILs");
//
//                     JSZip.loadAsync(res).then(function (zip) {
//                         console.log("data")
//                         console.log(zip.files)
//                 });
//             }
//         ).catch(err =>{
//
//         }));
//     }
//
//     fetchStudyArchiveUncompressed(id): Promise<any> {
//         let url = environment.endpoint + '/ms/getStudyArchiveUncompressed/'+id;
//         return this.http.get(url,{responseType: "blob"})
//             .toPromise()
//             .then(response => {
//                 var data:any = response;
//                 console.log(data);
//                 if(data.code == 1){
//                     localStorage.removeItem("midom_user");
//                     this.router.navigate(['login']);
//                     return false;
//                 }
//                 return data as any
//             })
//             .catch(this.handleError);
//     }
//     fetchStudyArchiveCompressed(id): Promise<any> {
//         let url = environment.endpoint + '/ms/getStudyArchiveCompressed/'+id;
//         return this.http.get(url,{responseType: "blob"})
//             .toPromise()
//             .then(response => {
//                 var data:any = response;
//
//                 if(data.code == 1){
//                     localStorage.removeItem("midom_user");
//                     this.router.navigate(['login']);
//                     return false;
//                 }
//                 return data as any
//             })
//             .catch(this.handleError);
//     }
//     public handleError(error: any): Promise<any> {
//             // this.globalService.showErrorMessage("HTTP request error " + error.status + " occured. " + error._body);
//             return Promise.reject(error);
//
//
//     }
// }