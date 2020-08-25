import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { UsersComponent } from './users/users.component';
import { ItemsComponent } from './items/items.component';
import { LoginComponent } from './login/login.component';
import { CharacteresComponent } from './characteres/characteres.component';
import { ManagementPlayerComponent } from './management-player/management-player.component';

const routes: Routes = [
  { path: 'player', component:  UsersComponent},
  { path: 'item', component: ItemsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'characteres', component: CharacteresComponent },
  { path: 'managementPlayer', component: ManagementPlayerComponent },
];
// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
