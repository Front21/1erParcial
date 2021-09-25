import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarhorarioexcepcionComponent } from './eliminarhorarioexcepcion.component';

describe('EliminarhorarioexcepcionComponent', () => {
  let component: EliminarhorarioexcepcionComponent;
  let fixture: ComponentFixture<EliminarhorarioexcepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarhorarioexcepcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarhorarioexcepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
