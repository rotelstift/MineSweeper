import { Component, OnInit } from '@angular/core';
import { GameGenerator } from '../gameGenerator';

@Component({
  selector: 'app-game-generator',
  templateUrl: './game-generator.component.html',
  styleUrls: ['./game-generator.component.css']
})
export class GameGeneratorComponent implements OnInit {

  game: GameGenerator ={
    bomb: 2,
    cells: 3
  }

  constructor() { }

  ngOnInit(): void {
  }

}
