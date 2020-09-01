import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import { Character } from '../models/character';
import { CharacterService } from '../services/character.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-characteres',
  templateUrl: './characteres.component.html',
  styleUrls: ['./characteres.component.css']
})
export class CharacteresComponent implements OnInit {

  @Input() userFounded: User;

  user = {} as User;
  chars = {} as Character[];
  charsList = new Map([
    ["Elesis", 0],
    ["Lire", 1],
    ["Arme", 2],
    ["Ryan", 3],
    ["Lass", 4],
    ["Ronan", 5],
    ["Amy", 6],
    ["Jin", 7],
    ["Sieghart", 8]
  ])

  userChars = new Map();

  playerCharacteres = [];

  classes = [];
  playerClasses = [];

  experience: number;

  constructor(private charService: CharacterService) { }

  ngOnInit() {

    this.classes = [
      { name: "1ª Classe", value: 0 },
      { name: "2ª Classe", value: 1 },
      { name: "3ª Classe", value: 2 },
      { name: "4ª Classe", value: 3 },
    ]

    this.listAllCharactersByLogin();
  }

  initUserInfo() {
    this.user = this.userFounded;
  }
  listAllCharactersByLogin() {
    this.initUserInfo();
    this.charService.getCharactersPlayer(this.user.loginUID).subscribe(
      resultado => {
        console.log(resultado);
        this.chars = resultado;
        this.chars.forEach(charRes => {
          this.charsList.forEach((value: number, key: string) => {
            if (charRes.charType == value) {
              this.userChars.set((key), (value));
              console.log(this.userChars);
            }
          });
        }
        )
      },
      erro => {
        if (erro.status != 200) {
          console.log("deu ruim");
          // this.cleanForm(form);
        }
      }
    );

  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.user = {} as User;
    this.playerCharacteres = [];
    this.chars = {} as Character[];
  }

  cleanFormSucess(form: NgForm) {
    // this.user = {} as User;
  }

}
