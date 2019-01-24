import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './services/firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ingressos = [];

  constructor(private firestore: FirestoreService) {}

  ngOnInit() {
    // this.firestore.getAll('ingressos').subscribe(ingressos => {
    //   this.ingressos = ingressos;
    //   this.firestore.getById(ingressos[0].evento, 'eventos').subscribe(evento => this.ingressos[0].evento = evento);
    // });
  }

}
