import { Component, OnInit } from '@angular/core';
import { PlantService } from '../service/plant.service';
import { ProdutoService } from '../../vender-produto/service/produto.service';
import { ProdutoModel } from '../../vender-produto/model/produto.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {
  plants: any[] = [];
  showAddPlant = false;

  constructor(private plantService: PlantService, private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.plants = this.plantService.getPlants();
    // this.plants = this.produtoService.listar();
    // this.produtoService.listar().subscribe(plantsReturn => {
    //   console.log(plantsReturn);
    //   this.plants = plantsReturn;
    // })
  }

  showAddPlantForm() {
    this.showAddPlant = !this.showAddPlant;
  }

  // getPlants(): any {
  //   return this.plants;
  // }
}
