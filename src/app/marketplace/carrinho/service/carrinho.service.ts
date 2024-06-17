import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarrinhoModel } from '../model/carrinho.model';
import { ProdutoModel } from '../../../vender-produto/model/produto.model';


@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage) { }

  salvar(carrinho: CarrinhoModel, produto: ProdutoModel) {
    return this.db.list('carrinhos').push(produto);
  }

  excluir(key: any) {
    return this.db.object('carrinhos/' + key).remove();
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
