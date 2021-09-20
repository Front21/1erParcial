import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarpersonahorarioagendaComponent } from './agregarpersonahorarioagenda.component';

describe('AgregarpersonahorarioagendaComponent', () => {
  let component: AgregarpersonahorarioagendaComponent;
  let fixture: ComponentFixture<AgregarpersonahorarioagendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarpersonahorarioagendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarpersonahorarioagendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
