/**
 * Created by vcernomschi on 10/4/16.
 */

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/root/home/home.component';
import {
  ActiveUsersDetailsComponent,
  AvailabilityDetailsComponent,
  CloudTrailDetailsComponent,
  DebuggingDetailsComponent,
  AwsServicesDetailsComponent,
} from '../components';

const APP_ROUTES: Routes = [
  {path: 'active-users', component: ActiveUsersDetailsComponent},
  {path: 'availability', component: AvailabilityDetailsComponent},
  {path: 'cloud-trail', component: CloudTrailDetailsComponent},
  {path: 'debugging', component: DebuggingDetailsComponent},
  {path: 'services', component: AwsServicesDetailsComponent},
  {path: '', component: HomeComponent},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
