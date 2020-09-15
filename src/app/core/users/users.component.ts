import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user = {} as User;
  lastRegisterUser = {} as User;
  users: User[];
  sexSelected: string = '';


  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.sexSelected = event.target.value;
    this.user.sex = this.sexSelected;
    console.log(this.user);
  }

  async findUserByLogin(login: string) {
    // this.userService.findUserByLogin(login).subscribe((user: User) => {
    //   this.user = user;
    // })
    await this.userService.findUserByLogin(login).then(user => {
      this.user = user;
    });
  }

  saveUser(form: NgForm) {
    if (this.user.loginUID !== undefined) {
      this.userService.updateUser(this.user).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      // this.userService.saveUser(this.user).subscribe(() => {
      // this.cleanForm(form);
      // });
      this.userService.saveUser(this.user).subscribe(
        resultado => {
          console.log(resultado)
          alert('Jogador ' + this.user.login + ' salvo com sucesso')
          this.lastRegisterUser = resultado;
          // this.getUserRegistered();
          this.cleanForm(form);
        },
        erro => {
          if (erro.status != 200) {
            alert('Erro ao salvar novo jogador.');
          }
        }
      );
    }
  }

  // getUserRegistered() {
  //   this.userService.findUserByLogin(this.user.login).subscribe((userReg : User) => {
  //     this.lastRegisterUser = userReg;
  //     console.log("Usuario inserido buscado: " + this.lastRegisterUser.login);
  //   });
  // }


  async getUserRegistered() {
    await this.userService.findUserByLogin(this.user.login).then(userReg => {
      this.lastRegisterUser = userReg;
    });
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.user = {} as User;
    console.log("Usuario inserido buscado dps do clean: " + this.lastRegisterUser.login);
  }

}
