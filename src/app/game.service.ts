import { Injectable } from '@angular/core';
import { GameGeneratorComponent } from './game-generator/game-generator.component';
import { GameField } from './gameField';
import { GameGenerator } from './gameGenerator';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  infinity = Number.NaN
  generatorComponent = new GameGeneratorComponent(this)
  propaty = this.generatorComponent.getGamePropaty()

  field: GameField ={
    table: Array(this.propaty.cells).fill("").map(x => {
      return Array.from(Array(this.propaty.cells).fill(""))
    }),
    gameCells: Array(this.propaty.cells).fill("").map(x => {
      return Array.from(Array(this.propaty.cells).fill(""))
    }),
    digged: Array().fill("").map(x => {
      return Array.from(Array(2).fill(this.infinity))
    })
  }

  constructor() { }

  getField(): GameField {
    return this.field
  }

  generateField(game: GameGenerator): void {
    this.propaty = game
    this.field.table = Array(this.propaty.cells).fill("").map(x => {
      return Array.from(Array(this.propaty.cells).fill(""))
    })
    this.field.gameCells = Array(this.propaty.cells).fill("").map(x => {
      return Array.from(Array(this.propaty.cells).fill(""))
    })
    this.field.digged = Array().fill("").map(x => {
      return Array.from(Array(2).fill(this.infinity))
    })

    this.setBomb()
    this.setCount()
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  setBomb(): void {
    let i = 0
    let row = 0
    let col = 0
    while (i < this.propaty.bomb) {
      row = this.getRandomInt(this.propaty.cells)
      col = this.getRandomInt(this.propaty.cells)
      if (this.field.table[row][col] === "💣") {
        continue
      } else {
        this.field.table[row][col] = "💣"
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
      "row" : row === this.propaty.cells - 1 ? row : row + 1,
      "col" : col === this.propaty.cells - 1 ? col : col + 1
    }

    for (let i = start["row"]; i <= goal["row"]; i++) {
      for (let j = start["col"]; j <= goal["col"]; j++) {
        if (this.field.table[i][j] === "💣") {
          // nothing to do...
        } else if (this.field.table[i][j] > 0) {
          this.field.table[i][j]++
        } else {
          this.field.table[i][j] = 1
        }
      }
    }
  }

  setCount(): void {
    for (let row = 0; row < this.propaty.cells; row++) {
      for (let col = 0; col < this.propaty.cells; col++) {
        if (this.field.table[row][col] === "💣") {
          this.countBomb(row, col)
        }
      }
    }
  }

  getGenerator(): GameGenerator {
    return this.propaty
  }
}
