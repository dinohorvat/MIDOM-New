import {Routes} from '@angular/router';
import {ConsultationRequestsComponent} from './consultation-requests/consultation-requests.component';
import {AppChatsComponent} from './app-chats/app-chats.component';

export const MedicalSpecialistRoutes: Routes = [
    {
        path: 'consultation-requests',
        component: ConsultationRequestsComponent,
        data: { title: 'Consultation Requests', breadcrumb: 'Consultation Requests'}
    },
    {
        path: 'message',
        component: AppChatsComponent,
        data: { title: 'Messages', breadcrumb: 'Messages'}
    }
];