import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminareservaComponent } from './eliminareserva.component';

describe('EliminareservaComponent', () => {
  let component: EliminareservaComponent;
  let fixture: ComponentFixture<EliminareservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminareservaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminareservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
