import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditardetalleComponent } from './editardetalle.component';

describe('EditardetalleComponent', () => {
  let component: EditardetalleComponent;
  let fixture: ComponentFixture<EditardetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditardetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditardetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
