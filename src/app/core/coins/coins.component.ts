import { Component, OnInit, Input } from '@angular/core';
import { VirtualCash } from '../../models/virtual-cash';
import { User } from '../../models/user';
import { CoinService } from '../../services/coin.service';
import { NgForm } from '@angular/forms';
import { ToastyService} from 'ng2-toasty';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent implements OnInit {

  constructor(private coinService: CoinService,
              private toasty: ToastyService) { }

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
      this.toasty.error('Quantidade de VP inválida. \nA quantidade permitida deverá estar compreendida entre 1 ~ 9999');
      return;
    }

    console.log(this.vpQuantity);
    this.coinService.sendVPUser(this.vpQuantity).subscribe(
      resultado => {
        console.log(resultado);
        if (resultado != undefined || resultado != null) {
          this.toasty.success('VP adicionado com sucesso!');
          this.cleanForm(form);
        } else {
          this.toasty.error("Problema ao adicionar VP.");
        }
      },
      erro => {
        if (erro.status != 200) {
          this.toasty.error("VP: Serviço indisponivel.");
        }
      }
    );

  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.vpQuantity = {} as VirtualCash;
  }
}
