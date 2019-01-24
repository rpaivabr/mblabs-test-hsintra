import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { Event } from '../../models/event';
import { User } from '../../models/user';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-listar-eventos',
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.css']
})
export class ListarEventosComponent implements OnInit {

  events: Event[] = [];
  loggedUser: User;

  constructor(private firestore: FirestoreService,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.firestore.getEventsByDate().subscribe(events => this.events = events);
    this.auth.loggedUser$.subscribe(user => {
      if (user) {
        this.firestore.getByEmail(user.email, 'usuarios').subscribe(loggedUser => this.loggedUser = loggedUser);
      }
    });
  }

  createTicket(event) {
    const ticket: Ticket = {
      uid: this.firestore.getUid(),
      evento: event,
      participante: this.loggedUser,
      situacao: 'valido'
    };
    this.firestore.add(ticket, 'ingressos').subscribe(() => this.router.navigate(['eventos']));
  }

}
