import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { UsersComponent } from './users/users.component';
import { ItemsComponent } from './items/items.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'player', component:  UsersComponent},
  { path: 'item', component: ItemsComponent },
];
// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
