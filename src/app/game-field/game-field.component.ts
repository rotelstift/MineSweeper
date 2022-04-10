import { Component, OnInit } from '@angular/core';
import { GameField } from '../gameField';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.css']
})
export class GameFieldComponent implements OnInit {
  gameField: GameField = {
    cells: 3,
    boms: 1
  }

  constructor() { }

  ngOnInit(): void {
  }

}
