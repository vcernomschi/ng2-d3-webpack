/**
 * Created by vcernomschi on 9/28/16.
 */

import { Component, Input, OnInit } from '@angular/core';
import { TimepickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'dm-custom-time-interval',
    templateUrl: './custom-time-interval.html',
    styleUrls: ['./custom-time-interval.css'],
})
export class CustomTimeIntervalComponent implements ControlValueAccessor, OnInit {
    setDisabledState(isDisabled: boolean): void {
        console.log('setDisabledState')
    }
    registerOnTouched(fn: any): void {
    }

    ngOnInit(): void {
    }

    registerOnChange(fn: any): void {
    }
    writeValue(obj: any): void {
    }

    @Input() private showWeeks:boolean = false;
    public isCollapsed: boolean = true;

    public startedDate: Date = new Date();
    public endDate: Date = new Date();
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
    public opened: boolean = false;

    public customClass: Array<{date: Date, mode: string, clazz: string}> = [];
    public dateDisabled: Array<{date: Date, mode: string}> = [];

    public constructor() {
        (this.startedDate = new Date()).setDate(this.startedDate.getDate() - 1);
        (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
        (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
        (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
        this.events = [
            {date: this.tomorrow, status: 'full'},
            {date: this.afterTomorrow, status: 'partially'},
        ];
        this.customClass.push({
            date: new Date(),
            mode: '',
            clazz: 'dm-red-in-black',
        });
        this.dateDisabled.push({
            date: this.afterTomorrow,
            mode: 'date',
        });
        this.showWeeks = false;
    }

    public collapsed(event: any): void {
        // console.log('collapsed: ', event);
    }

    public expanded(event: any): void {
        // console.log('expanded: ', event);
    }

    public getStartedDate(): number {
        return this.startedDate && this.startedDate.getTime() || new Date().getTime();
    }

    public getEndDate(): number {
        return this.endDate && this.endDate.getTime() || new Date().getTime();
    }

    public datePickerChanged(e: Event): void {
        e.preventDefault();
        e.stopPropagation();
    }
}