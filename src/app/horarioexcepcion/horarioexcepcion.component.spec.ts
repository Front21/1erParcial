import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioexcepcionComponent } from './horarioexcepcion.component';

describe('HorarioexcepcionComponent', () => {
  let component: HorarioexcepcionComponent;
  let fixture: ComponentFixture<HorarioexcepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioexcepcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioexcepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
