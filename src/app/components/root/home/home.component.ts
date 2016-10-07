/**
 * Created by vcernomschi on 10/4/16.
 */

import { Component } from '@angular/core';
import { ActiveUsersService } from './../../../services/index';

@Component({
  selector: 'dm-home',
  templateUrl: './home.html',
  providers: [
    ActiveUsersService,
  ],
})
export class HomeComponent {
  public title: string = 'Home page';
}