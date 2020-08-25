import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ItemsComponent } from '../items/items.component';
import { User } from '../models/user';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-management-player',
  templateUrl: './management-player.component.html',
  styleUrls: ['./management-player.component.css']
})
export class ManagementPlayerComponent implements OnInit {

  user = {} as User;
  @ViewChild(ItemsComponent) child;


  constructor(private userService: UserService) { }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.child.user.login = "aaaaa";
  }

  findUserByLogin(form: NgForm) {
    this.userService.findUserByLogin(this.user.login).subscribe(
      resultado => {
        console.log(resultado)
        this.user = resultado;
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
