import { Component, OnInit } from '@angular/core';
import { GameField } from '../gameField';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.css']
})
export class GameFieldComponent implements OnInit {
  cells = 3
  gameField: GameField = {
    table: Array(this.cells).fill("").map(x => {
      return Array.from(Array(this.cells).fill(""))
    })
  }

  setBomb(): void {
    this.gameField.table[0][0] = "💣"
    this.gameField.table[1][1] = "💣"
  }

  constructor() { }

  ngOnInit(): void {
    this.setBomb()
  }

}
