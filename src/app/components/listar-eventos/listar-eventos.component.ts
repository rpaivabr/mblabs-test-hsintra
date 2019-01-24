import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-eventos',
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.css']
})
export class ListarEventosComponent implements OnInit {

  events = [];
  user: any = {};

  constructor(private firestore: FirestoreService,
              private router: Router) { }

  ngOnInit() {
    this.firestore.getEventsByDate().subscribe(events => this.events = events);
    this.firestore.getByEmail('r.paivabr@gmail.com', 'usuarios').subscribe(user => this.user = user);
  }

  createTicket(event) {
    console.log(event);
    const ticket: any = {};
    ticket.uid = this.firestore.getUid();
    ticket.evento = event;
    ticket.participante = this.user;
    ticket.situacao = 'valido';
    this.firestore.add(ticket, 'ingressos').subscribe(() => this.router.navigate(['eventos']));
  }

}
