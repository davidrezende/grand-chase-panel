import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CoinService } from '../../services/coin.service';
import { VirtualCash } from '../../models/virtual-cash';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-management-player',
  templateUrl: './management-player.component.html',
  styleUrls: ['./management-player.component.css']
})
export class ManagementPlayerComponent {

  user = {} as User;
  vpInfo = {} as VirtualCash;
  constructor(private userService: UserService,
    private coinService: CoinService,
    private toasty: ToastyService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  async findDetailsUserByLogin(form: NgForm) {
    var login = this.user.login;
    this.cleanForm(form);

    await this.userService.findUserByLogin(login).then(resultado => {
      this.toasty.success("Player '" + login + "' encontrado")
      this.user = resultado;
    }, error => {
      this.toasty.error("Player '" + login + "' não encontrado")
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

    console.log("loginUID:::::" + this.user.loginUID);


    if (this.user.loginUID != undefined || this.user.loginUID != null) {
      this.coinService.getVPUser(this.user.loginUID).subscribe(
        resultado => {
          this.vpInfo = resultado;
          console.log("VP: " + resultado.vcPoint);
        },
        erro => {
          if (erro.status != 200) {
              this.vpInfo.vcPoint = 0;
              this.toasty.error("VP: Problema ao obter quantia de VP");
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
