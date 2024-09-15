import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountsComponent } from './accounts.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyTopComponent } from './components/verify-top/verify-top.component';
import { FORGOT_PASSWORD, LOGIN, OTP, SIGNUP } from 'src/app/shared/constants/routes-constant';

export const routes: Routes = [
  { path: '', component: AccountsComponent, children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: LOGIN, component: LoginComponent,data:{isLogin:true} },
    { path: SIGNUP, component: LoginComponent,data:{isLogin:false} },
    { path: OTP, component: VerifyTopComponent },
    { path: FORGOT_PASSWORD, component: ForgotPasswordComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
