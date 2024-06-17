import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private plants = [
    { name: 'Cactus', description: 'Uma planta resistente', price: 10 },
    { name: 'Rosa', description: 'Uma bela flor', price: 15 }
  ];

  getPlants() {
    return this.plants;
  }

  addPlant(plant: any) {
    this.plants.push(plant);
  }
}
