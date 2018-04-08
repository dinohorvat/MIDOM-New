import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import 'rxjs/add/operator/toPromise';
import {Router} from "@angular/router";
import {ResponseContentType} from "@angular/http";
import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
import {AppLoaderService} from '../app-loader/app-loader.service';

@Injectable()
export class StudyService {


    constructor(private http: HttpClient, private router: Router, private loader: AppLoaderService,
    ) {
    }
    fetchStudy(id): Promise<any> {
        let url = environment.endpoint + '/ms/getStudy/'+id;
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
    fetchDICOMImages(id){
        let url = environment.endpoint + '/ms/getStudyArchiveUncompressed/'+id;
        return this.http.get(url,{responseType: "blob"})
            .toPromise()
            .then(re_ => {
                this.loader.changeTitle("Unzipping images. Please wait...");
                var data_:any = re_;
                if(data_.code == 1){
                    localStorage.removeItem("midom_user");
                    this.router.navigate(['sessions/signin']);
                    return false;
                }
                let imgURLS = JSZip.loadAsync(data_).then(function (zip) {
                    var re = /(.dcm)$/;
                    var promises = Object.keys(zip.files).filter(function (fileName) {
                        // don't consider non image files
                        return re.test(fileName.toLowerCase());
                    }).map(function (fileName) {
                        var file = zip.files[fileName];
                        return file.async("blob").then(function (blob) {
                            return [
                                fileName,  // keep the link between the file name and the content
                                URL.createObjectURL(blob) // create an url. img.src = URL.createObjectURL(...) will work
                            ];
                        });
                    });
                    // `promises` is an array of promises, `Promise.all` transforms it
                    // into a promise of arrays
                    return Promise.all(promises);
                }).then(function (result) {
                    console.log("ARRAYRES");
                    // we have here an array of [fileName, url]
                    // if you want the same result as imageSrc:
                    return result;
                }).catch(function (e) {
                    console.error(e);
                });
                return imgURLS as any
            })
            .catch(this.handleError);
    }


    fetchDICOM(id){
        Promise.resolve(this.fetchStudyArchiveUncompressed(id).then(
            res =>{
                console.log("UTILs");
                //     JSZip.loadAsync(res).then(function (zip) {
                //         console.log("ZIPFILE");
                //         console.log(zip.files)
                // });
                JSZip.loadAsync(res).then(function (zip) {
                    var re = /(.dcm|.png|.gif|.ps|.jpeg)$/;
                    var promises = Object.keys(zip.files).filter(function (fileName) {
                        // don't consider non image files
                        return re.test(fileName.toLowerCase());
                    }).map(function (fileName) {
                        var file = zip.files[fileName];
                        return file.async("blob").then(function (blob) {
                            return [
                                fileName,  // keep the link between the file name and the content
                                URL.createObjectURL(blob) // create an url. img.src = URL.createObjectURL(...) will work
                            ];
                        });
                    });
                    // `promises` is an array of promises, `Promise.all` transforms it
                    // into a promise of arrays
                    return Promise.all(promises);
                }).then(function (result) {
                    // we have here an array of [fileName, url]
                    // if you want the same result as imageSrc:
                    return result.reduce(function (acc, val) {
                        acc[val[0]] = val[1];
                        console.log(acc);
                        return acc;
                    }, {});
                }).catch(function (e) {
                    console.error(e);
                });
            }
        ).catch(err =>{

        }));
    }

    fetchStudyArchiveUncompressed(id): Promise<any> {
        let url = environment.endpoint + '/ms/getStudyArchiveUncompressed/'+id;
        return this.http.get(url,{responseType: "blob"})
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
    fetchStudyArchiveCompressed(id): Promise<any> {
        let url = environment.endpoint + '/ms/getStudyArchiveCompressed/'+id;
        return this.http.get(url,{responseType: "blob"})
            .toPromise()
            .then(response => {
                var data:any = response;

                if(data.code == 1){
                    localStorage.removeItem("midom_user");
                    this.router.navigate(['sessions/signin']);
                    return false;
                }
                return data as any
            })
            .catch(this.handleError);
    }
    public handleError(error: any): Promise<any> {
            // this.globalService.showErrorMessage("HTTP request error " + error.status + " occured. " + error._body);
            return Promise.reject(error);
    }
}