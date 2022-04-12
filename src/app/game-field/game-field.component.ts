import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { GameField } from '../gameField';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.css']
})
export class GameFieldComponent implements OnInit {
  cells = this.gameService.propaty.cells
  bomb = this.gameService.propaty.bomb
  gameField = this.gameService.getField()
  gameCell = this.gameField.gameCells
  digged = this.gameField.digged

  includes(needle: Array<number>, heystack: Array<Array<number>>): boolean {
    return JSON.stringify(heystack).includes(JSON.stringify(needle))
  }

  checkGoal(digged: Array<Array<number>>): boolean {
    return this.cells * this.cells - digged.length === this.bomb
  }

  checkField(row: number, col: number): void {
    this.gameCell[row][col] = this.gameField.table[row][col]
    if (!this.includes([row, col], this.digged)) {
      this.digged.push([row, col])
    }
    if (this.gameField.table[row][col] === "💣") {
      alert("Game Over.")
      this.gameCell = this.gameField.table
    } else if (this.checkGoal(this.digged)) {
      alert("You won!")
      this.gameCell = this.gameField.table
    }
  }

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
  }

}
