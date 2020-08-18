import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user = {} as User;
  users: User[];
  sexSelected: string = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.sexSelected = event.target.value;
    this.user.sex = this.sexSelected;
    console.log(this.user);
  }

  findUserByLogin(login: string) {
    this.userService.findUserByLogin(login).subscribe((user: User) => {
      this.user = user;
    })
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

  getUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  cleanForm(form: NgForm) {
    this.getUsers();
    form.resetForm();
    this.user = {} as User;
  }

}
