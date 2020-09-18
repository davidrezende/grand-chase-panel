import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  url: string;
  authTokenUrl = "/oauth/token";
  revokeTokenUrl = "/api/v1/token/revoke";
  jwtPayload: any;

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService ) {
      this.url = `${environment.apiUrl}`;
      this.loadToken();
     }

  login(user: string, password: string): Promise<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    const body = `username=${user}&password=${password}&grant_type=password`;

    return this.http.post(this.url+this.authTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        console.log(response);

        this.stockToken(response['access_token']);
      })
      .catch(response => {
        console.log('Error: ' + JSON.stringify(response['error'].error));
        console.log(headers);
        console.log(body);
        console.log('Error todo: ' + JSON.stringify(response));


        if (response['error'].error === 'invalid_grant') {
          return Promise.reject('Usuário ou senha inválida!');
        }
        return Promise.reject(response);
      });
  }

  private stockToken(token: string){
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private loadToken(){
    const token = localStorage.getItem('token');
    if(token){
      this.stockToken(token);
    }
  }

  hasPermission(permission: string){
    return this.jwtPayload && this.jwtPayload.authorities.includes(permission);
  }

  getNewAccessToken(): Promise<void>{
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.url+this.authTokenUrl, body,
      { headers, withCredentials: true })
    .toPromise()
    .then(response => {
      this.stockToken(response['access_token']);
      console.log('Novo access token criado!');
      return Promise.resolve(null);
    })
    .catch(response => {
      console.error('Erro ao renovar token.', response);
      return Promise.resolve(null);
    })
  }

  isInvalidAccessToken(){
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  hasAnyPermission(roles){
    for(const role of roles){
      if(this.hasPermission(role)){
        return true;
      }
    }
    return false;
  }

  cleanAccessToken(){
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  logout(){
    console.log('caminho do logout: ' + this.url+this.revokeTokenUrl);
    return this.http.delete(this.url+this.revokeTokenUrl, {withCredentials: true})
      .toPromise()
      .then(() => {
        this.cleanAccessToken();
      })
  }


}
