import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { ValidationErrorModule } from '../../../pipes/validation-error/validation-error.module';
import { OtpInputModule } from 'src/app/shared/components/otp-input-module/otp-input.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VerifyTopComponent } from './components/verify-top/verify-top.component';



@NgModule({
  declarations: [
    AccountsComponent,
    LoginComponent,
    ForgotPasswordComponent,
    VerifyTopComponent,
    
  ],
  imports: [
    AccountsRoutingModule,
    CommonModule,
    SharedModule,
    ValidationErrorModule,
    OtpInputModule,
    MatFormFieldModule,
    OtpInputModule
  ]
})
export class AccountsModule { }
