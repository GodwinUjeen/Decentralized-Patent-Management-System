import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { EtherscanResponse } from '../models/etherscan-response';

const patentAddress: string = '0x67e85C5e76AbB2df3F702Ae06Af46ceb33d76F9F';

@Injectable({
  providedIn: 'root',
})
export class SharedPatentService {
  constructor(private httpClient: HttpClient) {}
  getSharedPatents(): Observable<HttpResponse<EtherscanResponse[]>> {
    return this.httpClient
      .get<EtherscanResponse[]>(
        'https://api-ropsten.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=' +
          patentAddress +
          '&apikey=U135AAK1Q682YD2SA98SMJC5JX9RRTS129',
        { observe: 'response' }
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
