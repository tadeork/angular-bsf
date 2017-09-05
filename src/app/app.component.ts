import { Component, OnInit } from '@angular/core';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // son los valores que expone para los componentes que utiliza
  teamA = 'Thundercats';
  teamB = 'Skeletors';
  title = 'app';

  constructor(private ps: PlayerService) {}

  ngOnInit() {
    this.ps.getAllPlayers();
  }

}
