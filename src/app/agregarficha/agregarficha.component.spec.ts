import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarfichaComponent } from './agregarficha.component';

describe('AgregarfichaComponent', () => {
  let component: AgregarfichaComponent;
  let fixture: ComponentFixture<AgregarfichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarfichaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarfichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
