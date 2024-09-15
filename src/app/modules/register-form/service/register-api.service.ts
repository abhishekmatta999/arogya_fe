import { Injectable } from "@angular/core";
import { HttpService } from "src/services/http/http.service";
import { UserFormData } from "../models/register-data.model";

@Injectable({
  providedIn: "root",
})
export class RegisterApiService {
  private registerSaveUrl = "save-user-profile";
  constructor(private httpService: HttpService) {}

  public submitRegistrForm(bodyObj: UserFormData) {
    return this.httpService.post(`users/${this.registerSaveUrl}`, bodyObj);
  }
}
