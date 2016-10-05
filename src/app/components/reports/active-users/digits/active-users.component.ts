/**
 * Created by vcernomschi on 9/23/16.
 */

import {Component} from '@angular/core';

@Component({
    selector: 'dm-active-users',
    templateUrl: './active-users.html',
})
export class ActiveUsersComponent {
    public activeUsersNumber: number = 8;
}