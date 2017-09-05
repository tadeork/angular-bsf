import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Player } from '../models/Player';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayerService {
  urlJson = 'http://localhost:3000/players';
  roster: Player[] = [];
  // es importante instanciar el tipo de subject
  subject: Subject<Player[]> = new Subject() ;
  MAX = 11;

  constructor(private http: Http) {
    // llena la lista de players a partir de un repositorio
    this.subject = new Subject<Player[]>();
  }

  getAllPlayers(): any {
    // las peticiones http devuelven un observable al que luego debemos sucribirnos
    let resp: any ;
    // resp = this.http.get(this.urlJson).map(response => response.json);
    resp = this.http.get(this.urlJson).subscribe(response => response.json());

    console.log('getAllPlayers');
    this.subject.next(resp);
    console.log(this.subject);
    // return resp;
    return this.subject.asObservable();
  }

  // los componentes están suscriptos a través de este observable
  getObservables(): Observable<Player[]> {
    return this.subject;
  }

  emitirValor(players: Player[]): void {
    // toma el valor que envía por el canal
    console.log('emite valor');
    this.subject.next(players);
  }

  addPlayer(player: Player): void {
   if (this.roster.length < this.MAX) {
      // el template nos envía un player directamente
      this.roster.push(player);
      this.subject.next(this.roster);
    }
  }

  removePlayer(player: Player): void {
    this.roster.splice(player.id, 1);
    this.subject.next(this.roster);
  }

}
