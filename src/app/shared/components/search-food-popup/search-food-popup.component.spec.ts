import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFoodPopupComponent } from './search-food-popup.component';

describe('SearchFoodPopupComponent', () => {
  let component: SearchFoodPopupComponent;
  let fixture: ComponentFixture<SearchFoodPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFoodPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFoodPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
