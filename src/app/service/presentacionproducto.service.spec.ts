import { TestBed } from '@angular/core/testing';

import { PresentacionproductoService } from './presentacionproducto.service';

describe('PresentacionproductoService', () => {
  let service: PresentacionproductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresentacionproductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
