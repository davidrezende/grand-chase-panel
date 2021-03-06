import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { Character } from '../../models/character';
import { CharacterService } from '../../services/character.service';
import { NgForm } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
@Component({
  selector: 'app-characteres',
  templateUrl: './characteres.component.html',
  styleUrls: ['./characteres.component.css']
})
export class CharacteresComponent implements OnInit {

  @Input() userFounded: User;

  user = {} as User;
  updateCharacterPlayer = {} as Character;

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
    ["Sieghart", 8],
    ["Mari", 9],
    ["Dio", 10],
    ["Zero", 11],
    ["Rey", 12],
    ["Lupus", 13],
    ["Lin", 14],
    ["Azin", 15],
    ["Holy", 16],
    ["Edel", 17],
    ["Veigas", 18],
    ["Uno", 19]
  ])

  userChars = new Map();

  playerCharacteres = [];

  classes = [];
  playerClasses = [];

  experienceUpdate: number;

  constructor(private charService: CharacterService,
              private toasty: ToastyService) { }

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
        if (resultado != undefined || resultado != null) {
          this.chars = resultado;
          this.chars.forEach(charRes => {
            this.charsList.forEach((value: number, key: string) => {
              if (charRes.charType == value) {
                this.userChars.set((key), (value));
              }
            });
          })
        } else {
          this.toasty.error("Problema ao recuperar personagens");
        }
      },
      erro => {
        if (erro.status != 200) {
          this.toasty.error("Personagens: Servico Indisponivel.");
        }
      }
    );

  }

  updateCharacter() {
    this.initUserInfo();
    this.updateCharacterPlayer.loginUID = this.user.loginUID;
    this.updateCharacterPlayer.exps4 = this.experienceUpdate;

    this.charService.updateCharacterPlayer(this.updateCharacterPlayer).subscribe(
      resultado => {
        console.log(resultado);
        if (resultado != undefined || resultado != null) {
          this.toasty.success("Sucesso ao atualizar personagem");
        } else {
          this.toasty.error("Problema ao atualizar personagem");
        }
      },
      erro => {
        if (erro.status != 200) {
          this.toasty.error("Personagens: Serviço indisponível");
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

}
