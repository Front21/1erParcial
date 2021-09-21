import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarreservaComponent } from './agregarreserva.component';

describe('AgregarreservaComponent', () => {
  let component: AgregarreservaComponent;
  let fixture: ComponentFixture<AgregarreservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarreservaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarreservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
