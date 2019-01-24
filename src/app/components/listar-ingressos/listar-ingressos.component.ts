import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-listar-ingressos',
  templateUrl: './listar-ingressos.component.html',
  styleUrls: ['./listar-ingressos.component.css']
})
export class ListarIngressosComponent implements OnInit {

  user: any;
  tickets = [];

  constructor(private firestore: FirestoreService,
              private auth: AuthService) { }

  ngOnInit() {
    this.auth.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.getByAuthUid(user.uid);
        } else {
          return of(null);
        }
      })
    ).subscribe(user => {
      if (user) {
        this.user = user;
        this.firestore.getTicketByEmail(user.email).subscribe(tickets => this.tickets = tickets);
      }
    });
  }

}
