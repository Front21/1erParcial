import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarpersonahorarioagendaComponent } from './eliminarpersonahorarioagenda.component';

describe('EliminarpersonahorarioagendaComponent', () => {
  let component: EliminarpersonahorarioagendaComponent;
  let fixture: ComponentFixture<EliminarpersonahorarioagendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarpersonahorarioagendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarpersonahorarioagendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
