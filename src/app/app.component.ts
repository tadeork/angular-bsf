import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // son los valores que expone para los componentes que utiliza
  teamA = 'Thundercats';
  teamB = 'Skeletors';
  title = 'app';
}
