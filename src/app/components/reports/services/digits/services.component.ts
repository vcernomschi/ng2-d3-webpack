/**
 * Created by vcernomschi on 9/23/16.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'dm-aws-services',
  templateUrl: './services.html',
})
export class AwsServicesComponent {
  // public totalEstCosts: number = 39.668;
  public lambdaCosts: number = 65;
  public dynamoDbCosts: number = 82.2;
  public s3Costs: number = 30.5;
  public elasticSearchCosts: number = 66.5;
  public cloudFrontCosts: number = 0.844;
  public snsCosts: number = 2.532;
}