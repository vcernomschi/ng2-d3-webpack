import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ActiveUsersService {

  // URL to Elastic Search API
  private esEndpointUrl = 'https://search-deep-dev-rum-35ef6809-lociqg5633piigw62hjuetzany.us-east-1.es.amazonaws.com/rum/logs/_search?pretty&size=20&fields=time,identityId&sort=time:asc';

  constructor(private http: Http) {
  }

  /**
   * @param res {Response}
   * @returns {any|{}}
   */
  private extractData(res: Response) {
    console.log('res: ', res);
    let body = res.json();
    return body.data || { };
  }

  /**
   * @returns {Observable<R>}
   */
  public getActiveUsers (): Observable<any[]> {
    return this.http.get(this.esEndpointUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * @param error {any}
   * @returns {ErrorObservable}
   */
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}