import { Component } from '@angular/core';
import { PlantListComponent } from '../plant-list/plant-list.component';
import { ProdutoService } from '../../vender-produto/service/produto.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  constructor(private produtoService: ProdutoService) { }

  plants: any[] = [];

  ngOnInit(): void {

    this.produtoService.listar().subscribe(plantsReturn => {
      console.log(plantsReturn);
      this.plants = plantsReturn;
    })

  }


}
