import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ItemService } from '../services/item.service';
import { User } from '../models/user';
import { ItemPanel } from '../models/item-panel';
import { Item } from '../models/item';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.css']
})
export class ItensComponent implements OnInit {
  user = {} as User;
  item = {} as Item;

  raritySelect: number;

  itemFromPanel = {} as ItemPanel;

  optionsRarity = [
    { name: "Normal", value: 0 },
    { name: "Raro", value: 1 },
    { name: "Épico", value: 2 },
    { name: "Lendário", value: 3 }
  ]

  optionsStrength = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 },
    { value: 11 },
    { value: 12 },
    { value: 13 },
    { value: 14 },
    { value: 15 },
    { value: 16 },
    { value: 17 }
  ]


  constructor(private userService: UserService, private itemService: ItemService) { }

  ngOnInit() {
  }


  findUserByLogin(form: NgForm) {
    // this.userService.findUserByLogin(this.user.login).subscribe((user: User) => {
    //   this.user = user;
    // })
    this.userService.findUserByLogin(this.user.login).subscribe(
      resultado => {
        console.log(resultado)
        this.user = resultado;
        // alert('Jogador ' + this.user.login + ' encontrado!')
      },
      erro => {
        if (erro.status != 200) {
          // alert('Erro ao buscar jogador.');
          this.cleanForm(form);
        }
      }
    );
  }

  newItemFromPanel(form: NgForm) {
    this.item.loginUID = this.user.loginUID;
    this.itemFromPanel.item = this.item;

    if(!this.validateNewItem()){
      return;
    }

    console.log("Objeto a ser inserido:", this.itemFromPanel)

    this.itemService.newItemFromPanel(this.itemFromPanel).subscribe(
      resultado => {
        console.log(resultado)
        this.itemFromPanel = resultado;
        alert('Item ' + this.itemFromPanel.item.itemID + ' inserido ao jogador ' + this.user.login + ' com sucesso!')
        this.cleanFormSucess(form);
      },
      erro => {
        if (erro.status != 200) {
          alert('Erro ao inserir item!');
          this.cleanForm(form);
        }
      }
    );


    // this.itemFromPanel.levelStrength =
  }

  //   if (this.user.loginUID !== undefined) {
  //     this.itemService.newItemFromPanel(this.user).subscribe(() => {
  //       this.cleanForm(form);
  //     });
  //   } else {
  //     // this.userService.saveUser(this.user).subscribe(() => {
  //     // this.cleanForm(form);
  //     // });
  //     this.userService.saveUser(this.user).subscribe(
  //       resultado => {
  //         console.log(resultado)
  //         alert('Jogador ' + this.user.login + ' salvo com sucesso')
  //         this.cleanForm(form);
  //       },
  //       erro => {
  //         if(erro.status != 200) {
  //           alert('Erro ao salvar novo jogador.');
  //         }
  //       }
  //     );
  //   }
  // }

  // print() {
  //   this.raritySelect = this.selectedOption;
  //   console.log("My input: ", this.selectedOption);
  // }



  validateNewItem() {

    if (this.itemFromPanel.item.loginUID == undefined
      || this.itemFromPanel.item.loginUID.toString() == "") {
      alert("Erro ao inserir item: Jogador inválido")
      return false;
    }

    if (this.itemFromPanel.item.itemID == undefined
      || this.itemFromPanel.item.itemID.toString() == ""
      || this.itemFromPanel.item.itemID.toString().length <= 3) {
      alert("Erro ao inserir item: Id do item inválido")
      return false;
    }

    if (this.itemFromPanel.item.gradeID == undefined
      || (
        this.itemFromPanel.item.gradeID !== undefined
        && this.itemFromPanel.item.gradeID < 0
        && this.itemFromPanel.item.gradeID > 3
      )
      ||
      this.itemFromPanel.item.gradeID.toString() == ""
    ) {
      alert("Erro ao inserir item: Raridade inválida")
      return false;
    }

    if (
      (this.itemFromPanel.levelStrength !== undefined
        && this.itemFromPanel.levelStrength < 0
        && this.itemFromPanel.levelStrength > 17)
    ) {
      alert("Erro ao inserir item: Fortificação inválida")
      return false;
    }
    return true;

  }
  cleanForm(form: NgForm) {
    form.resetForm();
    this.user = {} as User;
    this.itemFromPanel = {} as ItemPanel;
    this.item = {} as Item;
  }

  cleanFormSucess(form: NgForm) {
    // this.user = {} as User;
    this.itemFromPanel.cards = [];
    this.itemFromPanel.attributes = [];
  }

}
