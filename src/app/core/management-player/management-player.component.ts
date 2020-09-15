import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CoinService } from '../../services/coin.service';
import { VirtualCash } from '../../models/virtual-cash';

@Component({
  selector: 'app-management-player',
  templateUrl: './management-player.component.html',
  styleUrls: ['./management-player.component.css']
})
export class ManagementPlayerComponent {

  user = {} as User;
  vpInfo = {} as VirtualCash;
  constructor(private userService: UserService, private coinService: CoinService) { }

  ngOnInit() {
  }

  async findDetailsUserByLogin(form: NgForm) {
    var login = this.user.login;
    this.cleanForm(form);

    await this.userService.findUserByLogin(login).then(resultado => {
      console.log(resultado);
      this.user = resultado;
      console.log("Usuario:");
      console.log(this.user);
    });

    // this.userService.findUserByLogin(login).subscribe(
    //   resultado => {
    //     console.log(resultado);
    //     this.user = resultado;
    //     console.log("Usuario:");
    //     console.log(this.user);
    //   },
    //   erro => {
    //     if (erro.status != 200) {
    //       this.cleanForm(form);
    //     }
    //   }
    // );

    console.log("loginUID:::::" + this.user.loginUID );


    if (this.user.loginUID != undefined || this.user.loginUID != null) {
      this.coinService.getVPUser(this.user.loginUID).subscribe(
        resultado => {
          this.vpInfo = resultado;
          console.log("VP: " + resultado.vcPoint);
        },
        erro => {
          if (erro.status != 200) {
            // alert('Servico indisponivel.');
            this.cleanForm(form);
            return;
          }
        }
      );
    }
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.user = {} as User;
  }

}
