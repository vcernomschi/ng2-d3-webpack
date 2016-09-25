/**
 * Created by vcernomschi on 9/23/16.
 */

import {Component} from '@angular/core';

@Component({
    selector: 'd3-availability',
    templateUrl: './d3-availability.html',
    styleUrls: ['./d3-availability.css']
})
export class D3AvailabilityComponent {
    public lastDowntimeString: string = 'd3-availability';
    public outagesNumber: number = 10;
}