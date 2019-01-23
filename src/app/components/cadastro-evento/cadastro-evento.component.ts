import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cadastro-evento',
  templateUrl: './cadastro-evento.component.html',
  styleUrls: ['./cadastro-evento.component.css']
})
export class CadastroEventoComponent implements OnInit {

  eventForm: FormGroup;

  constructor(private location: Location,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private firestore: FirestoreService,
    private auth: AuthService) { }

  ngOnInit() {
    this.eventForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      data: new FormControl('', Validators.required),
      local: new FormControl('', Validators.required),
      seats: new FormControl(0, Validators.required),
    });
  }

  goBack() {
    this.location.back();
  }

  createEvent() {
    console.log(this.eventForm.value);
    const dia = +this.eventForm.value.data.substr(0, 2);
    const mes = +this.eventForm.value.data.substr(2, 2) - 1;
    const ano = +this.eventForm.value.data.substr(4, 4);
    const horas = +this.eventForm.value.data.substr(8, 2);
    const minutos = +this.eventForm.value.data.substr(10, 2);
    const data = new Date(ano, mes, dia, horas, minutos);
    this.eventForm.value.data = data;
    this.eventForm.value.owner = 'r.paivabr@gmail.com'; // email logado
    this.eventForm.value.uid = this.firestore.getUid();
    // gravar usuario no banco
    this.firestore.add(this.eventForm.value, 'eventos').subscribe(() => this.router.navigate(['eventos']));
  }

}
