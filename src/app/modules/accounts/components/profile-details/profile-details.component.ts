import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { UserFormData } from "src/app/modules/register-form/models/register-data.model";
import { regexList } from "src/app/shared/constants/constants";
import {
  healthGoalList,
  heightList,
  medicalCondition,
} from "src/app/shared/constants/values-constant";
import { HttpService } from "src/services/http/http.service";
import { TranslateService } from "src/services/translate/translate.service";

import * as _ from "lodash";
import { RegisterApiService } from "src/app/modules/register-form/service/register-api.service";
import { MatDialog } from "@angular/material/dialog";
import { SuccessDialogComponent } from "src/app/shared/components/success-dialog/success-dialog.component";
import { ToastMessagesService } from "src/services/toaster/toast-messages.service";

@Component({
  selector: "fit-profile-details",
  templateUrl: "./profile-details.component.html",
  styleUrls: ["./profile-details.component.scss"],
})
export class ProfileDetailsComponent implements OnInit {
  personalDetailsForm!: FormGroup;

  heightsList = heightList;
  healthGoalList = healthGoalList;
  medicalConditionList = medicalCondition;

  saveProfile = false;
  private getProfileUrl = "get-user-profile";

  constructor(
    private matDialog: MatDialog,
    private httpService: HttpService,
    private toastService: ToastMessagesService,
    private translateService: TranslateService,
    private registerApiService: RegisterApiService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getProfile();
  }

  initializeForm() {
    this.personalDetailsForm = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.pattern(regexList.alphabetString),
      ]),
      gender: new FormControl("", [Validators.required]),
      age: new FormControl("", [
        Validators.required,
        Validators.pattern(regexList.numericString),
        Validators.maxLength(3),
      ]),
      health_preference: new FormArray([], [Validators.required]), // Expects array of strings
      weight: new FormControl(null, [Validators.required]),
      height: new FormControl(null, [Validators.required]),
      daily_step_count_target: new FormControl(null, [
        Validators.required,
        Validators.pattern(regexList.numericString),
      ]),
      daily_calories_target: new FormControl(null, [
        Validators.required,
        Validators.pattern(regexList.numericString),
      ]),
      weight_target: new FormControl(null, [
        Validators.required,
        Validators.pattern(regexList.numericString),
      ]),
      diet_preference: new FormControl(null, [Validators.required]),
      diseases: new FormArray([], [Validators.required]),
      active: new FormControl(null, [Validators.required]),
    });
  }

  onGoalChange(e: any) {
    const medicalConditionArray: FormArray = this.personalDetailsForm.get(
      "health_preference"
    ) as FormArray;

    if (e.checked) {
      medicalConditionArray.push(new FormControl(e.source.value));
    } else {
      const index = medicalConditionArray.controls.findIndex(
        (x) => x.value === e.source.value
      );
      medicalConditionArray.removeAt(index);
    }
  }

  onCheckboxChange(e: any) {
    const medicalConditionArray: FormArray = this.personalDetailsForm.get(
      "diseases"
    ) as FormArray;

    if (e.checked) {
      medicalConditionArray.push(new FormControl(e.source.value));
    } else {
      const index = medicalConditionArray.controls.findIndex(
        (x) => x.value === e.source.value
      );
      medicalConditionArray.removeAt(index);
    }
  }

  checkBoxPrefill(valueList: string[], control: string) {
    const medicalConditionArray: FormArray = this.personalDetailsForm.get(
      control
    ) as FormArray;

    valueList.forEach((ele) => {
      medicalConditionArray.push(new FormControl(ele));
    });
  }

  isChecked(value: string, control: string) {
    return (<FormArray>this.personalDetailsForm.get(control)).value.includes(
      value
    );
  }

  onEditClick() {
    this.personalDetailsForm.enable();
    this.saveProfile = true;
  }

  validateNumericInput(event: KeyboardEvent) {
    return !isNaN(+event.key);
  }

  getTranslate(key: string) {
    return this.translateService.getTranslate(key);
  }

  getProfile() {
    this.httpService.post(`users/${this.getProfileUrl}`, {}).subscribe({
      next: ({ data }) => {
        this.checkBoxPrefill(data.health_preference, "health_preference");
        this.checkBoxPrefill(data.diseases, "diseases");
        this.personalDetailsForm.patchValue({
          ...data,
          height: data.height.toString(),
          diet_preference: data.diet_preference[0],
        });
        this.personalDetailsForm.disable();
      },
    });
  }

  /**
   * Submit Function
   */
  onSaveClick() {
    const bodyObj = this.getSubmitPayload();
    this.httpService.put(`v1/users/edit-user-profile`, bodyObj).subscribe({
      next: (res) => {
        this.toastService.toast(
          "Profile Updated Successfully",
          "success-toast"
        );
        this.saveProfile = false;
        this.getProfile();
      },
    });
  }

  /**
   *
   * @returns payload for form summition
   */
  getSubmitPayload(): UserFormData {
    const formValue = this.personalDetailsForm.value;

    return {
      ...formValue,
      diet_preference: [formValue.diet_preference],
      height: +formValue.height,
    };
  }
}
