import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'

})

export class LoginComponent {

  userId: any;

  showErrorMessages: any;

  redirecionarParaCadastro() {
    this.router.navigate(['/cadastro']);
  }

  email = new FormControl('',
    [Validators.required]);

  password = new FormControl('',
    [Validators.required]);
  constructor(private router: Router,
    public afAuth: AngularFireAuth,) { }

  realizarLogin() {
    console.log('Login: ' + this.email.value);
    console.log('Senha  ' + this.password.value);

    this.afAuth
      .signInWithEmailAndPassword(this.email.value!, this.password.value!)
      .then((result) => {
        console.log(result.user);
        this.userId = result.user?.uid;
        localStorage.setItem('user', JSON.stringify(result.user?.uid));

        this.router.navigate(['/marketplace']);
      })
      .catch((error) => {
        this.showErrorMessages = true;
        console.log(error);
      });


    //this.router.navigate(['/layout/produto']);
  }

  getUserId(): string {
    return this.userId;
  }


}


