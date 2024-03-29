import {Component, OnInit, Inject, ViewChild, ElementRef} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {StudyOwnerModel} from '../../../shared/models/consultation-request.model';
import {StudyModel} from '../../../shared/models/study.model';
import {ConsultationRequestsService} from '../../../shared/services/medical-specialist/consultation-requests.service';
import {GlobalService} from '../../../shared/services/global.service';
import {StudyService} from '../../../shared/services/medical-specialist/study.service';
import {CornerstoneService} from '../../../shared/services/cornerstone.service';
import {isNullOrUndefined} from 'util';

declare var cornerstone: any;
@Component({
  selector: 'app-ngx-table-popup',
  templateUrl: './ngx-table-popup.component.html'
})
export class NgxTablePopupComponent implements OnInit {
  public itemForm: FormGroup;

    study: StudyModel = new StudyModel();
    studyOwner: StudyOwnerModel = new StudyOwnerModel();
    activeCr: any;
    crStatus: string = '';
    currentImage = 0;
    allImages = 0;
    disableNextPrev:boolean = true;

    constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NgxTablePopupComponent>,
    private fb: FormBuilder,
    private consultationRequestService: ConsultationRequestsService,
    private globalService: GlobalService,
    private studyService: StudyService,
    private csS: CornerstoneService
  ) { }

    private dicomHolder: ElementRef;

    @ViewChild('dicomHolder') set content(content: ElementRef) {
        this.dicomHolder = content;
    }

  dynamicImage:any;
  imageData:any;
  ngOnInit() {
      console.log("DICOM___IMAGES");
      if(!isNullOrUndefined(this.data.dicomArr)){
      if(this.data.dicomArr.length == 0){
          this.globalService.showNotice("No available DICOM images for this study")
      }
      else{
          this.allImages = this.data.dicomArr.length;
          if(this.allImages > 1){
              this.disableNextPrev = false;
          }
          this.csS.fetchDicomImage(this.data.dicomArr[0][1])
              .subscribe(res =>  this.imageData = res);
      }
      }
    this.crStatus = this.globalService.crStatus;
    this.study = this.data.payload;
    this.studyOwner = this.data.payload.studyOwner;
    this.activeCr = this.data.activeCr;
    this.buildItemForm(this.data.payload);
    console.log(this.data.payload);

      // this.dynamicImage = {
      //     imageId: "notneeded",
      //     minPixelValue: 0,
      //     maxPixelValue: 255,
      //     slope: 1.0,
      //     intercept: 0,
      //     windowCenter: 127,
      //     windowWidth: 256,
      //     render: cornerstone.renderGrayscaleImage,
      //     getPixelData: this.getPixelData,
      //     rows: 256,
      //     columns: 256,
      //     height: 256,
      //     width: 256,
      //     color: false,
      //     columnPixelSpacing: 1.0,
      //     rowPixelSpacing: 1.0,
      //     invert: false,
      //     sizeInBytes: 256 * 256 * 2,
      //     data: {
      //         opacity: 0.5
      //     }
      // };

      // console.log(this.dynamicImage);
      // cornerstone.enable(this.dicomHolder.nativeElement);
      // cornerstone.displayImage(this.dicomHolder.nativeElement, this.dynamicImage);
  }


  buildItemForm(item) {
    this.itemForm = this.fb.group({
      name: [item.name || '', Validators.required],
      age: [item.age || ''],
      email: [item.email || ''],
      company: [item.company || ''],
      phone: [item.phone || ''],
      address: [item.address || ''],
      balance: [item.balance || ''],
      isActive: [item.isActive || false]
    })
  }

  close() {
    this.dialogRef.close(this.itemForm.value)
  }
    // Loads an image given an imageId
    // loadImage(imageId) {
    //     const width = 256;
    //     const height = 256;
    //     const numPixels = width * height;
    //     const pixelData = new Uint16Array(numPixels);
    //     const rnd = Math.round(Math.random() * 255);
    //     let index = 0;
    //     for (let y = 0; y < height; y++) {
    //         for (let x = 0; x < width; x++) {
    //             pixelData[index] = (x + rnd) % 256;
    //             index++;
    //         }
    //     }
    //
    //     function getPixelData() {
    //         return pixelData;
    //     }
    //
    //     const image = {
    //         imageId: imageId,
    //         minPixelValue: 0,
    //         maxPixelValue: 255,
    //         slope: 1.0,
    //         intercept: 0,
    //         windowCenter: 127,
    //         windowWidth: 256,
    //         render: cornerstone.renderGrayscaleImage,
    //         getPixelData: getPixelData,
    //         rows: height,
    //         columns: width,
    //         height: height,
    //         width: width,
    //         color: false,
    //         columnPixelSpacing: 1.0,
    //         rowPixelSpacing: 1.0,
    //         invert: false,
    //         sizeInBytes: width * height * 2
    //     };
    //
    //     return {
    //         promise: new Promise((resolve) => resolve(image)),
    //         cancelFn: undefined
    //     }
    // }
    // getPixelData() {
    //     const width = 256;
    //     const height = 256;
    //     const numPixels = width * height;
    //     const pixelData = new Uint16Array(numPixels);
    //     let index = 0;
    //     for (let y = 0; y < height; y++) {
    //         for (let x = 0; x < width; x++) {
    //             pixelData[index] = ((x) % 256) * 1;
    //             index++;
    //         }
    //     }
    //     console.log(pixelData);
    //     return pixelData;
    // }
    nextImage(){
      this.currentImage++;
      let images = this.data.dicomArr.length;
      images = images-1;
      if(this.currentImage > images){
          this.currentImage = 0;
      }
        this.csS.fetchDicomImage(this.data.dicomArr[this.currentImage][1])
            .subscribe(res =>  this.imageData = res);
    }
    prevImage(){
        this.currentImage--;
        let images = this.data.dicomArr.length;
        images = images-1;
        if(this.currentImage <= 0){
            this.currentImage = images;
        }
        this.csS.fetchDicomImage(this.data.dicomArr[this.currentImage][1])
            .subscribe(res =>  this.imageData = res);
    }

    acceptCr(){
        let data = {
            requestId: this.activeCr.toString()
        };
        Promise.resolve(this.consultationRequestService.acceptCr(data)
            .then(res => {
                console.log(res);
                this.dialogRef.close("reject");
            }).catch(err =>{
                    console.log(err);
                }
            ))
    }
    rejectCr(){
        let data = {
            requestId: this.activeCr.toString()
        };
        Promise.resolve(this.consultationRequestService.rejectCr(data)
            .then(res => {
                console.log(res);
                this.dialogRef.close("reject");
            }).catch(err =>{
                    console.log(err);
                }
            ))
    }

    getCompressedStudy(){
        Promise.resolve(this.studyService.fetchStudyArchiveCompressed(this.study.id)
            .then(res => {
                let url= window.URL.createObjectURL(res);
                window.open(url);
            }).catch(err => {
                if(err.status == 500){
                    this.globalService.showNotice("No Archive Files for this study!")
                }
            }))

    }
    getUncompressedStudy(){
        Promise.resolve(this.studyService.fetchStudyArchiveUncompressed(this.study.id)
            .then(res => {
                let url= window.URL.createObjectURL(res);
                window.open(url);
            }).catch(err => {
                if(err.status == 500){
                    this.globalService.showNotice("No Archive Files for this study!")
                }
            }))
    }
}
