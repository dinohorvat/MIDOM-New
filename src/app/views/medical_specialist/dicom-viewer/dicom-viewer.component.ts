import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CornerstoneService} from '../../../shared/services/cornerstone.service';

@Component({
    selector: 'app-dicom-viewer',
    templateUrl: './dicom-viewer.component.html',
    styleUrls: ['./dicom-viewer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DicomViewerComponent implements OnInit {

    imageData:any;
    constructor(private csS: CornerstoneService){

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
}