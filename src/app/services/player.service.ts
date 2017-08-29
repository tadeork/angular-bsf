import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Player } from '../models/Player';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayerService {
  urlJson = 'http://localhost:3000/players';
  players: Player[] = [];
  subject: Subject<Player[]>;

  constructor(private http: Http) {
    // lla la lista de players a partir de un repositorio
  }

  getAllPlayers(): Observable<Player[]> {
    // las peticiones http devuelven un observable al que luego debemos sucribirnos
    console.log('busca los jugadores');
    const response = this.http.get(this.urlJson).map( res => res.json() );
    console.log('Respuesta');
    console.log(response);
    return response;
  }

  // los componentes están suscriptos a través de este observable
  getObservables(): Subject<Player[]> {
    return this.subject;
  }

  emitirValor(players: Player[]): void {
    // toma el valor que envía por el canal
    console.log(players);
    this.subject.next(this.players);
  }

}
