import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarfichaComponent } from './eliminarficha.component';

describe('EliminarfichaComponent', () => {
  let component: EliminarfichaComponent;
  let fixture: ComponentFixture<EliminarfichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarfichaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarfichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
