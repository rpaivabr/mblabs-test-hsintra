import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;
  admin = false;
  tickets = 0;

  constructor(private auth: AuthService,
              private firestore: FirestoreService) { }

  ngOnInit() {
    this.auth.loggedUser$.subscribe(user => {
      if (user) {
        this.user = user;
        this.firestore.getTicketByEmail(user.email).subscribe(tickets => this.tickets = tickets.length);
      }
    });
    this.auth.adminUser$.subscribe(admin => {
      if (admin) {
        this.admin = true;
      }
    });
  }

  logout(ev) {
    ev.preventDefault();
    this.user = undefined;
    this.admin = false;
    this.auth.logout();
  }
}
