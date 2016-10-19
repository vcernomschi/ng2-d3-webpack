import { Router } from '@angular/router';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { CustomTimeIntervalComponent } from '../../../helpers/index';
import { DataProviderService } from '../../../../services/index';

@Component({
  selector: 'dm-availability-chart',
  templateUrl: './availability-chart.html',
})
export class AvailabilityChartComponent implements OnInit, AfterViewInit {

  private reportHeader: string = 'Last Downtime';

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
    {data: [2000, 3000, 1200, 980, 3222, 1500, 1000], label: 'Response time'},
  ];
  public lineChartLabels: Array < any > = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public pieChartType: string = 'pie';
  public chartType = 'line';
  public radioModel: string = 'line';
  public pieChartLabels: string[];
  public pieChartData: Array<any>;
  public chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
  };

  public pieChartColors: Array<any> = [
    {backgroundColor: ["#27ad27"]},
    {hoverBorderColor: ["#e11414"]},
  ];

  public chartColors: Array<any> = [
    { //green
      backgroundColor: 'rgba(39, 173, 39, 0.2)',
      borderColor: 'rgba(39, 173, 39, 1)',
      pointBackgroundColor: 'rgba(39, 173, 39, 0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(39, 173, 39, 0.8)',
    },
  ];

  constructor(private dataProviderService: DataProviderService,  private router: Router) {
    // console.log('availability chartInterval: ', this.chartInterval);
  }

  /**
   * Prepare data on Init hook
   */
  ngOnInit(): void {
    this.pieChartLabels = this.getPieChartLabels();
    this.pieChartData = this.getPieChartData();
    this.getAvailabilityData();
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
  getAvailabilityData(): void {
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
   * Redirect to Availability page for more details
   * @param e {Event}
   */
  public chartClicked(e: any): void {
    this.router.navigate(['/availability']);
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