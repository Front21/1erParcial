import { TestBed } from '@angular/core/testing';

import { ServiceclienteService } from './servicecliente.service';

describe('ServiceclienteService', () => {
  let service: ServiceclienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceclienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
