import {Component, OnInit, Inject, ViewChild, ElementRef} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {StudyOwnerModel} from '../../../shared/models/consultation-request.model';
import {StudyModel} from '../../../shared/models/study.model';
import {cornerstone} from '../consultation-requests/consultation-requests.component';

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
    constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NgxTablePopupComponent>,
    private fb: FormBuilder,
  ) { }

    private dicomHolder: ElementRef;

    @ViewChild('dicomHolder') set content(content: ElementRef) {
        this.dicomHolder = content;
    }

    dynamicImage:any;
  ngOnInit() {
    this.study = this.data.payload;
    this.studyOwner = this.data.payload.studyOwner;
    this.activeCr = this.data.activeCr;
    this.buildItemForm(this.data.payload);
      console.log(this.data.payload);

      this.dynamicImage = {
          imageId: "notneeded",
          minPixelValue: 0,
          maxPixelValue: 255,
          slope: 1.0,
          intercept: 0,
          windowCenter: 127,
          windowWidth: 256,
          render: cornerstone.renderGrayscaleImage,
          getPixelData: this.getPixelData,
          rows: 256,
          columns: 256,
          height: 256,
          width: 256,
          color: false,
          columnPixelSpacing: 1.0,
          rowPixelSpacing: 1.0,
          invert: false,
          sizeInBytes: 256 * 256 * 2,
          data: {
              opacity: 0.5
          }
      };

      console.log(this.dynamicImage);
      cornerstone.enable(this.dicomHolder.nativeElement);
      cornerstone.displayImage(this.dicomHolder.nativeElement, this.dynamicImage);


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
    loadImage(imageId) {
        const width = 256;
        const height = 256;
        const numPixels = width * height;
        const pixelData = new Uint16Array(numPixels);
        const rnd = Math.round(Math.random() * 255);
        let index = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                pixelData[index] = (x + rnd) % 256;
                index++;
            }
        }

        function getPixelData() {
            return pixelData;
        }

        const image = {
            imageId: imageId,
            minPixelValue: 0,
            maxPixelValue: 255,
            slope: 1.0,
            intercept: 0,
            windowCenter: 127,
            windowWidth: 256,
            render: cornerstone.renderGrayscaleImage,
            getPixelData: getPixelData,
            rows: height,
            columns: width,
            height: height,
            width: width,
            color: false,
            columnPixelSpacing: 1.0,
            rowPixelSpacing: 1.0,
            invert: false,
            sizeInBytes: width * height * 2
        };

        return {
            promise: new Promise((resolve) => resolve(image)),
            cancelFn: undefined
        }
    }
    getPixelData() {
        const width = 256;
        const height = 256;
        const numPixels = width * height;
        const pixelData = new Uint16Array(numPixels);
        let index = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                pixelData[index] = ((x) % 256) * 1;
                index++;
            }
        }
        console.log(pixelData);
        return pixelData;
    }
}
