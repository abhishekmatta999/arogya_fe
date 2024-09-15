import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedLoaderComponent } from './animated-loader.component';

describe('AnimatedLoaderComponent', () => {
  let component: AnimatedLoaderComponent;
  let fixture: ComponentFixture<AnimatedLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimatedLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
