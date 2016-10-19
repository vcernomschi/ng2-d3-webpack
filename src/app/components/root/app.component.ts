/**
 * Created by vcernomschi on 9/23/16.
 */

import { Router } from '@angular/router';
import { Component } from '@angular/core';
import '../../../../public/css/desktop.css';
import '../../../../public/css/tablet.css';
import '../../../../public/css/mobile.css';
import '../../../../node_modules/loaders.css/loaders.min.css';
import '../../../../public/css/font-awesome.css';
import '../../../../node_modules/chart.js/dist/Chart.bundle.min.js';

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
}