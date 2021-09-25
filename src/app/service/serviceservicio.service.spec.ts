import { TestBed } from '@angular/core/testing';

import { ServiceservicioService } from './serviceservicio.service';

describe('ServiceservicioService', () => {
  let service: ServiceservicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceservicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
