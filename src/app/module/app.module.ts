import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ApplicationRef } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { D3Service } from 'd3-ng2-service'; // <-- import statement
import { LoadersCssModule } from 'angular2-loaders-css';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DataTableDirectives } from 'ng2-data-table/datatable';
import { routing } from './app.rounting';

import {
  AlertModule,
  DatepickerModule,
  DropdownModule,
  CollapseModule,
  ButtonsModule,
} from 'ng2-bootstrap/ng2-bootstrap';

import {
  AppComponent,
  HomeComponent,
  AvailabilityComponent,
  AvailabilityChartComponent,
  AvailabilityDetailsComponent,
  ActiveUsersComponent,
  ActiveUsersChartComponent,
  ActiveUsersDetailsComponent,
  DebuggingComponent,
  DebuggingChartComponent,
  DebuggingDetailsComponent,
  AwsServicesComponent,
  AwsServicesChartComponent,
  AwsServicesDetailsComponent,
  CloudTrailComponent,
  CloudTrailChartComponent,
  CloudTrailDetailsComponent,
  CustomTimeIntervalComponent,
} from '../components/index';

@NgModule({

  declarations: [
    AppComponent,
    HomeComponent,
    AvailabilityComponent,
    AvailabilityChartComponent,
    AvailabilityDetailsComponent,
    ActiveUsersComponent,
    ActiveUsersChartComponent,
    ActiveUsersDetailsComponent,
    DebuggingComponent,
    DebuggingChartComponent,
    DebuggingDetailsComponent,
    AwsServicesComponent,
    AwsServicesChartComponent,
    AwsServicesDetailsComponent,
    CloudTrailComponent,
    CloudTrailChartComponent,
    CloudTrailDetailsComponent,
    CustomTimeIntervalComponent,
    DataTableDirectives,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    LoadersCssModule,
    AlertModule,
    DatepickerModule,
    DropdownModule,
    CollapseModule,
    ChartsModule,
    ButtonsModule,
    HttpModule,
    routing,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [D3Service], // <-- provider registration
  entryComponents: [AppComponent],
  bootstrap: [AppComponent],
})

export class AppModule {
}


