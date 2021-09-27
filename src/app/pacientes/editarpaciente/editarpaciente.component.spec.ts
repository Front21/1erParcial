import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarpacienteComponent } from './editarpaciente.component';

describe('EditarpacienteComponent', () => {
  let component: EditarpacienteComponent;
  let fixture: ComponentFixture<EditarpacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarpacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarpacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
