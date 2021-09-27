import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarpacienteComponent } from './eliminarpaciente.component';

describe('EliminarpacienteComponent', () => {
  let component: EliminarpacienteComponent;
  let fixture: ComponentFixture<EliminarpacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarpacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarpacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
