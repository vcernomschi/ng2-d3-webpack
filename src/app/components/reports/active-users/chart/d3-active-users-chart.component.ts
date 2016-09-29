/**
 * Created by vcernomschi on 9/23/16.
 */

import {Component, ElementRef, NgZone, OnDestroy, OnInit} from '@angular/core';
import {
    D3Service,
    D3,
    Line,
    ScaleLinear,
    ScaleTime,
    Selection,
} from 'd3-ng2-service';

@Component({
    selector: 'd3-active-users-chart',
    templateUrl: './d3-active-users-chart.html',
    styleUrls: ['./d3-active-users-chart.css'],
})
export class D3ActiveUsersChartComponent implements OnInit, OnDestroy {

    private d3: D3; // <-- Define the private member which will hold the d3 reference
    private parentNativeElement: any;
    private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
    private inputData = [
        {
            close: '93.24',
            date: '24-Apr-07',
        },
        {
            close: '95.35',
            date: '25-Apr-07',
        },
        {
            date: '26-Apr-07',
            close: '98.84',
        },
        {
            close: '99.92',
            date: '27-Apr-07',
        },
        {
            close: '99.80',
            date: '30-Apr-07',
        },
        {
            close: '99.47',
            date: '1-May-07',
        },
        {
            close: '100.39',
            date: '2-May-07',
        },
        {
            close: ' 100.40',
            date: '3-May-07',
        },
        {
            close: '100.81',
            date: '4-May-07',
        },
        {
            close: '103.92',
            date: '7-May-07',
        },
        {
            close: '105.06',
            date: '8-May-07',
        },
    ];

    private chartTitle: string = 'd3-active-users-chart here';

    constructor(element: ElementRef, private ngZone: NgZone, d3Service: D3Service) {
        console.log('start constructor');
        this.d3 = d3Service.getD3();
        this.parentNativeElement = element.nativeElement;
        console.log('end constructor');
        // console.log('d3Pure: ', d3Pure)
    }

    ngOnDestroy() {
        console.log('start ngOnDestroy');
        if (this.d3Svg.empty && !this.d3Svg.empty()) {
            this.d3Svg.selectAll('*').remove();
        }
        console.log('end ngOnDestroy');
    }

    ngOnInit() {
        console.log('start ngOnInit');
        let self = this;
        let d3 = this.d3;
        let d3ParentElement: Selection<HTMLElement, any, null, undefined>;
        let d3Svg: Selection<SVGSVGElement, any, null, undefined>;
        let width: number;
        let height: number;
        let containerWidth: number;
        let containerHeight: number;
        let margin = {top: 5, right: 5, bottom: 20, left: 5};
        let x: ScaleTime<number, number>;
        let y: ScaleLinear<number, number>;
        let line: any;
        let promise: Promise<any>;

        if (this.parentNativeElement !== null) {

            d3ParentElement = d3.select(this.parentNativeElement); // <-- use the D3 select method


            d3Svg = this.d3Svg = d3ParentElement.select<SVGSVGElement>('svg');

            containerWidth = +d3Svg.node().getBoundingClientRect().width;
            containerHeight = +d3Svg.node().getBoundingClientRect().height + 30;

            width = containerWidth - margin.left - margin.right;
            height = containerHeight - margin.top - margin.bottom;

            x = d3.scaleTime()
                .range([0, width]);

            y = d3.scaleLinear()
                .range([height, 0]);

            line = d3.line()
                .x(function (d: any) {
                    return x(d.date);
                })
                .y(function (d: any) {
                    return y(d.close);
                });

            d3Svg
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append<SVGGElement>('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            this.inputData.forEach((d: any) => {
                d.date = this.parseTime(d.date);
                d.close = +d.close;
            });

            x.domain(d3.extent(this.inputData, function (d: any) {
                return d.date;
            }));
            y.domain(d3.extent(this.inputData, function (d: any) {
                return d.close;
            }));

            console.log('this.inputData: ', this.inputData);

            d3Svg.append('g')
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            d3Svg.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y))
                .append("text")
                .attr("class", "axis-title")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Number of users");

            d3Svg.append("path")
                .datum(this.inputData)
                .attr("class", "line")
                .attr("d", line);
        }
        console.log('end ngOnInit');
    }

    parseTime(timeToParse: string) {
        let parseTime = this.d3.timeParse("%d-%b-%y");
        return parseTime(timeToParse);
    }

    public clicked(event: Event) {
        console.log('clicked event: ', event);
        event.preventDefault();
    }

}