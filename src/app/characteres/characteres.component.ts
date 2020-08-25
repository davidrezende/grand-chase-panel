import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-characteres',
  templateUrl: './characteres.component.html',
  styleUrls: ['./characteres.component.css']
})
export class CharacteresComponent implements OnInit {

  user = {} as User;
  optionsCharacteres = [];
  optionsClasses = [];
  experience: number;

  constructor() { }

  ngOnInit() {
    this.user.loginUID = 123;
    this.user.login = "haruzeraaa";

    this.optionsCharacteres = [
      { name: "Raridade", value: -1 },
      { name: "Normal", value: 0 },
      { name: "Raro", value: 1 },
      { name: "Épico", value: 2 },
      { name: "Lendário", value: 3 }
    ]

    this.optionsClasses = [
      { name: "1ª Classe", value: -1 },
      { name: "2ª Classe", value: 0 },
      { name: "3ª Classe", value: 1 },
      { name: "4ª Classe", value: 2 },
    ]

  }

}
