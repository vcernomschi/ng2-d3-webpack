import { Component, OnInit, ElementRef } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service';

@Component({
  selector: 'dm-gantt',
  templateUrl: './gantt.html',
})
export class GanttChartComponent {
  public title: string = 'Gantt Chart';

  //https://search-deep-dev-rum-35ef6809-lociqg5633piigw62hjuetzany.us-east-1.es.amazonaws.com/rum/logs/_search?q=unscramble&fields=resourceId

  public UNSCRAMBLE_URL: string = 'https://4cqt1tycgb.execute-api.us-east-1.amazonaws.com/dev/livebook-content/book/unscramble';
  public ELASTIC_SEARCH_URL: string = 'https://search-deep-dev-rum-35ef6809-lociqg5633piigw62hjuetzany.us-east-1.es.amazonaws.com/rum/logs/_search';
  public FILTER_BY: string = 'amazonaws.com/dev/livebook-content/book/unscramble';
  public IS_MAIN_IDS_PROCESSED: boolean = false;
  public IS_ALL_DATA_PROCESSED: boolean = false;
  public timeLineData: any;
  public dataSet: any;
  public DEEP_RESOURCE: string = 'deep-resource';
  public DEEP_KERNEL: string = 'deep-kernel';
  public DEEP_CORE: string = 'deep-core';
  public DEEP_SECURITY: string = 'deep-security';
  public DEEP_DB: string = 'deep-db';
  public DEEP_CACHE: string = 'deep-cache';
  public KERNEL_LOAD_FROM_CACHE: string = "KernelLoadFromCache";
  public colors: any = {
  'deep-resource': 'green',
  'deep-kernel': 'blue',
  'deep-core': 'pink',
  'deep-security': 'brown',
  'deep-db': 'yellow',
  'deep-cache': 'purple',
};
  // public dateFormat: any = d3.time.format('%Y-%m-%dT%H:%M:%S.%LZ');
  private d3: D3; // <-- Define the private member which will hold the d3 reference
  // private parentNativeElement: any;

  constructor(element: ElementRef, d3Service: D3Service) { // <-- pass the D3 Service into the constructor
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    // this.parentNativeElement = element.nativeElement;
    console.log('constructor: ', this.d3);
  }

  ngOnInit() {
    let d3 = this.d3; // <-- for convenience use a block scope variable
    // let d3ParentElement: Selection<any, any, any, any>; // <-- Use the Selection interface (very basic here for illustration only)

    console.log('on init')
    // if (this.parentNativeElement !== null) {
    //
    //   d3ParentElement = d3.select(this.parentNativeElement); // <-- use the D3 select method
    //
    //   // Do more D3 things
    //
    // }
  }

  /**
   * ELASTIC_SEARCH_QUERY
   * @returns {string}
   */
  public get esQuery(): string{
    return this.ELASTIC_SEARCH_URL + '?pretty&size=20000&sort=time:asc&fields=mainRequestId&q=resourceId:%22' +
      this.UNSCRAMBLE_URL + '%22';
  }

  /**
   * ELASTIC_SEARCH_FULL_URL
   * @returns {string}
   */
  public get esFullUrl() {
    return this.ELASTIC_SEARCH_URL +
      '?pretty&size=20000&sort=time:asc&fields=mainRequestId,time,requestId,eventId,eventName,resourceId,' +
      'resourceType,service,eventLevel,context,memoryUsage.rss,memoryUsage.heapTotal,memoryUsage.heapUsed';
  }
}