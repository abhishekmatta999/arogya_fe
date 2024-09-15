import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppRoutingModule, routes } from './app-routing.module';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Location } from "@angular/common";
import { AccountsModule } from "./modules/accounts/accounts.module";
import { MainModule } from './modules/main/main.module';
import { NotFoundModule } from './modules/not-found/not-found.module';
import { ACCOUNT, HOME, LAYOUT, LOGIN } from './shared/constants/routes-constant';
import { NgModule } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranlsateModule } from 'src/pipes/translate/translate.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from 'src/services/guards/auth-guard/auth-guard.guard';
import { CommonService } from 'src/services/common/common.service';
import { LogInGuard } from 'src/services/guards/log-in/log-in.guard';
import { AngularMaterialModule } from './shared/modules/angular-material.module';

describe('AppRouting module', () => {
    let component: AppComponent;
    let appFixture: ComponentFixture<AppComponent>;
    let objRouter: Router;
    let location: Location;
    let guard: AuthGuard;
    let loginGuard: LogInGuard;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [RouterTestingModule.withRoutes(routes),AppRoutingModule,HttpClientTestingModule,AngularMaterialModule,TranlsateModule,BrowserAnimationsModule],
            providers:[NgModule,AuthGuard,LogInGuard],
        }).compileComponents();
    });

    beforeEach(()=>{
        appFixture = TestBed.createComponent(AppComponent);
        component = appFixture.componentInstance;
        objRouter = TestBed.inject(Router);
        location = TestBed.inject(Location);
        guard = TestBed.inject(AuthGuard);
        loginGuard = TestBed.inject(LogInGuard);
        objRouter.initialNavigation();
    })

    it('Lazy loading main Layout module test case', fakeAsync(() => {
        let lazyloder = TestBed.inject(NgModule);
        lazyloder.stubbedModules = {lazymodule:MainModule};
        spyOn(guard, 'handler').and.returnValue(true);
        expect(guard.canActivate()).toBe(true);
        objRouter.navigate([`${LAYOUT}/${HOME}`]);
        tick();
        appFixture.detectChanges();
        expect(objRouter.url).toBe(`/${LAYOUT}/${HOME}`);
     }));

     it('do not Lazy loading main Layout module test case', fakeAsync(() => {
        let lazyloder = TestBed.inject(NgModule);
        lazyloder.stubbedModules = {lazymodule:MainModule};
        spyOn(guard, 'handler').and.returnValue(objRouter.parseUrl(ACCOUNT));
        objRouter.navigate([`${LAYOUT}/${HOME}`]);
        tick();
        appFixture.detectChanges();
        expect(guard.canActivate()).toEqual(objRouter.parseUrl(ACCOUNT));
     }));

    it('Lazy loading Accounts Module test case', fakeAsync(() => {
        const lazyloder = TestBed.inject(NgModule);
        lazyloder.stubbedModules = {lazymodule:AccountsModule};
        spyOn(guard, 'handler').and.returnValue(true);
        objRouter.navigateByUrl(`/${ACCOUNT}`);
        tick();
        appFixture.detectChanges();
        expect(guard.canActivate()).toBe(true);
        expect(location.path()).toBe(`/${ACCOUNT}/${LOGIN}`);
     }));

     it('Do not Lazy loading Accounts Module test case', fakeAsync(() => {
        const lazyloder = TestBed.inject(NgModule);
        lazyloder.stubbedModules = {lazymodule:AccountsModule};
        spyOn(guard, 'handler').and.returnValue(objRouter.parseUrl(LAYOUT));
        objRouter.navigateByUrl(`/${ACCOUNT}`);
        tick();
        appFixture.detectChanges();
        expect(guard.canActivate()).toEqual(objRouter.parseUrl(LAYOUT));
     }));

    it('Lazy loading page not found test case', fakeAsync(() => {
        const lazyloder = TestBed.inject(NgModule);
        lazyloder.stubbedModules = {lazymodule:NotFoundModule};
        objRouter.navigateByUrl(`**`);
        tick();
        appFixture.detectChanges();
        expect(location.path()).toBe(`/**`);
     }));
})