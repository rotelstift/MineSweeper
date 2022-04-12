import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { GameField } from '../gameField';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.css']
})
export class GameFieldComponent implements OnInit {
  gameField = this.gameService.getField()

  includes(needle: Array<number>, heystack: Array<Array<number>>): boolean {
    return JSON.stringify(heystack).includes(JSON.stringify(needle))
  }

  checkGoal(digged: Array<Array<number>>): boolean {
    return this.gameService.propaty.cells * this.gameService.propaty.cells - digged.length === this.gameService.propaty.bomb
  }

  checkField(row: number, col: number): void {
    this.gameField.gameCells[row][col] = this.gameField.table[row][col]
    if (!this.includes([row, col], this.gameField.digged)) {
      this.gameField.digged.push([row, col])
    }
    if (this.gameField.table[row][col] === "💣") {
      alert("Game Over.")
      this.gameField.gameCells = this.gameField.table
    } else if (this.checkGoal(this.gameField.digged)) {
      alert("You won!")
      this.gameField.gameCells = this.gameField.table
    }
  }

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
  }

}
