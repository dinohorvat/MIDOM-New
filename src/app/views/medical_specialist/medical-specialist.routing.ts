import {Routes} from '@angular/router';
import {ConsultationRequestsComponent} from './consultation-requests/consultation-requests.component';

export const MedicalSpecialistRoutes: Routes = [
    {
        path: 'consultation-requests',
        component: ConsultationRequestsComponent,
        data: { title: 'Consultation Requests', breadcrumb: 'Consultation Requests'}

    }
];