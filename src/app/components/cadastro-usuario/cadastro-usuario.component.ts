import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  userForm: FormGroup;

  constructor(private location: Location,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private firestore: FirestoreService,
    private auth: AuthService) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      datanasc: new FormControl(''),
      sexo: new FormControl('M'),
    });
  }

  goBack() {
    this.location.back();
  }

  createUser() {
    const dia = +this.userForm.value.datanasc.substr(0, 2);
    const mes = +this.userForm.value.datanasc.substr(2, 2) - 1;
    const ano = +this.userForm.value.datanasc.substr(4, 4);
    const datanasc = new Date(ano, mes, dia);
    this.userForm.value.datanasc = datanasc;
    this.userForm.value.uid = this.firestore.getUid();
    this.userForm.value.perfil = 'user';
    // criar auth para usuario
    this.auth.register(this.userForm.value.email, this.userForm.value.password).subscribe(user => {
      this.userForm.value.authUid = user.user.uid;
      delete this.userForm.value.password;
      // gravar usuario no banco
      this.firestore.add(this.userForm.value, 'usuarios').subscribe(() => this.router.navigate(['eventos']));
    });
  }

}
