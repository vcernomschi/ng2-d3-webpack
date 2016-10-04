import { TestBed } from '@angular/core/testing';
import { LoadersCssModule } from 'angular2-loaders-css';
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
} from './../index';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
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
    });
  });
  it('should work', () => {
    let fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
  });
});