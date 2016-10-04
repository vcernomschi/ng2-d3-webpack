/**
 * Created by vcernomschi on 9/23/16.
 */

import { Component } from '@angular/core';
import '../../../../public/css/styles.css';
import '../../../../node_modules/loaders.css/loaders.min.css';
import '../../../../public/css/font-awesome.css';
import '../../../../node_modules/chart.js/dist/Chart.bundle.min.js';

@Component({
  selector: 'dm-app',
  template: `
    <div class="dm-container">
        <!--<dm-home></dm-home>-->
        <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
}