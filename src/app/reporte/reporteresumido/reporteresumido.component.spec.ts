import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteresumidoComponent } from './reporteresumido.component';

describe('ReporteresumidoComponent', () => {
  let component: ReporteresumidoComponent;
  let fixture: ComponentFixture<ReporteresumidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteresumidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteresumidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
