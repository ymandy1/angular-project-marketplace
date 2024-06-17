import { TestBed } from '@angular/core/testing';

import { EditarperfilService } from '../service/editarperfil.service';

describe('EditarperfilService', () => {
  let service: EditarperfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditarperfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
