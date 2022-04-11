import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { GameField } from '../gameField';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.css']
})
export class GameFieldComponent implements OnInit {
  cells = this.gameService.generator.cells
  bomb = this.gameService.generator.bomb
  gameField = this.gameService.getField()
  gameCell = this.gameField.gameCells
  digged = this.gameField.digged

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  setBomb(): void {
    let i = 0
    let row = 0
    let col = 0
    while (i < this.bomb) {
      row = this.getRandomInt(this.cells)
      col = this.getRandomInt(this.cells)
      if (this.gameField.table[row][col] === "💣") {
        continue
      } else {
        this.gameField.table[row][col] = "💣"
        i++
      }
    }
  }

  countBomb(row: number, col: number): void {
    const start = {
      "row" : row === 0 ? row : row - 1,
      "col" : col === 0 ? col : col - 1
    }
    const goal = {
      "row" : row === this.cells - 1 ? row : row + 1,
      "col" : col === this.cells - 1 ? col : col + 1
    }

    for (let i = start["row"]; i <= goal["row"]; i++) {
      for (let j = start["col"]; j <= goal["col"]; j++) {
        if (this.gameField.table[i][j] === "💣") {
          // nothing to do...
        } else if (this.gameField.table[i][j] > 0) {
          this.gameField.table[i][j]++
        } else {
          this.gameField.table[i][j] = 1
        }
      }
    }
  }

  setCount(): void {
    for (let row = 0; row < this.cells; row++) {
      for (let col = 0; col < this.cells; col++) {
        if (this.gameField.table[row][col] === "💣") {
          this.countBomb(row, col)
        }
      }
    }
  }

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
    this.setBomb()
    this.setCount()
  }

}
