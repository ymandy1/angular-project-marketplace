import { Component } from '@angular/core';
import { PlantService } from '../service/plant.service';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.css']
})
export class AddPlantComponent {
  plant = { name: '', description: '', price: 0 };

  constructor(private plantService: PlantService) {}

  addPlant() {
    this.plantService.addPlant(this.plant);
    this.plant = { name: '', description: '', price: 0 }; 
  }
}
