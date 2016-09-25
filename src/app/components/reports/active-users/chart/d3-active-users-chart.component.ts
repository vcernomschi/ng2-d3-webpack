/**
 * Created by vcernomschi on 9/23/16.
 */

/**
 * Created by vcernomschi on 9/23/16.
 */

import { Component, OnInit, ElementRef } from '@angular/core';
// import { D3Service, D3, Selection } from 'd3-ng2-service'; // <-- import the D3 Service, the type alias for the d3 variable and the Selection interface

@Component({
    selector: 'd3-active-users-chart',
    templateUrl: './d3-active-users-chart.html',
    styleUrls: ['./d3-active-users-chart.css']
})
export class D3ActiveUsersChartComponent {

    // private d3: D3; // <-- Define the private member which will hold the d3 reference
    // private parentNativeElement: any;
    public testTitle: string = 'd3-active-users-chart here';


//     constructor(element: ElementRef, d3Service: D3Service) { // <-- pass the D3 Service into the constructor
//         this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
//         this.parentNativeElement = element.nativeElement;
//     }
//
//     ngOnInit() {
//         let d3 = this.d3; // <-- for convenience use a block scope variable
//         let d3ParentElement: Selection<any, any, any, any>; // <-- Use the Selection interface (very basic here for illustration only)
//
// // ...
//
//         if (this.parentNativeElement !== null) {
//
//             d3ParentElement = d3.select(this.parentNativeElement); // <-- use the D3 select method
//
//             // Do more D3 things
//
//         }
//     }

}