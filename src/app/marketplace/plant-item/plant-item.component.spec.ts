import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantItemComponent } from './plant-item.component';

describe('PlantItemComponent', () => {
  let component: PlantItemComponent;
  let fixture: ComponentFixture<PlantItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlantItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
