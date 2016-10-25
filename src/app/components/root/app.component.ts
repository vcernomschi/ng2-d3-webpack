/**
 * Created by vcernomschi on 9/23/16.
 */

import { Router } from '@angular/router';
import { Component } from '@angular/core';
import '../../../assets/css/desktop.css';
import '../../../assets/css/tablet.css';
import '../../../assets/css/mobile.css';
import '../../../assets/css/font-awesome.min.css';
import '../../../assets/js/Chart.bundle.min.js';
import '../../../../node_modules/loaders.css/loaders.min.css';

@Component({
  selector: 'dm-app',
  templateUrl: './app.html',
})
export class AppComponent {
  constructor(private router: Router) {
  }

  changePage(e: any): void {
    this.router.navigate([e.target.pathname]);
    e.preventDefault();
  }

  // handleDropdown(e: any): void {
  //   console.log('stop propagation e:', );
  //   e.stopPropagation();
  // }
}