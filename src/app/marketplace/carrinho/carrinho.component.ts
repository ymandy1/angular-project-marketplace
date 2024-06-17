import { Component } from '@angular/core';
import { CarrinhoModel } from './model/carrinho.model';
import { CarrinhoService } from './service/carrinho.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginComponent } from '../../login/login.component';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProdutoModel } from '../../vender-produto/model/produto.model';


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
  userId: any;
  produtos = {};

  // aqui eu preciso tirar as aspas do começo e do final do userId


  ngOnInit(): void {
    this.userId = localStorage.getItem('user');

    this.listarItensCarrinho(this.userId);

    this.checkCartExists(this.userId).subscribe(exists => {
      if (!exists) {
        console.log("criar")
        this.criarCarrinho(this.userId);
      } else {
        console.log("não criar")
      }
    });
  }

  checkCartExists(userId: string): Observable<boolean> {
    return this.db.object(`carrinhos/${userId}`).valueChanges().pipe(
      map(cart => cart ? true : false)
    );
  }

  criarCarrinho(userId: string) {
    this.db.object(`carrinhos/${userId}`).set({
      userId: userId,
      produtos: []
    });
  }

  adicionarAoCarrinho(plant: any) {
    this.carrinhoService.alterar(this.userId, plant);
  }

  listarItensCarrinho(userId: string) {
    this.db.object(`carrinhos/${userId}`).valueChanges().subscribe((cart: any) => {
      this.produtos = cart;
    }
    );
  }

  getValues(obj: object) {

    console.log(Object.values(obj));
    return Object.values(obj);
  }




}
