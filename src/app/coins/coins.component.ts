import { Component, OnInit, Input } from '@angular/core';
import { VirtualCash } from '../models/virtual-cash';
import { User } from '../models/user';
import { CoinService } from '../services/coin.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent implements OnInit {

  constructor(private coinService: CoinService) { }

  @Input() userFounded: User;
  user = {} as User;
  vpQuantity = {} as VirtualCash;


  ngOnInit() {
  }

  initUserInfo() {
    this.user = this.userFounded;
  }

  sendVPUser(form: NgForm) {
    this.initUserInfo();
    this.vpQuantity.loginUID = this.user.loginUID;

    if(this.vpQuantity.vcPoint <= 0 || this.vpQuantity.vcPoint > 9999){
      alert('Quantidade de VP inválida. \nA quantidade permitida deverá estar compreendida entre 1 ~ 9999');
      return;
    }

    console.log(this.vpQuantity);
    this.coinService.sendVPUser(this.vpQuantity).subscribe(
      resultado => {
        console.log(resultado);
        if (resultado != undefined || resultado != null) {
          alert('VP adicionado com sucesso!');
          this.cleanForm(form);
        } else {
          alert("Problema ao adicionar VP.");
        }
      },
      erro => {
        if (erro.status != 200) {
          alert("Servico indisponivel.");
        }
      }
    );

  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.vpQuantity = {} as VirtualCash;
  }
}
