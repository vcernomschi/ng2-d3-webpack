/**
 * Created by vcernomschi on 9/28/16.
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ElementRef,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'dm-custom-time-interval',
  templateUrl: './custom-time-interval.html',
  styleUrls: ['./custom-time-interval.css'],
})
export class CustomTimeIntervalComponent implements ControlValueAccessor, OnInit {

  //display week number on calendar
  @Input() private showWeeks: boolean = false;

  private isStartInitialValue: boolean = true;
  private isEndInitialValue: boolean = true;
  private nativeElement: any;

  // properties to support start DatePicker + Timepicker
  private yearStartValue: number;
  private monthStartValue: number;
  private dateStartValue: number;
  private hoursStartValue: number;
  private minutesStartValue: number;
  private secondsStartValue: number;
  private millisecondsStartValue: number;
  private hoursStartElement: any;
  private minutesStartElement: any;

  // properties to support end DatePicker + Timepicker
  private yearEndValue: number;
  private monthEndValue: number;
  private dateEndValue: number;
  private hoursEndValue: number;
  private minutesEndValue: number;
  private secondsEndValue: number;
  private millisecondsEndValue: number;
  private hoursEndElement: any;
  private minutesEndElement: any;

  public hstep: number = 1;
  public mstep: number = 1;
  public ismeridian: boolean = true;

  // flag to enable readOnly for timepickers
  public isEnabled: boolean = true;

  public chartHeader: string;
  public dropdownSelected: string = 'Select';
  public isCollapsed: boolean = true;

  public startTime: Date;
  public endTime: Date;

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

  public constructor(el: ElementRef) {
    this.startTime = new Date();
    this.endTime = new Date();
    (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    this.events = [
      {date: this.tomorrow, status: 'full'},
      {date: this.afterTomorrow, status: 'partially'},
    ];
    this.nativeElement = el.nativeElement;
  }

  public collapsed(event: any): void {
    // console.log('collapsed: ', event);
  }

  public expanded(event: any): void {
    // console.log('expanded: ', event);
  }

  public datePickerChanged(e: Event): void {
    console.log('datePickerChanged');
    // e.preventDefault();
    // e.stopPropagation();
  }

  public dropdownChanged(e: any): void {
    console.log('dropdownChanged');
    this.dropdownSelected = e.target.text.trim();

    this.isCollapsed = !(this.dropdownSelected.indexOf('Custom') !== -1);

    e.preventDefault();
    e.stopPropagation();
  }

  setDisabledState(isDisabled: boolean): void {
    console.log('setDisabledState')
  }

  registerOnTouched(fn: any): void {
  }

  ngOnInit(): void {
    this.chartType = this.radioModel;
    let elements = this.nativeElement.getElementsByTagName('input');
    this.hoursStartElement = elements[0];
    console.log('this.hoursStartElement: ', this.hoursStartElement)
    this.minutesStartElement = elements[1];
    console.log('this.hoursStartElement: ', this.minutesStartElement)
    this.hoursEndElement = elements[2];
    console.log('this.hoursStartElement: ', this.hoursEndElement)
    this.minutesEndElement = elements[3];
    console.log('this.hoursStartElement: ', this.minutesEndElement)
  }

  /**
   * Fixing bootstrap timepicker issue
   */
  ngDoCheck() {
    console.log('this.hoursStartValue: ', this.hoursStartValue);
    console.log('this.minutesStartValue: ', this.minutesStartValue);
    console.log('this.hoursEndValue: ', this.hoursEndValue);
    console.log('this.minutesEndValue: ', this.minutesEndValue);
    this.hoursStartElement.value = this.hoursStartValue;
    this.minutesStartElement.value = this.minutesStartValue;
    this.hoursEndElement.value = this.hoursEndValue;
    this.minutesEndElement.value = this.minutesEndValue;
  }

  registerOnChange(fn: any): void {
  }

  writeValue(obj: any): void {
  }

  //============================ CHART FUNCTIONALITY ======================
  @Input() radioModel: string = 'line';
  @Input() chartModel: Array<any>;
  @Output() chartChanged = new EventEmitter();
  private chartType: string;

  /**
   * @param chartType {String}
   * @returns {boolean}
   */
  public isChartImplemented(chartType: string): boolean {
    for (let model of this.chartModel) {

      if (model.type === chartType) {
        return true;
      }
    }
    return false;
  }

  public onChangeChartType(e: any): void {
    console.log('onChangeChartType');
    this.radioModel = this.isChartImplemented(this.radioModel) ? this.radioModel : this.chartType;

    this.chartChanged.emit(this.radioModel);

    e.stopPropagation();
  }

  onStartTimeChange(newValue: any) {

    console.log('onStartTimeChange: ', newValue);

    let newYearValue = newValue.getFullYear();
    let newMonthValue = newValue.getMonth();
    let newDateValue = newValue.getDate();
    let newHoursValue = newValue.getHours();
    let newMinutesValue = newValue.getMinutes();
    let newSecondsValue = newValue.getSeconds();
    let newMillisecondsValue = newValue.getMilliseconds();
    let isDateChanged = (newMillisecondsValue === 0 && newSecondsValue === 0
    && newMinutesValue === 0 && newHoursValue === 0) ? true : false;

    if (this.isStartInitialValue) {
      this.yearStartValue = newYearValue;
      this.monthStartValue = newMonthValue;
      this.dateStartValue = newDateValue;
      this.hoursStartValue = newHoursValue;
      this.minutesStartValue = newMinutesValue;
      this.secondsStartValue = newSecondsValue;
      this.millisecondsStartValue = newMillisecondsValue;
      this.isStartInitialValue = false;
    } else if (isDateChanged) {
      this.yearStartValue = newYearValue;
      this.monthStartValue = newMonthValue;
      this.dateStartValue = newDateValue;
      this.startTime.setHours(this.hoursStartValue);
      this.startTime.setMinutes(this.minutesStartValue);
      this.startTime.setSeconds(this.secondsStartValue);
      this.startTime.setMilliseconds(this.millisecondsStartValue);
    } else {
      this.hoursStartValue = newHoursValue;
      this.minutesStartValue = newMinutesValue;
      this.secondsStartValue = newSecondsValue;
      this.millisecondsStartValue = newMillisecondsValue;
      this.startTime.setDate(this.dateStartValue);
      this.startTime.setMonth(this.monthStartValue);
      this.startTime.setFullYear(this.yearStartValue);
    }
  }

  onEndTimeChange(newValue: any) {

    console.log('onEndTimeChange: ', newValue);

    let newYearValue = newValue.getFullYear();
    let newMonthValue = newValue.getMonth();
    let newDateValue = newValue.getDate();
    let newHoursValue = newValue.getHours();
    let newMinutesValue = newValue.getMinutes();
    let newSecondsValue = newValue.getSeconds();
    let newMillisecondsValue = newValue.getMilliseconds();
    let isDateChanged = (newMillisecondsValue === 0 && newSecondsValue === 0
    && newMinutesValue === 0 && newHoursValue === 0) ? true : false;

    if (this.isEndInitialValue) {
      this.yearEndValue = newYearValue;
      this.monthEndValue = newMonthValue;
      this.dateEndValue = newDateValue;
      this.hoursEndValue = newHoursValue;
      this.minutesEndValue = newMinutesValue;
      this.secondsEndValue = newSecondsValue;
      this.millisecondsEndValue = newMillisecondsValue;
      this.isEndInitialValue = false;
    } else if (isDateChanged) {
      this.yearEndValue = newYearValue;
      this.monthEndValue = newMonthValue;
      this.dateEndValue = newDateValue;
      this.endTime.setHours(this.hoursEndValue);
      this.endTime.setMinutes(this.minutesEndValue);
      this.endTime.setSeconds(this.secondsEndValue);
      this.endTime.setMilliseconds(this.millisecondsEndValue);
    } else {
      this.hoursEndValue = newHoursValue;
      this.minutesEndValue = newMinutesValue;
      this.secondsEndValue = newSecondsValue;
      this.millisecondsEndValue = newMillisecondsValue;
      this.endTime.setDate(this.dateEndValue);
      this.endTime.setMonth(this.monthEndValue);
      this.endTime.setFullYear(this.yearEndValue);
    }
  }
}