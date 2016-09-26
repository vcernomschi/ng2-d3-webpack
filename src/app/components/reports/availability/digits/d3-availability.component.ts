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
    public lastDowntimeString: string = '1 mo 2 days';
    public outagesNumber: number = 10;
    public uptimePercentage: number = 70;
}