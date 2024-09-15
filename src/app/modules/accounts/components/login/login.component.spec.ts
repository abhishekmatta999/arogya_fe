import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ACCOUNT, FORGOT_PASSWORD, HOME, LAYOUT } from 'src/app/shared/constants/routes-constant';
import { TranlsateModule } from 'src/pipes/translate/translate.module';
import { CommonService } from 'src/services/common/common.service';
import { ToastMessagesService } from 'src/services/toaster/toast-messages.service';
import { AccountService } from '../../service/account.service';
import { LoginComponent } from './login.component';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let toasterService:ToastMessagesService;
  let commonService: CommonService;
  let accountService: AccountService;
  let mockRouter:any;

  beforeEach(async () => {
    mockRouter = { navigate: jasmine.createSpy('navigate'),navigateByUrl:jasmine.createSpy('navigateByUrl') };
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers:[ToastMessagesService,CommonService,AccountService, { provide: Router, useValue: mockRouter}],
      imports:[HttpClientTestingModule,TranlsateModule, RouterTestingModule,BrowserAnimationsModule,AngularMaterialModule,ReactiveFormsModule,FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    toasterService = TestBed.inject(ToastMessagesService);
    commonService = TestBed.inject(CommonService);
    accountService = TestBed.inject(AccountService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form validation check',()=>{
    let email:any = component.form.controls['email'];
    let password:any = component.form.controls['password'];
    expect(email.valid).toBeFalsy();
    expect(password.valid).toBeFalsy();
    expect(email.errors['required']).toBeTruthy();
    expect(password.errors['required']).toBeTruthy();
  })

  it('set form value check',()=>{
    let email:any = component.form.controls['email'];
    let password:any = component.form.controls['password'];
    email.setValue('email@gmail.com');
    password.setValue('abc@123')
    expect(email.valid).toBeTruthy();
    expect(password.valid).toBeTruthy();
    expect(email.errors).toBeNull();
    expect(password.errors).toBeNull();
  })

  it('should allow user to login',()=>{
    component.form.controls['email'].setValue('email@gmail.com');
    component.form.controls['password'].setValue('eacc@123');
    const accountServiceSpy = spyOn(accountService, 'login').and.returnValue(of({}));
    const commonServiceSpy = spyOn(commonService,'setUserData');
    const toasetServiceSpy = spyOn(toasterService,'toast');
    component.onSubmit();
    expect(accountServiceSpy).toHaveBeenCalledWith(component.form.value);
    expect(commonServiceSpy).toHaveBeenCalled();
    expect(toasetServiceSpy).toHaveBeenCalledWith('Logged in successfully','success-toast');
    expect(mockRouter.navigate).toHaveBeenCalledWith([`${LAYOUT}/${HOME}`]);   
  });

  it('should not allow user to login',()=>{
    component.form.controls['email'].setValue('email@gmail.com');
    component.form.controls['password'].setValue('ema@123');
    const serivceSpy = spyOn(accountService, 'login').and.returnValue(throwError({
      message:'not allowed'
    }));
    const toastSpy = spyOn(toasterService,'toast');
    component.onSubmit();
    expect(serivceSpy).toHaveBeenCalled()
   })

  it('should check form valid or not',()=>{
    component.form.reset();
    const spy = spyOn(component.form,'markAllAsTouched');
    component.onSubmit()
    expect(spy).toHaveBeenCalled();
    })

  it('should nnavigate to forgot password screen',()=>{
    component.forgotPassword();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(`${ACCOUNT}/${FORGOT_PASSWORD}`);   
  })

});
