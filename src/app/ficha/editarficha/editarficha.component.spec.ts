import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarfichaComponent } from './editarficha.component';

describe('EditarfichaComponent', () => {
  let component: EditarfichaComponent;
  let fixture: ComponentFixture<EditarfichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarfichaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarfichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
