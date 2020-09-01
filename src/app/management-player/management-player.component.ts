import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { ItemsComponent } from '../items/items.component';
import { User } from '../models/user';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CharacteresComponent } from '../characteres/characteres.component';

@Component({
  selector: 'app-management-player',
  templateUrl: './management-player.component.html',
  styleUrls: ['./management-player.component.css']
})
export class ManagementPlayerComponent {

  user = {} as User;
  // @ViewChild(ItemsComponent) childItem : ItemsComponent;
  // @ViewChild(CharacteresComponent) childChar : CharacteresComponent;
  constructor(private userService: UserService) { }


  ngOnInit() {
  }

  // ngAfterViewInit() {
  //   this.childItem.user = this.user;
  //   this.childChar.user = this.user;
  // }

  findUserByLogin(form: NgForm) {
    var login = this.user.login;
    this.cleanForm(form);
    this.userService.findUserByLogin(login).subscribe(
      resultado => {
        console.log("cheguei aq no sucesso mlk")
        console.log(resultado)
        this.user = resultado;
        console.log("Usuario: " + this.user);
      },
      erro => {
        if (erro.status != 200) {
          this.cleanForm(form);
        }
      }
    );
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.user = {} as User;
  }

}
