import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarrinhoModel } from '../model/carrinho.model';
import { ProdutoModel } from '../../../vender-produto/model/produto.model';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage) { }

  salvar(carrinho: CarrinhoModel, produto: ProdutoModel) {
    return this.db.list('carrinhos').push(produto);
  }

  adicionarProduto(userId: string, produto: ProdutoModel) {
    const ref = this.db.object<CarrinhoModel>(`carrinhos/${userId}`);
    ref.valueChanges().pipe(take(1)).subscribe(carrinho => {
      if (carrinho) {

        if (!Array.isArray(carrinho.produtos)) {
          carrinho.produtos = [];

        } else {
          // carrinho.produtos.push(produto);
        }
        carrinho.produtos.push(produto);
        ref.update(carrinho);

      } else {

        ref.set({
          produtos: [produto],
          quantidade: 1
        });
      }
    });
  }

  removerProduto(userId: string, produto: ProdutoModel) {
    const ref = this.db.object<CarrinhoModel>(`carrinhos/${userId}`);
    ref.valueChanges().pipe(take(1)).subscribe(carrinho => {
      if (carrinho && Array.isArray(carrinho.produtos)) {
        const index = carrinho.produtos.findIndex(p => p.nome === produto.nome);
        if (index > -1) {
          carrinho.produtos.splice(index, 1);
          ref.update(carrinho);
        }
      }
    });
  }
  carregar(key: any): Observable<any> {
    return this.db.object('carrinhos/' + key).valueChanges();
  }

  alterar(key: any, carrinho: CarrinhoModel) {
    return this.db.object('carrinhos/' + key).update(carrinho);
  }

  listar() {
    return this.db.list('carrinhos').snapshotChanges()
      .pipe(
        map(changes => {
          console.log(changes);
          return changes.map(c => ({
            key: c.key,
            ...c.payload.val() as CarrinhoModel
          }));
        })
      );
  }



  // uploadImagem(file: any) {
  //   const path = 'imagens/' + file.name;
  //   const ref = this.storage.ref(path);
  //   return ref.put(file);
  // }
}
