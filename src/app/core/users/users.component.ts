import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

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


  constructor(private userService: UserService,
    private toasty: ToastyService,
    private errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.sexSelected = event.target.value;
    this.user.sex = this.sexSelected;
    console.log(this.user);
  }

  async findUserByLogin(login: string) {
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
      this.userService.saveUser(this.user).subscribe(
        resultado => {
          this.toasty.success("Jogador '" + this.user.login + "' salvo com sucesso")
          this.lastRegisterUser = resultado;
          this.cleanForm(form);
        },
        erro => {
          if (erro.status != 200) {
            this.errorHandlerService.handle(erro);
            return;
          }
        }
      );
    }
  }

  async getUserRegistered() {
    await this.userService.findUserByLogin(this.user.login).then(userReg => {
      this.lastRegisterUser = userReg;
    });
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.user = {} as User;
  }

}
