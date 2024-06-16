import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})

  export class CadastroComponent {
    constructor(private router: Router) { }
  
    redirecionarParaLogin() {
      this.router.navigate(['/login']);
    }
    
  }
  
