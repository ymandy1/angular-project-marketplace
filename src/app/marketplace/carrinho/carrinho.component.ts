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
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {

  constructor(private router2: Router, private db: AngularFireDatabase, private carrinhoService: CarrinhoService, private router: ActivatedRoute, public afAuth: AngularFireAuth, public login: LoginComponent, private storage: AngularFireStorage) { }

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
        this.criarCarrinho(this.userId, new ProdutoModel());
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

  criarCarrinho(userId: string, produto: ProdutoModel) {
    this.db.object(`carrinhos/${userId}`).set({
      userId: userId,
      produtos: [produto.nome = ""] // Aqui estamos adicionando um objeto do tipo ProdutoModel ao array de produtos
    });
  }

  adicionarAoCarrinho(plant: any) {
    this.carrinhoService.adicionarProduto(this.userId, plant);
  }

  removerDoCarrinho(plant: any) {
    this.carrinhoService.removerProduto(this.userId, plant);
    Swal.fire({
      title: 'Produto removido',
      text: 'Seu produto foi removido do carrinho com sucesso.',
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router2.navigate(['/marketplace']); // redireciona para a tela principal
      }
    });
  }

  comprar(data: any) {

    this.removerDoCarrinho(data);

    Swal.fire({
      title: 'Compra realizada!',
      text: 'Seu pedido foi realizado com sucesso.',
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router2.navigate(['/marketplace']); // redireciona para a tela principal
      }
    });

  }


  listarItensCarrinho(userId: string) {
    this.db.object(`carrinhos/${userId}`).valueChanges().subscribe((cart: any) => {
      this.produtos = cart;
      console.log('teste', cart);
    }
    );
  }

  getValues(obj: object) {
    console.log('getValues', Object.values(obj));
    return Object.values(obj);
  }




}
