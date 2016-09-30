/**
 * Created by vcernomschi on 9/30/16.
 */
import { Component } from '@angular/core';

// webpack html imports

@Component({
    selector: 'd3-services-chart',
    templateUrl: './d3-services-chart.html',
})
export class D3ServicesChartComponent {
    // lineChart
    public lineChartData:Array<any> = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90],
        [10, 11, 9, 6, 5, 7, 10],
        [22, 18, 2, 3, 2, 1, 2],
        [30, 30, 30, 30, 30, 30, 30],
        [40, 42, 41, 7, 37, 39, 41],
    ];
    public lineChartLabels:Array<any> = ['TOTAL EST', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartType:string = 'line';
    public pieChartType:string = 'pie';
    public chartTitle: string = 'd3-services-chart';

    // Pie
    public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
    public pieChartData:number[] = [300, 500, 100];

    public randomizeType(e:Event):void {
        console.log('e:', e);
        this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
        // e.preventDefault();
    }

    public chartClicked(e:any):void {
        // console.log(e);
    }

    public chartHovered(e:any):void {
        // console.log(e);
    }

    constructor(){
        // console.log('BaseChartDemoComponent')
    }
}