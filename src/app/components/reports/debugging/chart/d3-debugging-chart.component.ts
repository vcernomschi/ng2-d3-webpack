/**
 * Created by vcernomschi on 9/23/16.
 */

import {Component, ElementRef, NgZone, OnDestroy, OnInit} from '@angular/core';

import {
    D3Service,
    D3,
    Line,
    ScaleLinear,
    ScaleOrdinal,
    Selection,
} from 'd3-ng2-service';

@Component({
    selector: 'd3-debugging-chart',
    templateUrl: './d3-debugging-chart.html',
    styleUrls: ['./d3-debugging-chart.css']
})
export class D3DebuggingChartComponent implements OnInit, OnDestroy {

    private d3: D3; // <-- Define the private member which will hold the d3 reference
    private parentNativeElement: any;
    private d3Svg: Selection<SVGSVGElement, any, null, undefined>;

    public chartTitle: string = 'd3-debugging-chart here';

    /**
     * @param element {ElementRef}
     * @param ngZone {ngZone}
     * @param d3Service {D3Service}
     */
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
        let d3G: any;
        let width: number;
        let height: number;
        let containerWidth: number;
        let containerHeight: number;
        let k: number;
        let x: ScaleLinear<number, number>;
        let y: ScaleLinear<number, number>;
        let z: ScaleOrdinal<number, string>;
        let line: Line<[number, number]>;
        let margin = {top: 5, right: 5, bottom: 20, left: 5};
        let data: any;

        if (this.parentNativeElement !== null) {

            d3ParentElement = d3.select(this.parentNativeElement); // <-- use the D3 select method


            d3Svg = this.d3Svg = d3ParentElement.select<SVGSVGElement>('svg');

            containerWidth = +d3Svg.node().getBoundingClientRect().width;
            containerHeight = +d3Svg.node().getBoundingClientRect().height + 30;

            width = containerWidth - margin.left - margin.right;
            height = containerHeight - margin.top - margin.bottom;

            x = d3.scaleLinear().domain([0, 360]).range([0, width]);
            y = d3.scaleLinear().domain([0, 80]).range([height, 0]);
            z = d3.scaleOrdinal<number, string>(d3.schemeCategory10);

            data = [
                {
                    name: 'Warnings', labelOffset: 60, value: function (t: any) {
                    return d3.hsl(t, 1, 0.5);
                }
                },
                {
                    name: 'Errors', labelOffset: 20, value: function (t: any) {
                    return d3.hcl(t, 1, 0.5);
                }
                }
            ].map( (color: any) => {
                return color.deltas = d3.range(0, 360, 2).map( (x: any) => {
                    return {
                        input: x,
                        delta: this.delta(color.value(x - 10), color.value(x + 10))
                    };
                }), color;
            });

            line = d3.area()
                .curve(d3.curveBasis)
                .x(function(d:any) { return x(d.input); })
                .y(function(d:any) { return y(d.delta); });

            d3Svg
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append<SVGGElement>('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            d3Svg.append<SVGGElement>('g')
                .attr('class', 'axis axis--x')
                .attr('transform', 'translate(0,' + y(0) + ')')
                .call(d3.axisBottom(x));

            //add y Axis
            d3Svg.append<SVGGElement>('g')
                .attr('class', 'axis axis--y')
                .call(d3.axisLeft(y));

            d3G = d3Svg.selectAll(".line")
                .data(data)
                .enter().append("g")
                .attr("class", "line");

            d3G.append("path")
                .attr("d", function(d: any) { return line(d.deltas); })
                .attr("id", function(d:any , i:any) { return "path-" + i; })
                .style("stroke", function(d:any, i:any) { return (z(i) === '#ff7f0e')? 'red': 'orange'; });

            d3G.append("text")
                .attr("x", function(d: any) { return d.labelOffset; })
                .attr("dy", -5)
                .style("fill", function(d:any, i:any) { return (z(i) === '#ff7f0e')? 'red': 'orange'; })
                .append("textPath")
                .attr("class", "textpath")
                .attr("xlink:href", function(d: any, i:any) { return "#path-" + i; })
                .text(function(d:any) { return d.name; });
        }
    }

    /**
     * @param a {any}
     * @param b {any}
     * @returns {number}
     */
    delta(a: any, b: any) {
        var dl = (a = this.d3.lab(a)).l - (b = this.d3.lab(b)).l, da = a.a - b.a, db = a.b - b.b;
        return Math.sqrt(dl * dl + da * da + db * db);
    }
}