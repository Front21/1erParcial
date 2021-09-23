import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarpacienteComponent } from './agregarpaciente.component';

describe('AgregarpacienteComponent', () => {
  let component: AgregarpacienteComponent;
  let fixture: ComponentFixture<AgregarpacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarpacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarpacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
