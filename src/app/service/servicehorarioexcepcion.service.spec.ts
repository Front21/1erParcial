import { TestBed } from '@angular/core/testing';

import { ServicehorarioexcepcionService } from './servicehorarioexcepcion.service';

describe('ServicehorarioexcepcionService', () => {
  let service: ServicehorarioexcepcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicehorarioexcepcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
