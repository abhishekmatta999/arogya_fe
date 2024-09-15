import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealTrackingComponent } from './weakly-meal.component';

describe('MealTrackingComponent', () => {
  let component: MealTrackingComponent;
  let fixture: ComponentFixture<MealTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealTrackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
