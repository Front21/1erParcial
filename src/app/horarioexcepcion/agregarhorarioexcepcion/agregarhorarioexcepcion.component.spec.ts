import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarhorarioexcepcionComponent } from './agregarhorarioexcepcion.component';

describe('AgregarhorarioexcepcionComponent', () => {
  let component: AgregarhorarioexcepcionComponent;
  let fixture: ComponentFixture<AgregarhorarioexcepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarhorarioexcepcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarhorarioexcepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
