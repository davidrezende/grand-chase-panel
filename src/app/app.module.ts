import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SecutiryModule } from './security/security.module'
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './security/login/login.component';
import { UsersComponent } from './core/users/users.component';
import { CoinsComponent } from './core/coins/coins.component';
import { CharacteresComponent } from './core/characteres/characteres.component';
import { ManagementPlayerComponent } from './core/management-player/management-player.component';
import { ItemsComponent } from './core/items/items.component';
import { CoreModule } from './core/core.module';
@NgModule({
  declarations: [
    AppComponent,
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
