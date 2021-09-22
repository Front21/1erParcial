import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarsubcategoriaComponent } from './editarsubcategoria.component';

describe('EditarsubcategoriaComponent', () => {
  let component: EditarsubcategoriaComponent;
  let fixture: ComponentFixture<EditarsubcategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarsubcategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarsubcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
