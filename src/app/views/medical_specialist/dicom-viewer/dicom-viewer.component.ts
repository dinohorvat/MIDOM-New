import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CornerstoneService} from '../../../shared/services/cornerstone.service';

declare const cornerstone;
declare const cornerstoneWADOImageLoader;

@Component({
    selector: 'app-dicom-viewer',
    templateUrl: './dicom-viewer.component.html',
    styleUrls: ['./dicom-viewer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DicomViewerComponent implements OnInit {

    @ViewChild('dicomHolder') dicomHolder;
    imageData:any;
    constructor(private ref:ChangeDetectorRef,
                private csS: CornerstoneService){
        cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

    }
    ngOnInit(){
        // const element = this.dicomHolder.nativeElement;
        // cornerstone.enable(element);
    }

    onFileChange(e){
        const file = e.target.files[0];
        this.csS.fetchDicomLocal(file)
            .subscribe(res =>  this.imageData = res);
        // const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
        // this.loadAndViewImage(imageId);
    }
    loadAndViewImage(imageId) {
        const element = this.dicomHolder.nativeElement;
        cornerstone.loadImage(imageId).then(function(image) {
            console.log("IMAGE");
            console.log(image);
            cornerstone.displayImage(element, image);
        }, function(err) {
            alert(err);
        });
        this.ref.markForCheck();

    }
}