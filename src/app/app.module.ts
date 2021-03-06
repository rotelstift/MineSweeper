import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameFieldComponent } from './game-field/game-field.component';
import { GameGeneratorComponent } from './game-generator/game-generator.component';

@NgModule({
  declarations: [
    AppComponent,
    GameFieldComponent,
    GameGeneratorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
