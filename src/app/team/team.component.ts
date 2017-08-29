import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { Player } from '../models/Player';
import { Team } from '../models/Team';

import { Subscription } from 'rxjs/Subscription';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, OnDestroy {
  // recibe el nombre del team
  @Input() team: string;
  roster: Player[];
  subscription: Subscription[] = [];
  player: Player;
  newP: Boolean;

  constructor(private ps: PlayerService) {
    // this.teamName = 'team A';
    this.newP = false;
   }

  ngOnInit() {
    console.log('inicia el componente');
    // al iniciar el componente obtiene los player desde el servicio
    const subscription = this.ps.getAllPlayers().subscribe( players => {
      this.roster = players;
      console.log(players);
    });
  }

  // debemos desuscribirnos de los objetos observados
  ngOnDestroy(): void {
    this.subscription.forEach(sub => { sub.unsubscribe(); });
  }

  removePlayer(player: Player): void {
    this.roster.splice(player.id, 1);
    console.log(this.roster);
    this.ps.emitirValor(this.roster);
  }

  addPlayer(player: Player): void {
    this.roster.push(player);
    this.ps.emitirValor(this.roster);
  }

  newPlayer(): void {
    this.newP = !this.newP;
  }

}
