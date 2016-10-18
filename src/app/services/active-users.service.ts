import { Injectable }     from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { AppSettings }  from '../module/app.setting';

@Injectable()
export class DataProviderService {

  constructor(private http: Http) {
  }

  /**
   * @param {Array<{string: key, string: value}>} searchParams
   * @returns {URLSearchParams}
   */
  private createQueryParams(searchParams: Array<{key: string, value: string}>): URLSearchParams {
    let params = new URLSearchParams();

    for (let i = 0; i < searchParams.length; i++) {
      params.set(searchParams[i].key, searchParams[i].value);
    }

    return params;
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
  public getData(searchParams: Array<{key: string, value: string}>): Observable<any[]> {
    return this.http.get(
      `${AppSettings.ELASTIC_SEARCH_ENDPOINT}/rum/logs/_search`,
      {
        search: this.createQueryParams(searchParams),
      }
    ).map(this.extractData)
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