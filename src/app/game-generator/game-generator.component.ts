import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import { GameGenerator } from '../gameGenerator';

@Component({
  selector: 'app-game-generator',
  templateUrl: './game-generator.component.html',
  styleUrls: ['./game-generator.component.css']
})
export class GameGeneratorComponent implements OnInit {

  @Input() gamePropaty: GameGenerator = {
    bomb: 2,
    cells: 5
  }

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gameService.generateField(this.gamePropaty)
  }

  generateGame(game: GameGenerator): void{
    this.gameService.generateField(game)
  }

  getGame(): GameGenerator {
    return this.gamePropaty
  }
}
