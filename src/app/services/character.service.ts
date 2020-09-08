import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  url = 'http://26.163.161.201:8090/api/v1/character';

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }

  getCharactersPlayer(loginUID: number): Observable<Character[]> {
    console.log("Listando todos os personagens do usuário com o loginUID::" + loginUID);
    return this.httpClient.get<Character[]>(this.url + '/findCharacters/loginUID/' + loginUID, this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
  }

  updateCharacterPlayer(updateCharacter : Character): Observable<Character[]> {
    console.log("Atualizando personagem " + updateCharacter.charType + " do usuário com o loginUID::" + updateCharacter.loginUID);
    console.log("Dados a serem atualizados - EXP::" + updateCharacter.exps4 + " | " + "Promotion::" + updateCharacter.promotion);
    return this.httpClient.post<Character[]>(this.url + '/updateCharacter', updateCharacter, this.httpOptions)
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
