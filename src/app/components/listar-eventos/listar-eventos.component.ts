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
  tickets: Ticket[];

  constructor(private firestore: FirestoreService,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.auth.loggedUser$.subscribe(user => {
      this.firestore.getEventsByDate().subscribe(events => this.events = events);
      if (user) {
        this.firestore.getByEmail(user.email, 'usuarios').subscribe(loggedUser => this.loggedUser = loggedUser);
        this.firestore.getTicketsByEmail(user.email).subscribe(tickets => this.tickets = tickets);
      }
    });
  }

  createTicket(event: Event) {
    if (this.loggedUser) {
      const hasTicket = this.tickets.filter(t => t.evento.uid === event.uid)[0];
      if (!hasTicket) {
        const ticket: Ticket = {
          uid: this.firestore.getUid(),
          evento: event,
          participante: this.loggedUser,
          situacao: 'valido'
        };
        this.firestore.add(ticket, 'ingressos').subscribe(() => this.router.navigate(['ingressos']));
      }
    } else {
      this.router.navigate(['usuarios', 'cadastro']);
    }
  }

}
