import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth : AuthService, private router: Router)  { }

  username : string;
  password : string;

  login(form : NgForm){
    this.auth.login(this.username, this.password)
      .then(() => {

        if(this.auth.hasPermission('ADMINISTRADOR')){

          this.router.navigate(['/managementPlayer']);

        }else{
            // this.toasty.error('Usuário bloqueado!');
            alert('Usuario bloqueado');
          }
      })
      .catch(error => {
        // this.errorHandler.handle(error);
        alert('Vish EROOOOOOOU!\nUsuario ou senha incorretos!')
      });
  }

}
