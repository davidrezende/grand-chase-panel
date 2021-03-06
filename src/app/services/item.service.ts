import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ItemPanel } from '../models/item-panel';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  // url = 'http://26.163.161.201:8090/api/v1/item';
  url : string;

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) {
    this.url = `${environment.apiUrl}/api/v1/item`;
   }

  newItemFromPanel(item: ItemPanel): Observable<ItemPanel> {
    console.log("Adicionando novo item pelo painel");
    return this.httpClient.post<ItemPanel>(this.url + '/newItemFromPanel', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
  }

  deleteItem(item: Item): Observable<Item> {
    console.log("Removendo item da conta de player");
    return this.httpClient.post<Item>(this.url + '/remove', JSON.stringify(item), this.httpOptions)
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
