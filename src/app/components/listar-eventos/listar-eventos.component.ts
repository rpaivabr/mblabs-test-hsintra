import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-listar-eventos',
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.css']
})
export class ListarEventosComponent implements OnInit {

  users = [];
  datanasc;

  constructor(private firestore: FirestoreService) { }

  ngOnInit() {
    this.firestore.getAll('usuarios').subscribe(users => {
      this.users = users;
      this.datanasc = new Date(users[0].datanasc.seconds * 1000);
      console.log(this.datanasc);
    });
  }

}
