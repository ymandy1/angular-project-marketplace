import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { VenderProdutoComponent } from './vender-produto/vender-produto.component';
import { CarrinhoComponent } from './marketplace/carrinho/carrinho.component';
import { EditarperfilComponent } from './editarperfil/editarperfil.component';
import { MeusProdutosComponent } from './meus-produtos/meus-produtos.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent },
  { path: 'marketplace', component: MarketplaceComponent },
  { path: 'vender-produto', component: VenderProdutoComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'editarperfil', component: EditarperfilComponent },
  { path: 'meusprodutos', component: MeusProdutosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
