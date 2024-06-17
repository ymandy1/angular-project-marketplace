import { Component } from '@angular/core';
import { CarrinhoModel } from './model/carrinho.model';
import { CarrinhoService } from './service/carrinho.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginComponent } from '../../login/login.component';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {



  constructor(private db: AngularFireDatabase, private carrinhoService: CarrinhoService, private router: ActivatedRoute, public afAuth: AngularFireAuth, public login: LoginComponent, private storage: AngularFireStorage) { }

  showSuccessMessages = false;
  showErrorMessages = false;

  key?: string;
  carrinho = new CarrinhoModel();
  userId = localStorage.getItem('user');

  ngOnInit(): void {
    if (this.verificarCarrinho(this.userId!)) {
      // this.atualizarCarrinho(this.userId!, this.key!);
      console.log('Carrinho existe');
    }
    else {
      this.criarCarrinho(localStorage.getItem('user')!);
      console.log('Carrinho criado');
    }
  }

  verificarCarrinho(userId: string): Boolean {
    // preciso tirar as aspas do começo e do fim do userId
    userId = userId.replace(/['"]+/g, '');
    console.log('userId: ', userId);
    let carrinhoExists = false;
    this.db.object(`carrinhos/${userId}`).valueChanges().subscribe(carrinho => {
      if (carrinho) {
        carrinhoExists = true;
      }
    });
    return carrinhoExists;
  }

  criarCarrinho(userId: string) {
    this.db.object(`carrinhos/${userId}`).set({
      userId: userId,
      produtos: []
    });
  }

  // atualizarCarrinho(userId: string, produtoId: string) {
  //   this.db.object(`carrinhos/${userId}`).valueChanges().subscribe(carrinho => {
  //     let produtos = carrinho?.produtos;
  //     produtos?.push(produtoId);
  //     this.db.object(`carrinhos/${userId}`).update({
  //       produtos: produtos
  //     });
  //   });
  // }



}
