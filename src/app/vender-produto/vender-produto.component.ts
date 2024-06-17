import { Component } from '@angular/core';
import { ProdutoModel } from './model/produto.model';
import { ProdutoService } from './service/produto.service';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginComponent } from '../login/login.component';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-vender-produto',
  templateUrl: './vender-produto.component.html',
  styleUrl: './vender-produto.component.css'
})
export class VenderProdutoComponent {

  constructor(private produtoService: ProdutoService,
    private router: ActivatedRoute, public afAuth: AngularFireAuth, public login: LoginComponent, private storage: AngularFireStorage
  ) { }

  showSuccessMessages = false;
  showErrorMessages = false;

  key?: string;
  produto = new ProdutoModel();

  formGroup = new FormGroup({
    nome: new FormControl('',
      [Validators.required]),
    preco: new FormControl('',
      [Validators.required, Validators.min(5.1),
      Validators.
        pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
    imagem: new FormControl('',
      [Validators.required]),
    desc: new FormControl('',
      [Validators.required]),
    categoria: new FormControl('',
      [Validators.required]),
  });

  ngOnInit(): void {

    var idUsuario = localStorage.getItem('user');

    // aqui eu quero remover as aspas do idUsuario:

    idUsuario = idUsuario!.replace(/['"]+/g, '');

    this.router.paramMap.subscribe(paramMap => {
      this.key = paramMap.get('key')?.toString();
      if (this.key) {
        this.produtoService.carregar(this.key).subscribe(produto => {
          this.formGroup.controls.nome.patchValue(produto.nome);
          this.formGroup.controls.imagem.patchValue(produto.imagem);
        });
      }
    })
  }




  salvar(): void {
    if (this.formGroup.invalid) {
      console.log('Formulário inválido');
      this.formGroup.markAllAsTouched();
      this.showErrorMessages = true;
      return;
    }

    var idUsuario = localStorage.getItem('user');

    idUsuario = idUsuario!.replace(/['"]+/g, '');


    this.produto.createdBy = idUsuario;
    this.produto.nome = this.formGroup.controls.nome.value?.toString();
    this.produto.descricao = this.formGroup.controls.desc.value?.toString();
    this.produto.categoria = this.formGroup.controls.categoria?.value?.toString();
    this.produto.preco = parseFloat(this.formGroup.controls.preco?.value ?? '0');
    this.produto.imagem = this.formGroup.controls.imagem?.value?.toString();

    if (this.key) {
      //codigo para alterar o produto
      this.produtoService.alterar(this.key, this.produto).then(result => {
        this.showSuccessMessages = true;
        console.log(result);
      });
    } else {
      //codigo para salvar o produto
      this.produtoService.salvar(this.produto).then(result => {
        this.showSuccessMessages = true;
        console.log(result);
      });
    }

  }

  selectFile(event: any) {
    console.log(event);
    const file = event.target.files[0];
    console.log(file);

    this.produtoService.uploadImagem(file).then(result => {
      console.log(result);
      result.ref.getDownloadURL().then(url => {
        this.formGroup.controls.imagem.patchValue(url);
      })
    });
  }


}
