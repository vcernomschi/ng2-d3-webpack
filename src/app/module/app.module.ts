import {NgModule, CUSTOM_ELEMENTS_SCHEMA, ApplicationRef} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { D3Service } from 'd3-ng2-service'; // <-- import statement
import { LoadersCssModule } from 'angular2-loaders-css';

import {
    AppComponent,
    D3AvailabilityComponent,
    D3AvailabilityChartComponent,
    D3ActiveUsersComponent,
    D3ActiveUsersChartComponent,
    BrushZoom2Component
} from '../components/index';

@NgModule({

    declarations: [
        AppComponent,
        D3AvailabilityComponent,
        D3AvailabilityChartComponent,
        D3ActiveUsersComponent,
        D3ActiveUsersChartComponent,
        BrushZoom2Component
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        LoadersCssModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [D3Service], // <-- provider registration
    entryComponents: [AppComponent],
    bootstrap: [AppComponent]
})

export class AppModule {
}


