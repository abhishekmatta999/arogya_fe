import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastMessagesService } from 'src/services/toaster/toast-messages.service';
import { AccountService } from '../../service/account.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { TranlsateModule } from 'src/pipes/translate/translate.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SEND_PASSWORD_BUTTON_CONFIG } from 'src/app/shared/constants/button-config-constant';
import { of, throwError } from 'rxjs';
import { ACCOUNT, LOGIN } from 'src/app/shared/constants/routes-constant';
import { Router } from '@angular/router';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let accountService:AccountService;
  let toastMessageService: ToastMessagesService;
  let mockRouter:any;
  // let router: Router;

  beforeEach(async () => {
    mockRouter = { navigate: jasmine.createSpy('navigate'),navigateByUrl:jasmine.createSpy('navigateByUrl') };
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      providers:[AccountService,ToastMessagesService,  { provide: Router, useValue: mockRouter}],
      imports:[HttpClientTestingModule,TranlsateModule,
     RouterTestingModule,BrowserAnimationsModule]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    accountService = TestBed.inject(AccountService);
    toastMessageService = TestBed.inject(ToastMessagesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have send password config',()=>{
    expect(component.sendPasswordButtonConfig).toBe(SEND_PASSWORD_BUTTON_CONFIG);
  })

  // it('email validation check',()=>{
  //   let email:any = component.forgotForm.form.controls['email'];
  //   expect(email.valid).toBeFalsy();
  //   expect(email.errors['required']).toBeTruthy();
  // })

  // it('set email check',()=>{
  //   let email:any = component.forgotForm.form.controls['email'];
  //   email.setValue('email@gmail.com');
  //   expect(email.valid).toBeTruthy();
  //   expect(email.errors).toBeNull();
  // })

  // it('should allow user to reset password',()=>{
  //   component.forgotForm.form.controls['email'].setValue('email@gmail.com');
  //   const accoutnSpy = spyOn(accountService, 'forgotPassword').and.returnValue(of({}));
  //   component.submit(component.forgotForm.form.value);
  //   expect(accoutnSpy).toHaveBeenCalledWith(component.forgotForm.form.value)
  //   expect(component.linkSent).toBeTruthy();
  // });

  // it('should not allow user to reset password',()=>{
  //   component.forgotForm.form.controls['email'].setValue('email@gmail.com');
  //   const accountSpy = spyOn(accountService, 'forgotPassword').and.returnValue(throwError({
  //     message:'not allowed'
  //   }));
  //   component.submit(component.forgotForm.form.value);
  //   expect(accountSpy).toHaveBeenCalledWith(component.forgotForm.form.value);
  //   expect(component.linkSent).toBeFalsy();
  // })

  // it('should check form valid or not',()=>{
  //   component.forgotForm.form.reset();
  //   const spy = spyOn(component.forgotForm.form,'markAllAsTouched');
  //   component.submit(component.forgotForm.form.value)
  //   expect(spy).toHaveBeenCalled();
  // })
  
  // it('should route to login',()=>{
  //   component.routeToLogin();
  //   expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(`${ACCOUNT}/${LOGIN}`);   
  // })
});
