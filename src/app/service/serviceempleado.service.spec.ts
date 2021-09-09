import { TestBed } from '@angular/core/testing';

import { ServiceempleadoService } from './serviceempleado.service';

describe('ServiceempleadoService', () => {
  let service: ServiceempleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceempleadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
