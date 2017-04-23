import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, EscapeHtmlPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
