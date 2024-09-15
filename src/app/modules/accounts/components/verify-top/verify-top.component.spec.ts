import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyTopComponent } from './verify-top.component';

describe('VerifyTopComponent', () => {
  let component: VerifyTopComponent;
  let fixture: ComponentFixture<VerifyTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyTopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
