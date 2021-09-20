import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonahorarioagendaComponent } from './personahorarioagenda.component';

describe('PersonahorarioagendaComponent', () => {
  let component: PersonahorarioagendaComponent;
  let fixture: ComponentFixture<PersonahorarioagendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonahorarioagendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonahorarioagendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
