import { TestBed } from '@angular/core/testing';
import { LoadersCssModule } from 'angular2-loaders-css';
import { DataTableDirectives } from 'ng2-data-table/datatable';
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
} from './../index';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
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
    });
  });
  it('should work', () => {
    let fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
  });
});