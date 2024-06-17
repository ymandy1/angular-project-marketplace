import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ProdutoService } from '../vender-produto/service/produto.service';

@Component({
  selector: 'app-meus-produtos',
  templateUrl: './meus-produtos.component.html',
  styleUrls: ['./meus-produtos.component.css']
})
export class MeusProdutosComponent implements OnInit {

  produtos: any[] = [];
  userId: any;
  produtoId: any;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user');

    this.userId = this.userId?.replace(/^"(.*)"$/, '$1');

    // aqui eu preciso conseguir o id do produto que o usuário colocou a venda, por meio do atributo changedBy do produto, esse changedby é o userId


    console.log('userId:', this.userId);
    this.afAuth.user.subscribe(user => {
      console.log('user:', user);
      console.log('userId:', this.userId);
      if (user && user.uid === this.userId) {
        const query = this.db.list('produto', ref => ref.orderByChild('createdBy').equalTo(this.userId));
        console.log('query:', query);
        query.snapshotChanges().subscribe(items => {
          console.log('items:', items);
          this.produtos = items.map(item => {
            // return [item.key, item.payload.val()];
            const key = item.key;
            const data = item.payload.val();
            // Salvar a chave do produto
            this.produtoId = key;
            return [key, data];
          });


        });
      } else {
        console.log('Usuário não autenticado ou ID do usuário incorreto');
      }
    });






  }
  editarProduto(produtoId: string, novosDados: any): void {
    this.db.object(`produto/${produtoId}`).update(novosDados).then(() => {
      console.log('Produto atualizado com sucesso');
    }).catch(error => {
      console.error('Erro ao atualizar produto: ', error);
    });
  }

  deletarProduto(produtoId: string) {
    this.produtoService.excluir(produtoId).then(() => {
      console.log('Produto deletado com sucesso');
    }).catch(error => {
      console.error('Erro ao deletar produto: ', error);
    });

  }
}