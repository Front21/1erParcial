import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentacionproductoComponent } from './presentacionproducto.component';

describe('PresentacionproductoComponent', () => {
  let component: PresentacionproductoComponent;
  let fixture: ComponentFixture<PresentacionproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentacionproductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentacionproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
