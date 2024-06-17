import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environment/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { EditarperfilComponent } from './editarperfil/editarperfil.component';
import { CarrinhoComponent } from '../app/marketplace/carrinho/carrinho.component';
import { VenderProdutoComponent } from './vender-produto/vender-produto.component';
import { AddPlantComponent } from './marketplace/add-plant/add-plant.component';
import { PlantItemComponent } from './marketplace/plant-item/plant-item.component';
import { PlantListComponent } from './marketplace/plant-list/plant-list.component';
import { MainPageComponent } from './marketplace/main-page/main-page.component';
import { HeaderComponent } from './marketplace/header/header.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    LandingPageComponent,
    MarketplaceComponent,
    EditarperfilComponent,
    CarrinhoComponent,
    VenderProdutoComponent,
    AddPlantComponent,
    PlantItemComponent,
    PlantListComponent,
    MainPageComponent,
    HeaderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [LoginComponent, PlantItemComponent, PlantListComponent, MainPageComponent, HeaderComponent, VenderProdutoComponent, AddPlantComponent, CarrinhoComponent, EditarperfilComponent, MarketplaceComponent, LandingPageComponent, CadastroComponent, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
