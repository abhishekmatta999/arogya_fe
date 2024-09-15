import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from "@angular/common";
import { NgModule } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';;
import { TranlsateModule } from 'src/pipes/translate/translate.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { HomeModule } from './home/home.module';
import { ALARMS, ALERTS, HOME, LAYOUT } from 'src/app/shared/constants/routes-constant';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';

describe('AppRouting module', () => {
    let component: MainComponent;
    let appFixture: ComponentFixture<MainComponent>;
    let objRouter: Router;
    let location: Location;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MainComponent],
            imports: [RouterTestingModule.withRoutes([]),MainRoutingModule,HttpClientTestingModule,AngularMaterialModule,TranlsateModule,SharedModule,BrowserAnimationsModule],
            providers:[NgModule],
        }).compileComponents();
    });

    beforeEach(()=>{
        appFixture = TestBed.createComponent(MainComponent);
        component = appFixture.componentInstance;
        objRouter = TestBed.inject(Router);
        location = TestBed.inject(Location);
        objRouter.initialNavigation();
    })

    it('Lazy loading Home Module test case', fakeAsync(() => {
        const lazyloder = TestBed.inject(NgModule);
        lazyloder.stubbedModules = {lazymodule:HomeModule};
        objRouter.navigateByUrl(`/${HOME}`);
        tick();
        appFixture.detectChanges();
        expect(location.path()).toBe(`/${HOME}`);
     }));


})