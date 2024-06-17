import { Injectable } from '@angular/core';
import { ProdutoModel } from '../model/produto.model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage) { }

  salvar(produto: ProdutoModel) {
    return this.db.list('produto').push(produto);
  }

  excluir(key: any) {
    return this.db.object('produto/' + key).remove();
  }

  carregar(key: any): Observable<any> {
    return this.db.object('produto/' + key).valueChanges();
  }

  alterar(key: any, produto: ProdutoModel) {
    return this.db.object('produto/' + key).update(produto);
  }

  listar() {
    return this.db.list('produto').snapshotChanges()
      .pipe(
        map(changes => {
          console.log(changes);
          return changes.map(c => ({
            key: c.key,
            ...c.payload.val() as ProdutoModel
          }));
        })
      );
  }

  uploadImagem(file: any) {
    const path = 'imagens/' + file.name;
    const ref = this.storage.ref(path);
    return ref.put(file);
  }
}
