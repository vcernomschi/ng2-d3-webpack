/**
 * Created by vcernomschi on 9/28/16.
 */

import {
  Component,
  OnInit,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'dm-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.css'],
})
export class TimePickerDemoComponent implements OnInit {

  // properties to support DatePicker + Timepicker
  private yearValue: number;
  private monthValue: number;
  private dateValue: number;
  private hoursValue: number;
  private minutesValue: number;
  private secondsValue: number;
  private millisecondsValue: number;
  private nativeElement: any;
  private hoursElement: any;
  private minutesElement: any;

  public isEnabled: boolean = true;

  public startTime: Date;
  private isInitialValue: boolean = true;


  onChange(newValue: any) {

    let newYearValue = newValue.getFullYear();
    let newMonthValue = newValue.getMonth();
    let newDateValue = newValue.getDate();
    let newHoursValue = newValue.getHours();
    let newMinutesValue = newValue.getMinutes();
    let newSecondsValue = newValue.getSeconds();
    let newMillisecondsValue = newValue.getMilliseconds();
    let isDateChanged = (newMillisecondsValue === 0 && newSecondsValue === 0
    && newMinutesValue === 0 && newHoursValue === 0) ? true : false;

    if (this.isInitialValue) {
      this.yearValue = newYearValue;
      this.monthValue = newMonthValue;
      this.dateValue = newDateValue;
      this.hoursValue = newHoursValue;
      this.minutesValue = newMinutesValue;
      this.secondsValue = newSecondsValue;
      this.millisecondsValue = newMillisecondsValue;
      this.isInitialValue = false;
    } else if (isDateChanged) {
      this.yearValue = newYearValue;
      this.monthValue = newMonthValue;
      this.dateValue = newDateValue;
      this.startTime.setHours(this.hoursValue);
      this.startTime.setMinutes(this.minutesValue);
      this.startTime.setSeconds(this.secondsValue);
      this.startTime.setMilliseconds(this.millisecondsValue);
    } else {
      this.hoursValue = newHoursValue;
      this.minutesValue = newMinutesValue;
      this.secondsValue = newSecondsValue;
      this.millisecondsValue = newMillisecondsValue;
      this.startTime.setDate(this.dateValue);
      this.startTime.setMonth(this.monthValue);
      this.startTime.setFullYear(this.yearValue);
    }
  }

  //=========
  public minDate: Date = void 0;
  public events: Array<any>;
  public tomorrow: Date;
  public afterTomorrow: Date;
  public formats: Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
  public format: string = this.formats[0];
  public dateOptions: any = {
    formatYear: 'YY',
    startingDay: 1,
  };
  // private opened: boolean = false;


  public constructor(el: ElementRef) {
    this.startTime = new Date();
    (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    this.events = [
      {date: this.tomorrow, status: 'full'},
      {date: this.afterTomorrow, status: 'partially'},
    ];
    this.nativeElement = el.nativeElement;
  }

  public getDate(): number {
    return this.startTime && this.startTime.getTime() || new Date().getTime();
  }

  // public open(): void {
  //   this.opened = !this.opened;
  // }
  //
  // //
  // public toggleMin(): void {
  //   this.startTime = new Date(this.minDate.valueOf());
  // }

  ngOnInit() {
    let elements = this.nativeElement.getElementsByTagName('input');
    this.hoursElement = elements[0];
    this.minutesElement = elements[1];
  }


  /**
   * Fixing bootstrap timepicker issue
   */
  ngDoCheck() {
    this.hoursElement.value = this.hoursValue;
    this.minutesElement.value = this.minutesValue;
  }
}