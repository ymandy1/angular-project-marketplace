import { Component } from '@angular/core';
import { EditarperfilService } from './service/editarperfil.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrl: './editarperfil.component.css'
})
export class EditarperfilComponent {

  usuario: any;
  userId: any;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) { }

  ngOnInit(): void {

    this.userId = localStorage.getItem('user');
    // aqui eu removo as aspas do começo e do fim do user id
    this.userId = this.userId?.replace(/^"(.*)"$/, '$1');
    console.log('User ID: ' + this.userId);

    this.afAuth.user.subscribe(user => {
      if (user && user.uid === this.userId) {
        this.db.object(`users/${this.userId}`).valueChanges().subscribe(usuario => {
          this.usuario = usuario;
          console.log('Usuário: ' + this.usuario.username);
        });
      } else {
        console.log('Usuário não autenticado ou ID do usuário incorreto');
      }
    });
  }

  atualizarPerfil(): void {
    if (this.usuario && this.userId) {
      this.db.object(`users/${this.userId}`).update(this.usuario).then(() => {
        console.log('Perfil atualizado com sucesso');
      }).catch(error => {
        console.error('Erro ao atualizar perfil: ', error);
      });
    }
  }

  excluirConta(): void {
    if (this.userId) {
      this.db.object(`users/${this.userId}`).remove().then(() => {
        this.afAuth.currentUser.then(user => {
          user!.delete().then(() => {
            console.log('Conta excluída com sucesso');
            this.router.navigate(['/cadastro']); // Redireciona para a tela de cadastro


          }).catch(error => {
            console.error('Erro ao excluir autenticação do usuário: ', error);
          });
        });
      }).catch(error => {
        console.error('Erro ao excluir conta: ', error);
      });
    }
  }
}
