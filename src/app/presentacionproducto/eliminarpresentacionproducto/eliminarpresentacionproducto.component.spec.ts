import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarpresentacionproductoComponent } from './eliminarpresentacionproducto.component';

describe('EliminarpresentacionproductoComponent', () => {
  let component: EliminarpresentacionproductoComponent;
  let fixture: ComponentFixture<EliminarpresentacionproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarpresentacionproductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarpresentacionproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
