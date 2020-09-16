import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth : AuthService,
             private router: Router,
             private toasty: ToastyService)  { }

  username : string;
  password : string;

  login(form : NgForm){
    this.auth.login(this.username, this.password)
      .then(() => {
        if(this.auth.hasPermission('ROLE_ADMIN') || this.auth.hasPermission('ROLE_MOD')){
          this.router.navigate(['/managementPlayer']);
        }else{
            this.toasty.warning('Usuario bloqueado');
          }
      })
      .catch(error => {
        this.toasty.error('Vish EROOOOOOOU!\nUsuario ou senha incorretos!')
      });
  }

}
