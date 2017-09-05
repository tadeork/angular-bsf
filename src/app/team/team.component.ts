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
  subscription: Subscription[] = [];
  player: Player;
  newP: Boolean;

  constructor(private ps: PlayerService) {
    this.newP = false;
  }

  ngOnInit() {
    // al iniciar el componente obtiene los player desde el servicio
   // this.roster = this.ps.getObservables();
   this.roster = this.ps.getAllPlayers();
    // this.subscription = this.ps.getAllPlayers();
  }

  addPlayer(name: string, place: number): void {
    let nPlayer: Player;
    nPlayer = {
      name: name,
      place: place,
      team: this.team
    };

    this.ps.addPlayer(nPlayer);
  }

  removePlayer(player: Player): void {
    this.ps.removePlayer(player);
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
    this.newP = !this.newP;
    this.takePlayer();
  }

  editPlayer(player: Player): void {
    console.log('editar player');
  }
}
