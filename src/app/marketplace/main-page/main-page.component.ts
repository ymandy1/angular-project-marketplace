import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../vender-produto/service/produto.service';
import { CarrinhoService } from '../../marketplace/carrinho/service/carrinho.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  plants: any[] = [];
  userId: any;

  constructor(private produtoService: ProdutoService, private carrinhoService: CarrinhoService, private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user');
    this.produtoService.listar().subscribe(plantsReturn => {
      console.log(plantsReturn);
      this.plants = plantsReturn;
    });
  }

  adicionarAoCarrinho(plant: any) {
    this.carrinhoService.adicionarProduto(this.userId, plant);
    Swal.fire({
      icon: 'success',
      title: 'Produto Adicionado!',
      text: `${plant.nome} foi adicionado ao carrinho.`,
      showConfirmButton: false,
      timer: 1500
    });
  }

}
