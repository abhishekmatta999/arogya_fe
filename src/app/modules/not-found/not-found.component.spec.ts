import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HOME, LAYOUT } from 'src/app/shared/constants/routes-constant';
import { TranlsateModule } from 'src/pipes/translate/translate.module';

import { NotFoundComponent } from './not-found.component';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let router: Router;
  let mockRouter:any;
  beforeEach(async(() => {
    mockRouter = { navigate: jasmine.createSpy('navigate'),navigateByUrl:jasmine.createSpy('navigateByUrl') };
    TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ],
      providers:[{ provide: Router, useValue: mockRouter}],
      imports:[HttpClientTestingModule,AngularMaterialModule,TranlsateModule,
        RouterTestingModule,BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home',()=>{
    component.routeToHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith([`${LAYOUT}/${HOME}`]);   
  })
});
