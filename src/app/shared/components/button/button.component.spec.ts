import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranlsateModule } from 'src/pipes/translate/translate.module';
import { SharedModule } from '../../modules/shared.module';

import { ButtonComponent } from './button.component';
import { AngularMaterialModule } from '../../modules/angular-material.module';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ],
      imports:[SharedModule,AngularMaterialModule,TranlsateModule,HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event on click',()=>{
    const emitterSpy = spyOn(component.Click,'emit')
    component.onClick();
    fixture.detectChanges();
    expect(emitterSpy).toHaveBeenCalledWith(true)    
  })
});
