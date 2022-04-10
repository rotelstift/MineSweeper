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
  gameCell = Array(this.cells).fill("").map(x => {
    return Array.from(Array(this.cells).fill(""))
  })
  infinity = Number.NaN
  digged = Array().fill("").map(x => {
    return Array.from(Array(2).fill(this.infinity))
  })

  setBomb(): void {
    this.gameField.table[0][0] = "💣"
    this.gameField.table[1][1] = "💣"
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

  checkField(row: number, col: number): void {
    this.gameCell[row][col] = this.gameField.table[row][col]
    this.digged.push([row, col])
    if (this.gameField.table[row][col] === "💣") {
      alert("Game Over.")
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.setBomb()
    this.setCount()
  }

}
