import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { AppSettings }  from '../module/app.setting';

@Injectable()
export class ActiveUsersService {

  // URL to Elastic Search API
  private esEndpointUrl = `${AppSettings.ELASTIC_SEARCH_ENDPOINT}/rum/logs/_search?pretty&size=20&fields=time,identityId&sort=time:asc`;

  constructor(private http: Http) {
  }

  /**
   * @param res {Response}
   * @returns {any|{}}
   */
  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  /**
   * @returns {Observable<R>}
   */
  public getActiveUsers(): Observable<any[]> {
    return this.http.get(this.esEndpointUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * @param error {any}
   * @returns {ErrorObservable}
   */
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}