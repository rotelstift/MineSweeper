import { Injectable } from '@angular/core';
import { GameField } from './gameField';
import { GameGenerator } from './gameGenerator';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  infinity = Number.NaN
  generator: GameGenerator = {
    cells: 3,
    bomb: 2
  }
  field: GameField ={
    table: Array(this.generator.cells).fill("").map(x => {
      return Array.from(Array(this.generator.cells).fill(""))
    }),
    gameCells: Array(this.generator.cells).fill("").map(x => {
      return Array.from(Array(this.generator.cells).fill(""))
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
    this.field.table = Array(game.cells).fill("").map(x => {
      return Array.from(Array(game.cells).fill(""))
    })
    this.field.gameCells = Array(game.cells).fill("").map(x => {
      return Array.from(Array(game.cells).fill(""))
    })
    this.field.digged = Array().fill("").map(x => {
      return Array.from(Array(2).fill(this.infinity))
    })
  }

  getGenerator(): GameGenerator {
    return this.generator
  }
}
