import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ApplicationRef } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { D3Service } from 'd3-ng2-service'; // <-- import statement
import { LoadersCssModule } from 'angular2-loaders-css';
import { AlertModule, DatepickerModule, DropdownModule, CollapseModule } from 'ng2-bootstrap/ng2-bootstrap';

import {
    AppComponent,
    D3AvailabilityComponent,
    D3AvailabilityChartComponent,
    D3ActiveUsersComponent,
    D3ActiveUsersChartComponent,
    D3DebuggingComponent,
    D3DebuggingChartComponent,
    D3ServicesComponent,
    D3ServicesChartComponent,
    D3CloudTrailComponent,
    D3CloudTrailChartComponent,
    CustomTimeIntervalComponent,
} from '../components/index';

@NgModule({

    declarations: [
        AppComponent,
        D3AvailabilityComponent,
        D3AvailabilityChartComponent,
        D3ActiveUsersComponent,
        D3ActiveUsersChartComponent,
        D3DebuggingComponent,
        D3DebuggingChartComponent,
        D3ServicesComponent,
        D3ServicesChartComponent,
        D3CloudTrailComponent,
        D3CloudTrailChartComponent,
        CustomTimeIntervalComponent,
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
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [D3Service], // <-- provider registration
    entryComponents: [AppComponent],
    bootstrap: [AppComponent],
})

export class AppModule {
}


