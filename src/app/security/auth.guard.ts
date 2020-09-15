import { AuthService } from 'src/app/security/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
    ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.auth.isInvalidAccessToken()){
        return this.auth.getNewAccessToken()
          .then(() =>{
            if(this.auth.isInvalidAccessToken()){
              this.router.navigate(['/login']);
              return false;
            }
            return true;
          });
      }else if(next.data.roles && !this.auth.hasAnyPermission(next.data.roles)){
        alert('Acesso Negado!');
        this.router.navigate(['/acesso-negado']);
        return false;
      }
    return true;
  }

}
