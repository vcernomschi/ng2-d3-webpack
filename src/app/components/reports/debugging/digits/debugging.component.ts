/**
 * Created by vcernomschi on 9/23/16.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'dm-debugging',
  templateUrl: './debugging.html',
})
export class DebuggingComponent {
  public errorsNumber: number = 10;
  public warningsNumber: number = 40;
}