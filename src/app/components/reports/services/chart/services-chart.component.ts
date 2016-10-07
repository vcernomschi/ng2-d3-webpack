import { Component, ViewChild, OnInit } from '@angular/core';
import { CustomTimeIntervalComponent } from '../../../helpers/index';
// import { AwsServicesService } from '../../../../services/index'

@Component({
  selector: 'dm-aws-services-chart',
  templateUrl: './services-chart.html',
})
export class AwsServicesChartComponent implements OnInit {
  @ViewChild(CustomTimeIntervalComponent)
  private chartInterval: CustomTimeIntervalComponent;
  private chartModel: {line: boolean, bar: boolean, pie: boolean} = {line: true, bar: true, pie: true};
  private errorMessage: string;
  private awsServices: any[];

  // @todo - get this from Elastic Search
  public lineChartData: Array<{data: Array<number[]> | number[], label: string}> = [
    {data: [12, 11.2, 10, 12, 14, 12, 11], label: 'Dynamo DB'},
    {data: [7, 9, 8, 11, 11, 10, 9], label: 'Lambda'},
    {data: [5, 6, 1, 6, 4.5, 3, 5], label: 'S3'},
    {data: [12, 15, 16, 10, 4, 9.5], label: 'Elastic Search'},
    {data: [0.1, 0, 0.3, 0.5, 0.7, 0.2], label: 'Cloud Front'},
    {data: [1, 1.2, 1.3, 1.4, 1.1, 1.2], label: 'SNS'},
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

  // constructor(private awsServicesService: AwsServicesService) {
  // }

  ngOnInit(): void {
    this.pieChartLabels = this.getPieChartLabels();
    this.pieChartData = this.getPieChartData();
    // this.getAwsServicesInfo();
  }

  // getAwsServicesInfo() {
  //   this.activeUsersService.getAwsServicesInfo()
  //     .subscribe(
  //       awsServices => this.awsServices = awsServices,
  //       error => this.errorMessage = <any>error);
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
   * @todo - disable button if chart is not implemented
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