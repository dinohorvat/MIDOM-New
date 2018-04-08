import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CornerstoneService} from '../../../shared/services/cornerstone.service';
import {AppLoaderService} from '../../../shared/services/app-loader/app-loader.service';

@Component({
    selector: 'app-dicom-viewer',
    templateUrl: './dicom-viewer.component.html',
    styleUrls: ['./dicom-viewer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DicomViewerComponent implements OnInit {

    imageData:any;
    constructor(private csS: CornerstoneService, private loader: AppLoaderService,
                private ref: ChangeDetectorRef){

    }
    ngOnInit(){
        // const element = this.dicomHolder.nativeElement;
        // cornerstone.enable(element);
    }
    triggerClick(){
        console.log('upload');
        let element: HTMLElement = document.getElementById("selectFile") as HTMLElement;
        element.click();
    }

    onFileChange(e){
        const file = e.target.files[0];
        this.csS.fetchDicomLocal(file)
            .subscribe(res => {
                this.imageData = res;
                window.dispatchEvent(new Event('resize'));
            } );
        // const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
        // this.loadAndViewImage(imageId);
    }
}