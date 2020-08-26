import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ItemService } from '../services/item.service';
import { User } from '../models/user';
import { ItemPanel } from '../models/item-panel';
import { Item } from '../models/item';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  //radioButton
  rbStack;
  rbTemporary;

  //checkbox
  cbIsEquipment;
  cbIsAccessory;

  //inputs
  timeItemInput: number;
  amountStackInput: number;
  textAreaItems: string;

  //combobox
  optionsRarity = [];
  optionsStrength = [];

  //entities
  itemFromPanel = {} as ItemPanel;
  user = {} as User;
  item = {} as Item;

  //aux
  arrayItems = {} as string[];

  constructor(private userService: UserService, private itemService: ItemService) { }

  ngOnInit() {

    //TEST

    // this.user.login = "adfafad";


    this.rbStack = "normal";
    this.rbTemporary = "perma";

    this.cbIsEquipment = true;
    this.cbIsAccessory = false;

    this.itemFromPanel = { levelStrength: -1 } as ItemPanel;
    this.item = { gradeID: -1 } as Item;

    this.optionsRarity = [
      { name: "Raridade", value: -1 },
      { name: "Normal", value: 0 },
      { name: "Raro", value: 1 },
      { name: "Épico", value: 2 },
      { name: "Lendário", value: 3 }
    ]

    this.optionsStrength = [
      { name: "Fortificação", value: -1 },
      { name: "Nível 1", value: 1 },
      { name: "Nível 2", value: 2 },
      { name: "Nível 3", value: 3 },
      { name: "Nível 4", value: 4 },
      { name: "Nível 5", value: 5 },
      { name: "Nível 6", value: 6 },
      { name: "Nível 7", value: 7 },
      { name: "Nível 8", value: 8 },
      { name: "Nível 9", value: 9 },
      { name: "Nível 10", value: 10 },
      { name: "Nível 11", value: 11 },
      { name: "Nível 12", value: 12 },
      { name: "Nível 13", value: 13 },
      { name: "Nível 14", value: 14 },
      { name: "Nível 15", value: 15 },
      { name: "Nível 16", value: 16 },
      { name: "Nível 17", value: 17 }
    ]

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

  parseTextArea() {
    this.arrayItems = this.textAreaItems.split("\n");
  }

  toggleIsEquipment(event) {
    if (event.target.checked) {
      this.cbIsEquipment = true;
    } else {
      this.cbIsEquipment = false;
    }
  }

  toggleIsAcessory(event) {
    if (event.target.checked) {
      this.cbIsAccessory = true;
    } else {
      this.cbIsAccessory = false;
    }
  }

  newItemFromPanel(form: NgForm) {
    console.log(this.arrayItems)

    if (this.arrayItems != undefined && this.arrayItems.length > 0) {
      this.arrayItems.forEach(i => {
        console.log("item do array:" + i);
        this.saveItem(form, i);
      })
    } else {
      alert("Erro ao inserir item: Id do item inválido.")
      return;
    }
  }

  saveItem(form, i) {
    this.item.loginUID = this.user.loginUID;
    this.item.itemID = i;
    this.itemFromPanel.item = this.item;

    console.log("eh acessorio:" + this.cbIsAccessory);

    if (this.cbIsAccessory) {
      this.itemFromPanel.isAcessory = true;
    } else {
      this.itemFromPanel.isAcessory = false;
    }

    console.log("eh equipamento:" + this.cbIsEquipment);

    if (this.cbIsEquipment) {
      this.itemFromPanel.isEquipment = true;
    } else {
      this.itemFromPanel.isEquipment = false;
    }

    if (this.rbTemporary == "temporary") {
      this.itemFromPanel.timeItem = this.timeItemInput;
    } else {
      this.itemFromPanel.timeItem = undefined;
    }

    if (this.rbStack == "carga") {
      this.itemFromPanel.amountStack = this.amountStackInput;
    } else {
      //  this.itemFromPanel.levelStrength = -1; //reset value fortify
      this.itemFromPanel.amountStack = undefined; //reset value stack
    }

    if (!this.validateNewItem()) {
      this.ngOnInit();
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

  }

  validateNewItem() {

    if (this.itemFromPanel.item.loginUID == undefined
      || this.itemFromPanel.item.loginUID.toString() == "") {
      alert("Erro ao inserir item: Jogador inválido")
      return false;
    }

    if (this.itemFromPanel.item.itemID == undefined
      || this.itemFromPanel.item.itemID.toString() == ""
      || this.itemFromPanel.item.itemID.toString().length <= 3) {
      alert("Erro ao inserir item: Id do item inválido -> " + this.itemFromPanel.item.itemID)
      return false;
    }

    if (this.itemFromPanel.item.gradeID == undefined
      || (
        this.itemFromPanel.item.gradeID !== undefined
        && (this.itemFromPanel.item.gradeID < 0
          || this.itemFromPanel.item.gradeID > 3)
      )
      ||
      this.itemFromPanel.item.gradeID.toString() == ""
    ) {
      alert("Erro ao inserir item: Raridade inválida para item -> " + this.itemFromPanel.item.itemID);
      return false;
    }

    if (
      (this.itemFromPanel.levelStrength !== undefined
        && this.itemFromPanel.levelStrength != -1
        && (this.itemFromPanel.levelStrength < 0
          || this.itemFromPanel.levelStrength > 17))
    ) {
      alert("Erro ao inserir item: Fortificação inválida para item -> " + this.itemFromPanel.item.itemID);
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
