import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // url = 'http://26.163.161.201:8090/api/v1/user';
  url : string;

  constructor(private httpClient: HttpClient) {
    this.url = `${environment.apiUrl}/api/v1/user`;
  }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // findUserByLogin(login: string): Observable<User> {
  //   return this.httpClient.get<User>(this.url + '/find/login/' + login, this.httpOptions)
  //     .pipe(
  //       retry(0),
  //       catchError(this.handleError)
  //     )
  // }


  async findUserByLogin(login: string) {
    return  await this.httpClient.get<User>(this.url + '/find/login/' + login, this.httpOptions).toPromise();
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + '/listAll')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um carro
  saveUser(user: User): Observable<User> {
    console.log("Adicionando novo usuario");
    return this.httpClient.post<User>(this.url + '/save', JSON.stringify(user), this.httpHeader)
    .pipe(
      retry(0),
      catchError(this.handleError)
      )
  }

  // utualiza um carro
  updateUser(user: User): Observable<User> {
    console.log("Alterando usuario");
    return this.httpClient.post<User>(this.url + '/update', JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
  }

  // deleta um carro
  // deleteCar(car: User) {
  //   return this.httpClient.delete<User>(this.url + '/' + car.id, this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     )
  // }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `${error.error.errors[0].message}`;
      console.log(JSON.stringify(error));
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
