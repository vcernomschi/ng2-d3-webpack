/**
 * Created by vcernomschi on 10/4/16.
 */

import { Component } from '@angular/core';
import { DataProviderService } from './../../../services/index';

@Component({
  selector: 'dm-home',
  templateUrl: './home.html',
  providers: [
    DataProviderService,
  ],
})
export class HomeComponent {
  public title: string = 'Home page';
}