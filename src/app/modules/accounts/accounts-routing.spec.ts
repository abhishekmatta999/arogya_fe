import { HttpClientTestingModule } from "@angular/common/http/testing"
import { NgModule } from "@angular/core"
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { Router } from "@angular/router"
import { RouterTestingModule } from "@angular/router/testing"
import { TranlsateModule } from "src/pipes/translate/translate.module"
import { AccountsRoutingModule, routes } from "./accounts-routing.module"
import { AccountsComponent } from "./accounts.component"
import { Location } from "@angular/common";
import { SharedModule } from "src/app/shared/modules/shared.module"
import { ACCOUNT, FORGOT_PASSWORD, LOGIN } from "src/app/shared/constants/routes-constant"
import { LoginComponent } from "./components/login/login.component"
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component"
import { AngularMaterialModule } from "src/app/shared/modules/angular-material.module"


describe('Account Routing',()=>{
    let component: AccountsComponent;
    let appFixture: ComponentFixture<AccountsComponent>;
    let objRouter: Router;
    let location: Location;
    beforeEach(async()=>{
        TestBed.configureTestingModule({
            declarations:[AccountsComponent,LoginComponent,ForgotPasswordComponent],
            imports: [RouterTestingModule.withRoutes(routes),AccountsRoutingModule,SharedModule,HttpClientTestingModule,AngularMaterialModule,TranlsateModule,BrowserAnimationsModule],
            providers:[NgModule],
        })
    })

    beforeEach(()=>{
        appFixture = TestBed.createComponent(AccountsComponent);
        component = appFixture.componentInstance;
        objRouter = TestBed.inject(Router);
        location = TestBed.inject(Location);
        objRouter.initialNavigation();
        appFixture.detectChanges();
    })

    it('navigate to "" redirects you to /account', fakeAsync(() => {
        objRouter.navigate(['']);
        tick();
        expect(location.path()).toBe(`/${LOGIN}`);
    }));
    

    it('navigate to "" redirects you to /forgotPassword', fakeAsync(() => { 
        objRouter.navigateByUrl(`${FORGOT_PASSWORD}`); 
        tick();
        expect(location.path()).toBe(`/${FORGOT_PASSWORD}`); 
    }));


})

