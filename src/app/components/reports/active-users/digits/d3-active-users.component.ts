/**
 * Created by vcernomschi on 9/23/16.
 */

import {Component} from '@angular/core';

@Component({
    selector: 'd3-active-users',
    templateUrl: './d3-active-users.html',
    styleUrls: ['./d3-active-users.css']
})
export class D3ActiveUsersComponent {
    public activeUsersNumber: number = 8;
}