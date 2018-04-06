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
    MatProgressBarModule, MatTooltipModule, MatDialogModule, MatSnackBarModule
} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './../../shared/shared.module';
import {ConsultationRequestsComponent} from './consultation-requests/consultation-requests.component';
import {MedicalSpecialistRoutes} from './medical-specialist.routing';
import {AppLoaderModule} from '../../shared/services/app-loader/app-loader.module';
import {AppConfirmModule} from '../../shared/services/app-confirm/app-confirm.module';



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
        ConsultationRequestsComponent
    ]
})
export class MedicalSpecialistModule { }
