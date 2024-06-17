import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})

export class CadastroComponent {

  redirecionarParaLogin() {
    this.router.navigate(['/login']);
  }

  showErrorMessages: any;

  username = new FormControl('',
    [Validators.required]);

  email = new FormControl('',
    [Validators.required]);

  password = new FormControl('',
    [Validators.required]);
  constructor(private router: Router,
    public afAuth: AngularFireAuth,) { }

  cadastrarUsuario() {
    console.log('Login: ' + this.email.value);
    console.log('Senha  ' + this.password.value);

    this.afAuth
      .createUserWithEmailAndPassword(this.email.value!, this.password.value!)
      .then((result) => {
        console.log(result.user);
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.showErrorMessages = true;
        console.log(error);
      });


    //this.router.navigate(['/layout/produto']);
  }

}

