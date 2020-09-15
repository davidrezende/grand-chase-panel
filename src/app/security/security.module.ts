import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SecurityRoutingModule } from './security-routing.module';
import { FormsModule, NgForm } from '@angular/forms';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GCHttpInterceptor } from './gc-http-interceptor';
export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    SecurityRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  exports: [ LoginComponent ],
  providers: [
    JwtHelperService,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: GCHttpInterceptor,
          multi: true
      },
    AuthGuard
  ]
})
export class SecutiryModule { }
