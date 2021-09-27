import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarservicioComponent } from './eliminarservicio.component';

describe('EliminarservicioComponent', () => {
  let component: EliminarservicioComponent;
  let fixture: ComponentFixture<EliminarservicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarservicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarservicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
