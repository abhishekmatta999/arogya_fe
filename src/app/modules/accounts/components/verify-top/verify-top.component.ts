import { Component, OnInit } from "@angular/core";
import { AccountService } from "../../service/account.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LOGIN, REGISTER } from "src/app/shared/constants/routes-constant";
import { ToastMessagesService } from "src/services/toaster/toast-messages.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { regexList } from "src/app/shared/constants/constants";

@Component({
  selector: "fit-verify-top",
  templateUrl: "./verify-top.component.html",
  styleUrls: ["./verify-top.component.scss"],
})
export class VerifyTopComponent implements OnInit {
  changePasswordForm!: FormGroup;
  otpLength: number = 6;
  otpValue = "";

  isRegister = false;
  private email!: string;

  constructor(
    private _accountService: AccountService,
    private _actRoute: ActivatedRoute,
    private router: Router,
    private _toaster: ToastMessagesService
  ) {
    const body = JSON.parse(
      window.atob(this._actRoute.snapshot.queryParams["data"])
    );
    this.isRegister = body["type"] === "register";
    this.email = body["email"];
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.changePasswordForm = new FormGroup({
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(regexList.password),
      ]),
    });
  }

  updateOtpValue(event: any) {
    this.otpValue = event;
  }

  verifyOtp() {
    const body = JSON.parse(
      window.atob(this._actRoute.snapshot.queryParams["data"])
    );
    body["otp"] = this.otpValue;
    this.isRegister = body["type"] === "register";
    this.email = body["email"];
    this._accountService.verifyOtp(body).subscribe({
      next: (resp: any) => {
        if (resp.success) {
          this._toaster.toast("OTP verified successfully", "success-toast");
          localStorage.setItem('userInfo',JSON.stringify(resp.data));
          this.router.navigate([REGISTER]);
        }
      },
    });
  }

  changePassword() {
    const bodyObj = {
      otp: this.otpValue,
      password: this.changePasswordForm.value.password,
      email: this.email,
    };
    this._accountService.changePassword(bodyObj).subscribe((resp) => {
      if (resp.success) {
        this._toaster.toast("Password Changed Successfully", "success-toast");
        this.router.navigate([LOGIN]);
      }
    });
  }
}
