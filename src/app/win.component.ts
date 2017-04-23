import { Component } from '@angular/core';

import { Parameters } from './parameters';
import { Upgrades } from './upgrades';

//const KPIS: kpi[] = [
//];

@Component({
  selector: 'my-win',
  template: `
    <p>You turned a lonely, small world into a highly populated world. Congratulations.</p>
    <p>YOU WIN!</p>
  `, 
  styles: [`
  body {
    background-color: yellow;
  }`]
})
export class WinComponent  { 
  constructor(){
  }

}
