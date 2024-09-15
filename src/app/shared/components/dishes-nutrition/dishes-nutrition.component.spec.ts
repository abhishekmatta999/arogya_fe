import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesNutritionComponent } from './dishes-nutrition.component';

describe('DishesNutritionComponent', () => {
  let component: DishesNutritionComponent;
  let fixture: ComponentFixture<DishesNutritionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishesNutritionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishesNutritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
