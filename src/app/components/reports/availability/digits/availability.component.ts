import { Component } from '@angular/core';

@Component({
  selector: 'dm-availability',
  templateUrl: './availability.html',
})
export class AvailabilityComponent {
  public lastDowntimeString: string = '1 mo 2 days';
  public outagesNumber: number = 10;
  public uptimePercentage: number = 70;
}