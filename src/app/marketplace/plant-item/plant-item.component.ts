import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plant-item',
  templateUrl: './plant-item.component.html',
  styleUrls: ['./plant-item.component.css']
})
export class PlantItemComponent {
  @Input() plant: any;
}
