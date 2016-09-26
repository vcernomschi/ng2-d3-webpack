/**
 * Created by vcernomschi on 9/23/16.
 */

import {Component} from '@angular/core';

@Component({
    selector: 'd3-services',
    templateUrl: './d3-services.html',
    styleUrls: ['./d3-services.css']
})
export class D3ServicesComponent {
    public totalEstCosts: number = 39.668;
    public lambdaCosts: number = 7.596;
    public dynamoDbCosts: number = 10.128;
    public s3Costs: number = 6.752;
    public elasticSearchCosts: number = 11.816;
    public cloudFrontCosts: number = 0.844;
    public snsCosts: number = 2.532;
}