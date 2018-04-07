import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatInputModule,
    MatProgressBarModule, MatTooltipModule, MatDialogModule, MatSnackBarModule, MatSidenavModule, MatToolbarModule
} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './../../shared/shared.module';
import {ConsultationRequestsComponent} from './consultation-requests/consultation-requests.component';
import {MedicalSpecialistRoutes} from './medical-specialist.routing';
import {AppLoaderModule} from '../../shared/services/app-loader/app-loader.module';
import {AppConfirmModule} from '../../shared/services/app-confirm/app-confirm.module';
import {NgxTablePopupComponent} from './ngx-table-popup/ngx-table-popup.component';
import {AppChatsComponent} from './app-chats/app-chats.component';
import {DicomViewerComponent} from './dicom-viewer/dicom-viewer.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatChipsModule,
        MatCheckboxModule,
        MatRadioModule,
        MatTabsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatInputModule,
        MatProgressBarModule,
        NgxDatatableModule,
        FlexLayoutModule,
        SharedModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        MatTooltipModule,
        MatDialogModule,
        MatSnackBarModule,
        AppConfirmModule,
        AppLoaderModule,
        RouterModule.forChild(MedicalSpecialistRoutes)
    ],
    declarations: [
        ConsultationRequestsComponent,
        NgxTablePopupComponent,
        AppChatsComponent,
        DicomViewerComponent
    ],
    entryComponents: [NgxTablePopupComponent]

})
export class MedicalSpecialistModule { }
