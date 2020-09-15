import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap, reduce } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export class NotAuthenticatedError { }

@Injectable()
export class GCHttpInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.url.includes('/oauth/token') && this.auth.isInvalidAccessToken() && !req.url.includes('/menu/find/store/') ) {
      return from(this.auth.getNewAccessToken())
        .pipe(
          mergeMap(() => {
            if (this.auth.isInvalidAccessToken()) {
              throw new NotAuthenticatedError();
            }
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });
            return next.handle(req);
          })
        );
    }

    return next.handle(req);
  }
}
