import { TestBed } from '@angular/core/testing';

import { ServicepacientesService } from './servicepacientes.service';

describe('ServicepacientesService', () => {
  let service: ServicepacientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicepacientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
