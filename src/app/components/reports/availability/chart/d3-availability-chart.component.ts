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
    selector: 'd3-availability-chart',
    templateUrl: './d3-availability-chart.html',
    styleUrls: ['./d3-availability-chart.css']
})
export class D3AvailabilityChartComponent implements OnInit, OnDestroy {

    private d3: D3; // <-- Define the private member which will hold the d3 reference
    private parentNativeElement: any;
    private d3Svg: Selection<SVGSVGElement, any, null, undefined>;

    public chartTitle: string = 'd3-availability-chart';

    constructor(element: ElementRef, private ngZone: NgZone, d3Service: D3Service) {
        this.d3 = d3Service.getD3();
        this.parentNativeElement = element.nativeElement;
    }

    ngOnDestroy() {
        if (this.d3Svg.empty && !this.d3Svg.empty()) {
            this.d3Svg.selectAll('*').remove();
        }
    }

    ngOnInit() {
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
        let line: Line<[number, number]>;

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
        }

    }

    parseTime(timeToParse: string) {
        return this.d3.timeParse("%d-%b-%y");
    }

    // type(d: Array<string,string>) {
    type(d: any) {
        d.date = this.parseTime(d.date);
        d.close = +d.close;
        return d;
    }

}