import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from './users/users.component';
import { FormsModule } from '@angular/forms';
import { ItemsComponent } from './items/items.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { CharacteresComponent } from './characteres/characteres.component';
import { ManagementPlayerComponent } from './management-player/management-player.component';
import { CoinsComponent } from './coins/coins.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ItemsComponent,
    LoginComponent,
    CharacteresComponent,
    ManagementPlayerComponent,
    CoinsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
