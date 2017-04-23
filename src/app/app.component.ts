import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div id="inner">
  <h1>Ludum Dare 38</h1>
   <h2>A Small World</h2>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}