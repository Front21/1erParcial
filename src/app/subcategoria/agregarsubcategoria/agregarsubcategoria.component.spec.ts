import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarsubcategoriaComponent } from './agregarsubcategoria.component';

describe('AgregarsubcategoriaComponent', () => {
  let component: AgregarsubcategoriaComponent;
  let fixture: ComponentFixture<AgregarsubcategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarsubcategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarsubcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
