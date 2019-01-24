import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { User } from '../../models/user';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-listar-ingressos',
  templateUrl: './listar-ingressos.component.html',
  styleUrls: ['./listar-ingressos.component.css']
})
export class ListarIngressosComponent implements OnInit {

  loggedUser: User;
  tickets: Ticket[] = [];

  constructor(private firestore: FirestoreService,
              private auth: AuthService) { }

  ngOnInit() {
    this.auth.loggedUser$.subscribe(user => {
      if (user) {
        this.loggedUser = user;
        this.firestore.getTicketsByEmail(user.email).subscribe(tickets => this.tickets = tickets);
      }
    });
  }

}
