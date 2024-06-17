import { Component, OnInit } from '@angular/core';
import { PlantService } from '../service/plant.service';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {
  plants: any[] = [];
  showAddPlant = false;

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    this.plants = this.plantService.getPlants();
  }

  showAddPlantForm() {
    this.showAddPlant = !this.showAddPlant;
  }
}
