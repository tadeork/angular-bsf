import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Player } from '../models/Player';
import { PlayerService } from '../services/player.service';
import { Subscription } from 'rxjs/Subscription';

import * as _ from 'lodash';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit, OnDestroy {
  @Input() teamName: string;
  listPlayers: Player[];
  subscription: Subscription;

  // este componente sólo debe atender a los cambios de las lista de jugadores,
  // por lo que debe únicamente subscribirse al observable
  constructor(private ps: PlayerService) { }

  ngOnInit() {
    this.subscribeList();
  }

  ngOnDestroy() {
  }

  subscribeList(): void {
    // llegan los datos en una estructura, es necesario filtrar y ordernar
    this.subscription = this.ps.getAllPlayers().subscribe( player => {
      const orderedList = _.groupBy( player,  'team');
      this.listPlayers = orderedList[this.teamName].sort((a, b) => a.name > b.name);
    });
  }

}
