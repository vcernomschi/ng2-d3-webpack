import { Router } from '@angular/router';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { CustomTimeIntervalComponent } from '../../../helpers/index';
import { DataProviderService } from '../../../../services/index';

@Component({
  selector: 'dm-cloud-trail-chart',
  templateUrl: './cloud-trail-chart.html',
})
export class CloudTrailChartComponent implements OnInit, AfterViewInit {

  private reportHeader: string = 'Cloud Trail';

  @ViewChild(CustomTimeIntervalComponent)
  private chartInterval: CustomTimeIntervalComponent;
  private implementedChartModel: Array<{type: string, status: boolean}> = [
    {type: 'line', status: true},
    {type: 'bar', status: true},
    {type: 'pie', status: true},
  ];
  private errorMessage: string;
  private activeUsers: any[];

  // @todo - get this from Elastic Search
  public lineChartData: Array<{data: Array<number[]> | number[], label: string}> = [
    {data: [1, 54, 80, 10, 82, 20, 58], label: 'Numbe of Records'},

  ];
  public lineChartLabels: Array < any > = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public pieChartType: string = 'pie';
  public chartType = 'line';
  public radioModel: string = 'line';
  public pieChartLabels: string[];
  public pieChartData: number[];
  public chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor(private dataProviderService: DataProviderService,  private router: Router) {
    // console.log('cloud trail chartInterval: ', this.chartInterval);
  }

  /**
   * Prepare data on Init hook
   */
  ngOnInit(): void {
    this.pieChartLabels = this.getPieChartLabels();
    this.pieChartData = this.getPieChartData();
    this.getCloudTrailData();
  }

  /**
   * Set report header on AfterViewInit hook
   */
  ngAfterViewInit(): void {
    this.chartInterval.chartHeader = this.reportHeader;
  }

  /**
   * Fetch data by active users
   */
  getCloudTrailData(): void {
    let params: Array<{key: string, value: string}> = [
      {key: 'sort', value: 'time:asc'},
    ];

    this.dataProviderService.getData(params)
      .subscribe(
        users => this.activeUsers = users,
        error => this.errorMessage = error
      );
  }

  /**
   * Returns true if chartType is line or bar
   * @returns {boolean}
   */
  public get isLineChart(): boolean {
    return this.chartType === 'line' || this.chartType === 'bar';
  }

  /**
   * Returns true if chartType is pie
   * @returns {boolean}
   */
  public get isPieChart(): boolean {
    return this.chartType === 'pie';
  }

  /**
   * @returns {String[]}
   */
  public getPieChartLabels(): string[] {
    let result: string[] = [];

    for (let pieChartLabel of this.lineChartData) {
      if (!pieChartLabel.label || typeof pieChartLabel.label !== 'string') {
        throw new TypeError(`No all labels in ${this.lineChartData}`);
      }

      result.push(pieChartLabel.label);
    }

    return result;
  }

  /**
   * @returns {number[]}
   */
  public getPieChartData(): number[] {
    let result: number[] = [];

    for (let pieChartItem of this.lineChartData) {

      if (!pieChartItem.data && !pieChartItem.data.length) {
        throw new TypeError(`No data in datasets: ${this.lineChartData}`);
      }

      let sum: number = 0;

      for (let i = 0; i < pieChartItem.data.length; i++) {
        sum += +(pieChartItem.data[i]);
      }

      result.push(sum);
    }

    return result;
  }

  /**
   * Redirect to Cloud Trail page for more details
   * @param e {Event}
   */
  public chartClicked(e: any): void {
    this.router.navigate(['/cloud-trail']);
  }

  /**
   * @todo - override chart hovering if requirements will require some values in tooltip
   * @param e {Event}
   */
  public chartHovered(e: any): void {
    // console.log('event: ', e);
  }

  /**
   * @param e {Event}
   */
  public redrawChart(e: string): void {

    if (this.chartType === e) {
      return;
    }

    this.chartType = e;
  }
}