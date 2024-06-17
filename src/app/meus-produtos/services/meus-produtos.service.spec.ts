import { TestBed } from '@angular/core/testing';

import { MeusProdutosService } from './meus-produtos.service';

describe('MeusProdutosService', () => {
  let service: MeusProdutosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeusProdutosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
