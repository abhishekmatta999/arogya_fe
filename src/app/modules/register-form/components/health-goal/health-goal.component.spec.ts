import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthGoalComponent } from './health-goal.component';

describe('HealthGoalComponent', () => {
  let component: HealthGoalComponent;
  let fixture: ComponentFixture<HealthGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthGoalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
