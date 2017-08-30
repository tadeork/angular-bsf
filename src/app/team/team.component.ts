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
  // recibe el nombre del team desde el padre
  @Input() team: string;
  roster: Player[];
  subscription: Subscription[] = [];
  player: Player;
  newP: Boolean;
  MAX = 11;

  constructor(private ps: PlayerService) {
    // this.teamName = 'team A';
    this.newP = false;
   }

  ngOnInit() {
    // al iniciar el componente obtiene los player desde el servicio
    const subscription = this.ps.getAllPlayers().subscribe( players => {
      this.roster = players;
    });
  }

  // debemos desuscribirnos de los objetos observados
  ngOnDestroy(): void {
    this.subscription.forEach(sub => { sub.unsubscribe(); });
  }

  removePlayer(player: Player): void {
    this.roster.splice(player.id, 1);
    this.ps.emitirValor(this.roster);
  }

  addPlayer(player: Player): void {
    if (this.MAX <= 11) {
      this.player = {
        name: player.name,
        place: player.place,
        team: this.team
      };
      // el template nos envía un player directamente
      console.log(this.team);
      player.team = this.team;
      this.roster.push(player);
      this.ps.emitirValor(this.roster);
    }
  }

  newPlayer(): void {
    this.newP = !this.newP;
  }

  editPlayer(player: Player): void {
    console.log('editar player');
  }
}
