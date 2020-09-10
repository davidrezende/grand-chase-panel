import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { VirtualCash } from '../models/virtual-cash';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  url = 'http://26.163.161.201:8090/api/v1/coins';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  sendVPUser(vpUser : VirtualCash): Observable<VirtualCash> {
    console.log("Atualizando VP do usuário com o loginUID::" + vpUser.loginUID);
    return this.httpClient.post<VirtualCash>(this.url + '/sendVP', vpUser, this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
  }

  getVPUser(login : number): Observable<VirtualCash> {
    console.log("Obtendo dados do VP do usuário com o loginUID::" + login);
    return this.httpClient.get<VirtualCash>(this.url + '/getVP/loginUID/' + login, this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
