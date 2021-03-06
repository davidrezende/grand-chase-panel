import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SecutiryModule } from './security/security.module'
import { CoreModule } from './core/core.module';
import {ToastyModule } from 'ng2-toasty';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHttpInterceptor } from './security/jwt-http-interceptor';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    // LoginComponent,
    // UsersComponent,
    // CharacteresComponent,
    // CoinsComponent,
    // ManagementPlayerComponent,
    // ItemsComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    SecutiryModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ToastyModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID , useValue:'pt-BR'},
    { provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
