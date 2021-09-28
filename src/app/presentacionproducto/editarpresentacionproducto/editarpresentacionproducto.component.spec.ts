import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarpresentacionproductoComponent } from './editarpresentacionproducto.component';

describe('EditarpresentacionproductoComponent', () => {
  let component: EditarpresentacionproductoComponent;
  let fixture: ComponentFixture<EditarpresentacionproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarpresentacionproductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarpresentacionproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
