import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PlayerService } from './services/player.service';
import { TeamComponent } from './team/team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { PlayerComponent } from './player/player.component';
import { TeamsPipe } from './pipes/teams.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    TeamListComponent,
    PlayerComponent,
    TeamsPipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
