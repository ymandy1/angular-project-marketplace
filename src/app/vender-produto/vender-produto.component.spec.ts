import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderProdutoComponent } from './vender-produto.component';

describe('VenderProdutoComponent', () => {
  let component: VenderProdutoComponent;
  let fixture: ComponentFixture<VenderProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VenderProdutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VenderProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
