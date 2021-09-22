import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarreservaComponent } from './editarreserva.component';

describe('EditarreservaComponent', () => {
  let component: EditarreservaComponent;
  let fixture: ComponentFixture<EditarreservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarreservaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarreservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
