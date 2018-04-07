import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import {
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatSnackBarModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatRippleModule, MatSlideToggle, MatSlideToggleModule
} from '@angular/material';

// ONLY REQUIRED FOR **SIDE** NAVIGATION LAYOUT
import { HeaderSideComponent } from './components/header-side/header-side.component';
import { SidebarSideComponent } from './components/sidebar-side/sidebar-side.component';

// ONLY REQUIRED FOR **TOP** NAVIGATION LAYOUT
import { HeaderTopComponent } from './components/header-top/header-top.component';
import { SidebarTopComponent } from './components/sidebar-top/sidebar-top.component';

// ONLY FOR DEMO (Removable without changing any layout configuration)
import { CustomizerComponent } from './components/customizer/customizer.component';

// ALL TIME REQUIRED 
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

// DIRECTIVES
import { FontSizeDirective } from './directives/font-size.directive';
import { ScrollToDirective } from './directives/scroll-to.directive';
import { AppDropdownDirective } from './directives/dropdown.directive';
import { DropdownAnchorDirective } from './directives/dropdown-anchor.directive';
import { DropdownLinkDirective } from './directives/dropdown-link.directive';

// PIPES
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { ExcerptPipe } from "./pipes/excerpt.pipe";

// SERVICES
import { ThemeService } from './services/theme.service';
import { LayoutService } from './services/layout.service';
import { NavigationService } from "./services/navigation.service";
import { RoutePartsService } from './services/route-parts.service';
import { AuthGuard } from './services/auth/auth.guard';
import {AuthService} from './services/auth/auth.service';
import {LoginService} from './services/login.service';
import {HttpClientModule} from '@angular/common/http';
import {GlobalService} from './services/global.service';
import {AccountService} from './services/medical-specialist/account.service';
import {ConsultationRequestsService} from './services/medical-specialist/consultation-requests.service';
import {MedicalSpecialistService} from './services/medical-specialist/medical-specialist.service';
import {SpecialisationsService} from './services/medical-specialist/specialisations.service';
import {DatemsPipe} from './pipes/datems.pipe';
import {StudyService} from './services/medical-specialist/study.service';
import {CornerstoneDirective} from './directives/cornerstone.directive';
import {CornerstoneService} from './services/cornerstone.service';

const classesToInclude = [
  
  HeaderTopComponent,
  SidebarTopComponent,
  SidenavComponent,
  NotificationsComponent,
  SidebarSideComponent,
  HeaderSideComponent,
  AdminLayoutComponent,
  AuthLayoutComponent,
  BreadcrumbComponent,
  CustomizerComponent,
  FontSizeDirective,
  ScrollToDirective,
  AppDropdownDirective,
  DropdownAnchorDirective,
  DropdownLinkDirective,
  RelativeTimePipe,
  ExcerptPipe,
  DatemsPipe,
    CornerstoneDirective
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    FlexLayoutModule,
    TranslateModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatSnackBarModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSlideToggleModule
  ],
  providers: [
    ThemeService,
    LayoutService,
    NavigationService,
    RoutePartsService,
    GlobalService,
    AuthGuard,
    AuthService,
    LoginService,
    //MS Providers
    AccountService,
    ConsultationRequestsService,
    MedicalSpecialistService,
    SpecialisationsService,
    StudyService,
      CornerstoneService
  ],
  declarations: classesToInclude,
  exports: classesToInclude
})
export class SharedModule { }
