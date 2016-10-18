/**
 * Created by vcernomschi on 9/23/16.
 */

import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { CustomTimeIntervalComponent } from '../../../helpers/index';
import { DataProviderService } from '../../../../services/index';

@Component({
  selector: 'dm-active-users-chart',
  templateUrl: './active-users-chart.html',
})
export class ActiveUsersChartComponent implements OnInit, AfterViewInit {

  private reportHeader: string = 'Right Now';

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
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Vitali Cernomschi'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Eugene Estrati'},
    {data: [1, 43, 57, 63, 56, 56, 4], label: 'Cristian Covali'},
    {data: [45, 56, 67, 55, 22, 45], label: 'Irina Covali'},
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

  constructor(private dataProviderService: DataProviderService) {
    // console.log('chartInterval: ', this.chartInterval);
  }

  ngOnInit(): void {
    this.pieChartLabels = this.getPieChartLabels();
    this.pieChartData = this.getPieChartData();
    this.getActiveUsers();
  }

  ngAfterViewInit(): void {
    this.chartInterval.chartHeader = this.reportHeader;
    console.log('chartInterval: ', this.chartInterval.chartHeader);
  }

  getActiveUsers(): void {
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
   * @todo - override chart click if requirements will require some values in tooltip
   * @param e {Event}
   */
  public chartClicked(e: any): void {
    // console.log(e);
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

    console.log('PARENT INPUT: ', e);

    if (this.chartType === e) {
      return;
    }

    this.chartType = e;

    console.log('CHANGED: ', e);
  }
}