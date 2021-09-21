import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarhorarioexcepcionComponent } from './editarhorarioexcepcion.component';

describe('EditarhorarioexcepcionComponent', () => {
  let component: EditarhorarioexcepcionComponent;
  let fixture: ComponentFixture<EditarhorarioexcepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarhorarioexcepcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarhorarioexcepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
