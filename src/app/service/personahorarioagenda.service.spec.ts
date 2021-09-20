import { TestBed } from '@angular/core/testing';

import { PersonahorarioagendaService } from './personahorarioagenda.service';

describe('PersonahorarioagendaService', () => {
  let service: PersonahorarioagendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonahorarioagendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
