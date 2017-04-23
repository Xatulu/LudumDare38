import { Component } from '@angular/core';

import { Parameters } from './parameters';
import { Upgrades } from './upgrades';

const PARAMETERS: Parameters[] = [
  { id: 1, name: 'Population', amount: 1, time: 1, count: "<a href='javascript:;'>Clone yourself!</a>" }
];

const UPGRADES: Upgrades[] = [];

//const KPIS: kpi[] = [
//];

@Component({
  selector: 'my-app',
  template: `
  <div id="inner">
  <h1>Ludum Dare 38</h1>
   <h2>A Small World</h2>
   <div><p>You are the Emperor, ruling over a small, lonely world. 
   It does not have much space, and is only inhabited {{inhabitants}}.</p>
   <p>{{housing}}
   {{PeopleOnStreets}}</p>
   <p>{{hungry}}
   {{PeopleHungry}}</p>
   <p>{{Situation}}
   </p></div><br />
      <div class="divTable" style="width: 75%">
      <div class="divTableBody" >
      <div class="divTableRow" *ngFor="let parameter of parameters">
        <div class="divTableCell" style="width: 20%; text-align: right" >&nbsp;</div>
        <div class="divTableCell" style="width: 20%; text-align: right" >&nbsp;{{parameter.name}}:</div>
        <div class="divTableCell" style="width: 20%; text-align: left" >&nbsp;{{parameter.amount}}</div>
        <div class="divTableCell" style="width: 20%; text-align: left" [innerHTML]="parameter.count | keepHtml" (click)='increase(parameter)'>&nbsp;</div> 
        <div class="divTableCell" style="width: 20%; text-align: right" >&nbsp;</div> 
      </div>
      </div>
      </div>
      <br/><br/>
      <div class="divTable" style="width: 75%">
      <div class="divTableBody" >
      <div class="divTableRow" *ngFor="let upgrade of upgrades">
        <div class="divTableCell" style="width: 20%; text-align: right" >&nbsp;</div>
        <div class="divTableCell" style="width: 20%; text-align: right" >&nbsp;{{upgrade.name}}:</div>
        <div class="divTableCell" style="width: 20%; text-align: left" >&nbsp;{{upgrade.purchased}}</div>
        <div class="divTableCell" style="width: 20%; text-align: left" [innerHTML]="upgrade.buytext | keepHtml" (click)='buy(upgrade)'>&nbsp;</div> 
        <div class="divTableCell" style="width: 20%; text-align: right" >&nbsp;</div>
      </div>
      </div>
      </div>
  `, 
  styles: [``]
})
export class AppComponent  { 
  parameters = PARAMETERS;
  upgrades = UPGRADES;
//  kpis = KPIS; 
  buildings: Boolean[] = [false, false, false, false, false];
  disabled: Boolean[] = [false, false, false, false, false];
  timer: any;
  inhabitants = "by you";
  housing = "";
  PeopleOnStreets = "";
  AmountHomeless: number;
  AmountHungry: number;
  Situation: string = "";
  situation = false;
  initial = false;
  killedPeople: number = 0;

  hungry = "";
  PeopleHungry = "";

  increase(parameter : Parameters){    
      switch(parameter.id){
        case 1:
          if(!this.disabled[parameter.id - 1]){
            parameter.count = "Cloning...";
            this.disabled[parameter.id - 1] = true;
            setTimeout(() => {this.updateBuildings(parameter);}, parameter.time*1000);
          }
        break;
        case 2:
          if(!this.disabled[parameter.id - 1]){
            parameter.count = "Building...";
            this.disabled[parameter.id - 1] = true;
            setTimeout(() => {this.updateBuildings(parameter);}, parameter.time*1000);
          }
        break;        
        case 3:
          if(!this.disabled[parameter.id - 1]){
            parameter.count = "Building...";
            this.disabled[parameter.id - 1] = true;
            setTimeout(() => {this.updateBuildings(parameter);}, parameter.time*1000);
          }
        break;
        case 4:
          if(!this.disabled[parameter.id - 1]){
            parameter.count = "Building...";
            this.disabled[parameter.id - 1] = true;
            setTimeout(() => {this.updateBuildings(parameter);}, parameter.time*1000);
          }
        break;
        case 5:
          if(!this.disabled[parameter.id - 1]){
            parameter.count = "Building...";
            this.disabled[parameter.id - 1] = true;
            setTimeout(() => {this.updateBuildings(parameter);}, parameter.time*1000);
          }
        break;
      }
  }

  buy(upgrade: Upgrades){
    if(upgrade.cost > PARAMETERS[upgrade.cost_id].amount){
      //alert("You need " + (upgrade.cost - PARAMETERS[upgrade.cost_id].amount) + " more " + PARAMETERS[upgrade.cost_id].name + ".");
    } else {
      upgrade.purchased += 1;
      PARAMETERS[upgrade.cost_id].amount -= upgrade.cost;
      this.killedPeople = upgrade.cost;
      upgrade.cost = Math.floor(upgrade.cost * Math.pow(1.1, upgrade.purchased));
    }

    this.updateUpgrades();
    this.updateTexts();
    this.updateSituation();
  };

  updateUpgrades(){
    for (let i=0;i<UPGRADES.length;i++){
      switch(i){
        case 0:
        if(UPGRADES[i].cost + 1 > PARAMETERS[UPGRADES[i].cost_id].amount){
          UPGRADES[i].buytext =  "You need " + (UPGRADES[i].cost - PARAMETERS[UPGRADES[i].cost_id].amount + 1) + " more Clones.";
        } else {
          UPGRADES[i].buytext =  "<a href='javascript:;'>Sacrifice "+UPGRADES[i].cost +" villagers to improve your clining facilities!</a>";
        }
        break;
      }
    } 
  }

  updateBuildings(parameter : Parameters){
    if(UPGRADES.length === 1 && parameter.id === 1){
    parameter.amount = parameter.amount + Math.pow(2, UPGRADES[0].purchased);
    } else {
    parameter.amount = parameter.amount + 1;
    }
    this.disabled[parameter.id - 1] = false;
    switch(parameter.id){
        case 1:
          parameter.count = "<a href='javascript:;'>Clone yourself!</a>";
        break;
        case 2:
          parameter.count = "<a href='javascript:;'>Build a house!</a>";
          break;
        case 3:
          parameter.count = "<a href='javascript:;'>Build a farm!</a>";
        break;
        case 4:
          parameter.count = "<a href='javascript:;'>Build factories!</a>";
        break;
        case 5:
          parameter.count = "<a href='javascript:;'>Build a church!</a>";
        break;
    }
    

    this.getMoreThings();
    this.updateUpgrades();
    this.updateTexts();


  }

  getMoreThings(){
      if(PARAMETERS[0].amount >= 5 && !this.buildings[0]){
      PARAMETERS.push({ id: 2, name: "Houses", amount: 0, time: 5, count: "<a href='javascript:;'>Build a house!</a>" });
      this.buildings[0] = true;
    } else if (PARAMETERS[0].amount >= 15 && !this.buildings[1]){
      PARAMETERS.push({ id: 3, name: "Farms", amount: 0, time: 8, count: "<a href='javascript:;'>Build a farm!</a>" });
      this.buildings[1] = true;   
    } else if (PARAMETERS[0].amount >= 25 && !this.buildings[2]){
      PARAMETERS.push({ id: 4, name: "Factories", amount: 0, time: 10, count: "<a href='javascript:;'>Build factories!</a>" });
      this.buildings[2] = true;   
    } else if (PARAMETERS[0].amount >= 50 && PARAMETERS[1].amount >= 15 &&  !this.buildings[3]){
      PARAMETERS.push({ id: 5, name: "Church", amount: 0, time: 20, count: "<a href='javascript:;'>Build a Church!</a>" });
      this.buildings[3] = true;   
    } else if (PARAMETERS[0].amount > 100 && !this.buildings[4]){
      UPGRADES.push({id: 1, name: "Improved Cloning Facilities", purchased: 0, cost: 100, cost_id: 0, buytext: "<a href='javascript:;'>Sacrifice 100 villagers to improve your cloning facilities!</a>"});
      this.buildings[4] = true;
    } else if (PARAMETERS[0].amount > 150 && !this.buildings[5]){
      UPGRADES.push({id: 1, name: "Improved House Construction", purchased: 0, cost: 150, cost_id: 0, buytext: "<a href='javascript:;'>Sacrifice 150 villagers to improve your house construction!</a>"});
      this.buildings[4] = true;
    }
    if(PARAMETERS[0].amount >= 10){
      this.situation = true;
    }
  }
  updateTexts(){
    this.inhabitants = "by " + PARAMETERS[0].amount + " people, including yourself";
    if (this.buildings[0]){
      this.housing = "You currently have " + PARAMETERS[1].amount + " houses in your world, providing shelter for " + PARAMETERS[1].amount * 4 + " inhabitants.";
      this.AmountHomeless = Math.max(0, (PARAMETERS[0].amount - PARAMETERS[1].amount * 4));
      this.PeopleOnStreets = "This leaves " + this.AmountHomeless + " people homeless."
    }
    if (this.buildings[1]){
      this.AmountHungry = Math.max(0, PARAMETERS[0].amount - PARAMETERS[2].amount * 8);
      this.hungry = "Your " + PARAMETERS[2].amount + " farms are providing enough food for " + PARAMETERS[2].amount * 8 + " inhabitants.";
      this.PeopleHungry = "This leaves " + this.AmountHungry + " people starving."
    }
    if (this.situation){
    this.updateSituation();
    }
  }

  updateSituation(){
    let homelessness = this.AmountHomeless / PARAMETERS[0].amount;

    if(homelessness > 0.6){
      PARAMETERS[0].count = "You need to build more houses before you can clone more people.";
      this.disabled[0] = true;
      this.Situation = "You should look into building more houses. People are getting unruly.";
    } else if (homelessness > 0.2){
      PARAMETERS[0].count = "<a href='javascript:;'>Build a house!</a>";
      this.disabled[0] = false;
      this.Situation = "Maybe you should get more houses.";
    } else {
      PARAMETERS[0].count = "<a href='javascript:;'>Build a house!</a>";
      this.disabled[0] = false;
      this.Situation = "Everything is fine.";
    }

  }
}
