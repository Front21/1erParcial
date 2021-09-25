import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarsubcategoriaComponent } from './eliminarsubcategoria.component';

describe('EliminarsubcategoriaComponent', () => {
  let component: EliminarsubcategoriaComponent;
  let fixture: ComponentFixture<EliminarsubcategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarsubcategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarsubcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
