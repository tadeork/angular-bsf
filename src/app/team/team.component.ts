import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { Player } from '../models/Player';
import { Team } from '../models/Team';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  // recibe el nombre del team desde el padre
  @Input() team: string;
  roster: Observable<Player[]>;
  players: Player[];
  subscription: Subscription[] = [];
  player: Player;
  newP: Boolean;
  formPlayer: Boolean;

  constructor(private ps: PlayerService) {
    this.newP = false;
  }

  ngOnInit() {
    // al iniciar el componente obtiene los player desde el servicio
   this.roster = this.ps.getAllPlayers();
    // this.subscription = this.ps.getAllPlayers();
  }

  removePlayer(player: Player): void {
    this.ps.removePlayer(player);
    this.roster = this.ps.getAllPlayers();
   }

  // como está bindeado al template cuando renderice la vista debería tener acceso
  // al atributo después de esto sino tendrá un error. Además como es una interface
  // es conveniente implementarlo en nuestro componente para evitar problemas.
  takePlayer(): void {
    this.player = {
      name: '',
      place: 0,
      team: this.team
    };
  }

  newPlayer(): void {
    this.formPlayer = !this.formPlayer;
    this.newP = true;
    this.takePlayer();
  }

  editPlayer(player: Player): void {
    if (!this.newP) {
      this.formPlayer = !this.formPlayer;
    }
    this.player = player;
    this.newP = false;
  }

  addPlayer(name: string, place: number): void {
    let nPlayer: Player;
    nPlayer = {
      name: this.player.name,
      place: this.player.place,
      team: this.team
    };

    this.ps.addPlayer(nPlayer);
  }

  savePlayer(): void {
    this.ps.updatePlayer(this.player);
    this.roster.subscribe( plr => {
      this.players = plr;
      this.players.push(this.player);
    });
    this.formPlayer = !this.formPlayer;
  }
}
