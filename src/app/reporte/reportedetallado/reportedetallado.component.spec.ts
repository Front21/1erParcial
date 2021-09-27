import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedetalladoComponent } from './reportedetallado.component';

describe('ReportedetalladoComponent', () => {
  let component: ReportedetalladoComponent;
  let fixture: ComponentFixture<ReportedetalladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportedetalladoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportedetalladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
