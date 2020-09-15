import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { UsersComponent } from './core/users/users.component';
import { ItemsComponent } from './core/items/items.component';
import { CharacteresComponent } from './core/characteres/characteres.component';
import { ManagementPlayerComponent } from './core/management-player/management-player.component';
import { LoginComponent } from './security/login/login.component';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [
  { path: 'player',
   component:  UsersComponent,
   canActivate: [AuthGuard]
  },
  { path: 'item',
   component: ItemsComponent,
   canActivate: [AuthGuard]
  },
  { path: 'characteres',
   component: CharacteresComponent,
   canActivate: [AuthGuard]
   },
  { path: 'managementPlayer',
   component: ManagementPlayerComponent,
   canActivate: [AuthGuard]
  },
];
// configures NgModule imports and  exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
