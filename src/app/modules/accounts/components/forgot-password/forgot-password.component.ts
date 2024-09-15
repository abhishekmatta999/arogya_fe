import { Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ACCOUNT,
  LOGIN,
  OTP,
} from "../../../../shared/constants/routes-constant";
import {
  LOGIN_BUTTON_CONFIG,
  LOGIN_ON_RESET_PAGE_BUTTON_CONFIG,
  SEND_PASSWORD_BUTTON_CONFIG,
} from "../../../../shared/constants/button-config-constant";
import { AccountService } from "../../service/account.service";
import { ToastMessagesService } from "../../../../../services/toaster/toast-messages.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { regexList } from "src/app/shared/constants/constants";

@Component({
  selector: "fit-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  sendPasswordButtonConfig = SEND_PASSWORD_BUTTON_CONFIG;
  loginOnResetPasswordPageConfig = LOGIN_ON_RESET_PAGE_BUTTON_CONFIG;
  loginBtnConfig = LOGIN_BUTTON_CONFIG;
  linkSent = false;

  forgotForm!: FormGroup;

  constructor(
    private readonly _router: Router,
    private _accountService: AccountService,
    private _toasterService: ToastMessagesService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.forgotForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(regexList.email),
      ]),
    });
  }

  routeToLogin(): void {
    this._router.navigateByUrl(`${ACCOUNT}/${LOGIN}`);
  }

  submit(): void {
    const bodyObj = {
      email: this.forgotForm.value.email,
    };
    if (this.forgotForm.valid) {
      this._accountService.forgetPassword(bodyObj).subscribe(
        (res) => {
          this.linkSent = true;
          this._router.navigate([`${ACCOUNT}/${OTP}`], {
            queryParams: {
              data: window.btoa(JSON.stringify(this.forgotForm.value)),
            },
          });
        },
        (err) => {
          this.linkSent = false;
          this._toasterService.toast("Something went wrong!", "error-toast");
        }
      );
    } else {
      this.forgotForm.markAllAsTouched();
    }
  }
}
