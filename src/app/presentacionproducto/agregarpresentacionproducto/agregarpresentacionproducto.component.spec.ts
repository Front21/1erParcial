import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarpresentacionproductoComponent } from './agregarpresentacionproducto.component';

describe('AgregarpresentacionproductoComponent', () => {
  let component: AgregarpresentacionproductoComponent;
  let fixture: ComponentFixture<AgregarpresentacionproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarpresentacionproductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarpresentacionproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
