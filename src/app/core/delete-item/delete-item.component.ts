import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {

  constructor(private itemService: ItemService,
    private toasty: ToastyService) { }

  @Input() userFounded: User;
  user = {} as User;
  itemDelete = {} as Item;
  textAreaItemsDelete: string;
  arrayItemsDelete = {} as string[];

  ngOnInit() {
  }

  initUserInfo() {
    this.user = this.userFounded;
  }

  parseTextArea() {
    this.arrayItemsDelete = this.textAreaItemsDelete.split("\n");
  }

  deleteItemsFromPanel(form: NgForm) {
    this.initUserInfo();
    this.itemDelete.loginUID = this.user.loginUID;

    if (this.arrayItemsDelete != undefined && this.arrayItemsDelete.length > 0) {
      this.arrayItemsDelete.forEach(i => {
        this.deleteItems(form, i);
      })
    } else {
      this.toasty.error("Deletar Item: Id do item inválido")
      return;
    }
  }

  deleteItems(form, i) {
    this.itemDelete.itemID = i;

    console.log("valor do id do item antes de deletado: " + i);

    if (i == undefined || i == null) {
      this.toasty.error('ID do Item a ser excluído inválido.');
      return;
    }

    console.log(this.itemDelete);
    this.itemService.deleteItem(this.itemDelete).subscribe(
      resultado => {
        console.log(resultado);
        this.toasty.success('Itens com o ID:' + i
          + ' removidos com sucesso!');
        this.cleanForm(form);
      },

      erro => {
        if (erro.status != 200) {
          console.log(erro);
          this.toasty.warning("Item não encontrado ou não removido");
          this.cleanForm(form);
        }
      }

    );
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.itemDelete = {} as Item;
    this.arrayItemsDelete = [];
  }
}

