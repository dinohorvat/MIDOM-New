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
  MatProgressBarModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './../../shared/shared.module';


import { DashboardComponent } from './dashboard/dashboard.component';
import { OthersRoutes } from "./others.routing";
import {ProfileSettingsComponent} from './dashboard/profile-settings/profile-settings.component';
import {ProfileOverviewComponent} from './dashboard/profile-overview/profile-overview.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      ReactiveFormsModule,
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
    FlexLayoutModule,
    SharedModule,
      NgxDatatableModule,
    RouterModule.forChild(OthersRoutes)
  ],
  declarations: [
    DashboardComponent,
      ProfileSettingsComponent,
      ProfileOverviewComponent
  ]
})
export class OthersModule { }
