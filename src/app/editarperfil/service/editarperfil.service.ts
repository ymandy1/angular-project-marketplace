import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditarperfilService {

  constructor(private db: AngularFireDatabase) { }

  getPerfil(userId: string): Observable<any> {
    return this.db.object(`usuarios/${userId}`).valueChanges();
  }

  atualizarPerfil(userId: string, usuario: any) {
    return this.db.object(`usuarios/${userId}`).update(usuario);
  }
}
