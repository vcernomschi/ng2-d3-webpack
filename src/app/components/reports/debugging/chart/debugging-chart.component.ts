import { Component, ViewChild, OnInit } from '@angular/core';
import { CustomTimeIntervalComponent } from '../../../helpers/index';

@Component({
  selector: 'dm-debugging-chart',
  templateUrl: './debugging-chart.html',
})
export class DebuggingChartComponent implements OnInit {
  @ViewChild(CustomTimeIntervalComponent)
  private chartInterval: CustomTimeIntervalComponent;
  private chartModel: {line: boolean, bar: boolean, pie: boolean} = {line: true, bar: true, pie: true};
  private errorMessage: string;
  private errorsNumber: any[];
  private warningsNumber: any[];

  // @todo - get this from Elastic Search
  public lineChartData: Array<{data: Array<number[]> | number[], label: string}> = [
    {data: [4, 5, 2, 0, 1, 2, 10], label: 'Errors'},
    {data: [20, 30, 21, 45, 23, 40, 40], label: 'Warnings'},
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
    {backgroundColor: ["#e11414", "#ffa500"]},
    {hoverBorderColor: ["#e11414", "#ffa500"]},
  ];

  public chartColors: Array<any> = [
    { //red
      backgroundColor: 'rgba(225, 20, 20, 0.2)',
      borderColor: 'rgba(225, 20, 20, 1)',
      pointBackgroundColor: 'rgba(225, 20, 20, 0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225, 20, 20, 0.8)',
    },
    { //orange
      backgroundColor: 'rgba(255,165,0,0.2)',
      borderColor: 'rgba(255,165,0,1)',
      pointBackgroundColor: 'rgba(255,165,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,165,0,0.8)',
    }
  ];

  //@todo - implement CloudTrailService
  // constructor(private debugService: DebugService) {
  // }

  ngOnInit(): void {
    this.pieChartLabels = this.getPieChartLabels();
    this.pieChartData = this.getPieChartData();
    // this.getErrorsNumber();
    // this.getWarningsNumber();
  }

  // getErrorsNumber() {
  //     this.debuggingService.getErrorsNumber()
  //       .subscribe(
  //         errorsNumber => this.errorsNumber = errorsNumber,
  //         error =>  this.errorMessage = <any>error);
  // }

  // getWarningsNumber() {
  //     this.debuggingService.getWarningsNumber()
  //       .subscribe(
  //         warningsNumber => this.warningsNumber = warningsNumber,
  //         error =>  this.errorMessage = <any>error);
  // }

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
   * @param chartType {String}
   * @returns {boolean}
   */
  public isChartImplemented(chartType: string): boolean {
    return !!(this.chartModel[chartType]);
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
  public changeChartType(e: any): void {

    this.radioModel = this.chartType = this.isChartImplemented(this.radioModel) ? this.radioModel : this.chartType;

    e.stopPropagation();
  }

  public dropdownChanged(e: Event): void {
    console.log('dropdownChanged e: ', e);
    e.preventDefault();
    e.stopPropagation();
  }
}