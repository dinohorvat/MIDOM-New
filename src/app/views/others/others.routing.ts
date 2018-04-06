import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import {ProfileOverviewComponent} from './dashboard/profile-overview/profile-overview.component';
import {ProfileSettingsComponent} from './dashboard/profile-settings/profile-settings.component';

export const OthersRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
      children: [{
          path: 'profile-overview',
          component: ProfileOverviewComponent,
          data: { title: 'Dashboard', breadcrumb: 'DASHBOARD' }
      },
          {
              path: 'profile-settings',
              component: ProfileSettingsComponent,
              data: { title: 'Settings', breadcrumb: 'SETTINGS' }
          },]
  },
];