import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacteresComponent } from './characteres/characteres.component';
import { ManagementPlayerComponent } from './management-player/management-player.component';
import { CoinsComponent } from './coins/coins.component';
import { UsersComponent } from './users/users.component';
import { ItemsComponent } from './items/items.component';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ToastyModule } from 'ng2-toasty';
import { DeleteItemComponent } from './delete-item/delete-item.component';

@NgModule({
  declarations: [
    UsersComponent,
    ItemsComponent,
    CharacteresComponent,
    ManagementPlayerComponent,
    CoinsComponent,
    DeleteItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ToastyModule
  ]
})
export class CoreModule { }
