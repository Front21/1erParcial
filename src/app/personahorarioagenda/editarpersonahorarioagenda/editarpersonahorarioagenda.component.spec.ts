import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarpersonahorarioagendaComponent } from './editarpersonahorarioagenda.component';

describe('EditarpersonahorarioagendaComponent', () => {
  let component: EditarpersonahorarioagendaComponent;
  let fixture: ComponentFixture<EditarpersonahorarioagendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarpersonahorarioagendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarpersonahorarioagendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
