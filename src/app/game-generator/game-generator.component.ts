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

  generateGame(gamePropaty: GameGenerator): void{
    if (gamePropaty.cells ** 2 <= gamePropaty.bomb) {
      alert("爆弾の数が全体のマスの数より小さくなるようにしてください")
    } else {
      this.gameService.generateField(gamePropaty)
    }
  }

  getGamePropaty(): GameGenerator {
    return this.gamePropaty
  }
}
