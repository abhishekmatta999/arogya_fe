import { Injectable } from "@angular/core";
import {
  authenticateUrl,
  changePasswordUrl,
  forgetPassUrl,
  generateOtp,
  googleUrl,
  verifyOtpUrl,
} from "../../../shared/constants/api-constants";
import { HttpService } from "../../../../services/http/http.service";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  constructor(private _http: HttpService) {}

  login(body: {}) {
    return this._http.post(authenticateUrl, body);
  }

  googleLogin(body: any) {
    return this._http.post(googleUrl, body);
  }

  sendOtp(body: any) {
    return this._http.post(generateOtp, body);
  }

  verifyOtp(body: any) {
    return this._http.post(verifyOtpUrl, body);
  }

  forgetPassword(body: any) {
    return this._http.post(forgetPassUrl, body);
  }

  changePassword(body: any) {
    return this._http.post(changePasswordUrl, body);
  }
}
