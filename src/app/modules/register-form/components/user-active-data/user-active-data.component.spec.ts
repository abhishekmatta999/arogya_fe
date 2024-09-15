import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActiveDataComponent } from './user-active-data.component';

describe('UserActiveDataComponent', () => {
  let component: UserActiveDataComponent;
  let fixture: ComponentFixture<UserActiveDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserActiveDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserActiveDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
