import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import { AppComponent }  from './app.component';
import { GameComponent } from './game.component';
import { LoseComponent } from './lose.component';
import { WinComponent } from './win.component';

@NgModule({
  imports:      [ BrowserModule, 
  RouterModule.forRoot([
  {
    path: '',
    component: GameComponent
  }
  ]),
  RouterModule.forRoot([
  {
    path: 'lose',
    component: LoseComponent
  }
  ]),
  RouterModule.forRoot([
  {
    path: 'win',
    component: WinComponent
  }
  ])],
  declarations: [ AppComponent, EscapeHtmlPipe, GameComponent, LoseComponent, WinComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
