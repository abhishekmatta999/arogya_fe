import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementTargetComponent } from './measurement-target.component';

describe('MeasurementTargetComponent', () => {
  let component: MeasurementTargetComponent;
  let fixture: ComponentFixture<MeasurementTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasurementTargetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasurementTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
