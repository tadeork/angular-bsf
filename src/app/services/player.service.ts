import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Player } from '../models/Player';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayerService {
  urlJson = 'http://localhost:3000/players';
  roster: Player[] = [];
  subject: Subject<Player[]> = new Subject() ;
  headers: Headers;
  options: RequestOptions;
  MAX = 11;

  constructor(private http: Http) {
    // llena la lista de players a partir de un repositorio
    this.subject = new Subject<Player[]>();
    this.headers = new Headers({'Content-type': 'application/json',
                                'Accept': 'q=0.8;application/json;q=0.9'});
    this.options = new RequestOptions({ headers: this.headers });
  }

  getAllPlayers_(): Observable<Player[]> {
    return this.http.get(this.urlJson).map(res => res.json());
  }

  getAllPlayers(): Observable<Player[]> {
    this.http.get(this.urlJson).subscribe(res => {
      this.subject.next(res.json());
      this.roster = res.json();
    });
    return this.subject.asObservable();
  }

  // los componentes están suscriptos a través de este observable
  getObservables(): Observable<Player[]> {
    this.http.get(this.urlJson).subscribe(res => {
      this.subject.next(res.json());
      this.roster = res.json();
    });
    return this.subject.asObservable();
  }

  addPlayer(player: Player): void {
    this.roster.push(player);
    this.subject.next(this.roster);
    this.http.post(this.urlJson, player).subscribe();
   /*if (this.roster.length <= this.MAX) {
      // el template nos envía un player directamente
      this.roster.push(player);
      this.subject.next(this.roster);
    }*/
  }

  removePlayer(player: Player): void {
    this.roster.splice(player.id, 1);
    this.http.delete(`${this.urlJson}/${player.id}`).subscribe();
    this.subject.next(this.roster);
  }

  updatePlayer(player: Player): void {
    const body = JSON.stringify(player);
   this.http.patch(`${this.urlJson}/${player.id}`, body, this.options).subscribe();
  }

}
