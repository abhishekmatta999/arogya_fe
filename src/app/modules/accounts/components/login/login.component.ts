import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LOGIN_BUTTON_CONFIG } from '../../../../shared/constants/button-config-constant';
import { ACCOUNT, FORGOT_PASSWORD, HOME, LAYOUT, OTP, REGISTER } from '../../../../shared/constants/routes-constant';
import { AutoUnsubscribe } from '../../../../shared/constants/unsubscribe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexList } from 'src/app/shared/constants/constants';
import { ToastMessagesService } from 'src/services/toaster/toast-messages.service';
import { CommonService } from 'src/services/common/common.service';
import { AccountService } from '../../service/account.service';
import { GoogleService } from 'src/services/googleService/google.service';
@AutoUnsubscribe([])

@Component({
  selector: 'fit-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginButtonConfig = LOGIN_BUTTON_CONFIG;
  googleText:string = 'Signin with Google';
  buttonText:string = 'Login';
  login:boolean = true;
  form:FormGroup = this.createForm();

  constructor(
    private readonly _router: Router,
    private _fb: FormBuilder,
    private _actRoute: ActivatedRoute,
    private _toaster: ToastMessagesService,
    private _commonService: CommonService,
    private _accountService: AccountService,
    private _googleAuthService: GoogleService
  ) { }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(){
    this._actRoute.data.subscribe({
      next:(resp:Data)=>{
        if(resp && !resp['isLogin']){
          this.googleText = 'Signup with Google';
          this.buttonText = 'Register';
          this.login = false
        }
      }
    })
  }

  createForm(){
    return this._fb.group({
      email:['',[Validators.required,Validators.pattern(regexList.email)]],
      password:['',[Validators.required]]
    })
  }

  onSubmit() {
    if(this.login) this.onLogin();
    else this.onRegister()
  }

  onLogin(){
    if(this.form.valid){
      this._accountService.login(this.form.value).subscribe({
        next:(res:any)=>{
          if(res?.success){
            localStorage.setItem('userInfo',JSON.stringify(res?.data));
            this._toaster.toast('Logged in successfully','success-toast');
            if(!res?.data?.profile_saved) this._router.navigate([REGISTER]);
            else this._router.navigate([`${LAYOUT}/${HOME}`]);
          }
        }
      })
    }else{
      this.form.markAllAsTouched();
    }
  }

  onRegister(){
    if(this.form.valid){
      this._accountService.sendOtp({email:this.form.value?.email}).subscribe({
        next:(res:any)=>{
          if(res.success){
            this._toaster.toast(res?.data?.message,'success-toast')
            this._router.navigate([`${ACCOUNT}/${OTP}`],{queryParams:{data:window.btoa(JSON.stringify({...this.form.value, type: 'register'}))} });
          }
        }
      })
    }else{
      this.form.markAllAsTouched();
    }
  }

  forgotPassword(): void{
    this._router.navigateByUrl(`${ACCOUNT}/${FORGOT_PASSWORD}`);
  }

  loginWithGoogle(){
    this._googleAuthService.loginWithGoogle((profileData, tokenData) => {
      const body = {
        email:profileData?.email,
        google_id:profileData?.id,
        name:profileData?.name,
        profile_picture_url:profileData?.picture,
        access_token:tokenData?.accessToken,
        refresh_token:''
      }
      this.callGoogleLogin(body)
    });
  }

  callGoogleLogin(body:any){
    this._accountService.googleLogin(body).subscribe({
      next:(resp:any)=>{
        if(resp?.success){
          localStorage.setItem('userInfo',JSON.stringify(resp.data))
          this._toaster.toast('Logged in successfully','success-toast');
          if(!resp?.data?.user.profile_saved) this._router.navigate([REGISTER]);
          else this._router.navigate([`${LAYOUT}/${HOME}`]);
        }
      }
    })
  }

}
