/**
 * Created by vcernomschi on 9/23/16.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'dm-cloud-trail-details',
  templateUrl: './cloud-trail-details.html',
})
export class CloudTrailDetailsComponent {
  public title: string = 'Cloud Trail Logs';

  private data: any = [
    {name: 'Vitali Cernomschi', email: 'vcernomschi@mitocgroup.com', age: 29, city: 'Chisinau'},
    {name: 'Olga Cernomschi', email: 'olgacernomschi@yahoo.com', age: 29, city: 'Chisinau'},
    {name: 'Olga Cernomschi1', email: 'olgacernomschi1@yahoo.com', age: 43, city: 'Chisinau'},
    {name: 'Olga Cernomschi2', email: 'olgacernomschi2@yahoo.com', age: 4, city: 'Chisinau'},
    {name: 'Olga Cernomschi3', email: 'olgacernomschi3@yahoo.com', age: 29, city: 'Chisinau'},
    {name: 'Olga Cernomschi4', email: 'olgacernomschi4@yahoo.com', age: 43, city: 'Chisinau'},
    {name: 'Olga Cernomschi5', email: 'olgacernomschi5@yahoo.com', age: 60, city: 'Chisinau'},
    {name: 'Olga Cernomschi6', email: 'olgacernomschi6@yahoo.com', age: 29, city: 'Chisinau'},
    {name: 'Olga Cernomschi7', email: 'olgacernomschi7@yahoo.com', age: 32, city: 'Chisinau'},
    {name: 'Olga Cernomschi8', email: 'olgacernomschi8@yahoo.com', age: 29, city: 'Chisinau'},
  ];
  private selectedEntities: any[];

  public setSelectedEntities(event: Event): void {
    console.log('setSelectedEntities event: ', event)
  }

  public addRemoveSelectedEntity(event: Event): void {
    console.log('addRemoveSelectedEntity event: ', event)
  }
}