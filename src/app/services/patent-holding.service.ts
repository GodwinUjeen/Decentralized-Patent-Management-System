import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { PatentInteface } from '../models/patent.interface';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PatentHoldingService {
  constructor(private httpClient: HttpClient) {}
  getOwnedPatent(
    fromAddress: string
  ): Observable<HttpResponse<PatentInteface[]>> {
    return this.httpClient
      .get<PatentInteface[]>(
        'https://api-ropsten.etherscan.io/api?module=account&action=tokennfttx&address=' +
          fromAddress +
          '&startblock=0&endblock=999999999&sort=asc&apikey=U135AAK1Q682YD2SA98SMJC5JX9RRTS129',
        {
          observe: 'response',
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
