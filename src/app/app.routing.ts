import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/services/auth/auth.guard';

export const rootRouterConfig: Routes = [
  { 
    path: '', 
    redirectTo: 'dashboard', 
    pathMatch: 'full' 
  },
  {
    path: '', 
    component: AuthLayoutComponent,
    children: [
      { 
        path: 'sessions', 
        loadChildren: './views/sessions/sessions.module#SessionsModule',
        data: { title: 'Session'} 
      }
    ]
  },
  {
    path: '', 
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard', 
        loadChildren: './views/others/others.module#OthersModule', 
        data: { title: 'Others', breadcrumb: 'OTHERS'}
      },
        {
        path: 'ms',
        loadChildren: './views/medical_specialist/medical-specialist.module#MedicalSpecialistModule',
        data: { title: 'MS', breadcrumb: 'MS'}

        }
    ]
  },
  { 
    path: '**', 
    redirectTo: 'sessions/404'
  }
];

