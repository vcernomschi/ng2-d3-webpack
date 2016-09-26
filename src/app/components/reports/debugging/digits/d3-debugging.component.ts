/**
 * Created by vcernomschi on 9/23/16.
 */

import {Component} from '@angular/core';

@Component({
    selector: 'd3-debugging',
    templateUrl: './d3-debugging.html',
    styleUrls: ['./d3-debugging.css']
})
export class D3DebuggingComponent {
    public errorsNumber: number = 6;
    public warningsNumber: number = 27;
}