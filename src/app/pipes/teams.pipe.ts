import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../models/player';

@Pipe({
  name: 'teams'
})
export class TeamsPipe implements PipeTransform {

  transform(roster: any, team: string): any {
    // posiblemente sea un problema de conexión: al renderizarse el dom no hay contenido en
    // la variable roster entonces no puede filtrar sobre ella por lo que envía tal mensaje
    console.log(roster);
    console.log('filtra el roster');
    if (roster) {
      return roster.filter( player => player.team === team);
    }
  }

}
