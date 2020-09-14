import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacteresComponent } from './characteres/characteres.component';
import { ManagementPlayerComponent } from './management-player/management-player.component';
import { CoinsComponent } from './coins/coins.component';
import { UsersComponent } from './users/users.component';
import { ItemsComponent } from './items/items.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsersComponent,
    ItemsComponent,
    CharacteresComponent,
    ManagementPlayerComponent,
    CoinsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class CoreModule { }
