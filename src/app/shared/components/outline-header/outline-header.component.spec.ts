import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutlineHeaderComponent } from './outline-header.component';

describe('OutlineHeaderComponent', () => {
  let component: OutlineHeaderComponent;
  let fixture: ComponentFixture<OutlineHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutlineHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutlineHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
