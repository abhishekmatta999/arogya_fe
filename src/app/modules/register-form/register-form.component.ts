import { Component, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { regexList } from "src/app/shared/constants/constants";
import { UserFormData } from "./models/register-data.model";
import * as _ from "lodash";
import { RegisterApiService } from "./service/register-api.service";
import { MatDialog } from "@angular/material/dialog";
import { SearchFoodPopupComponent } from "src/app/shared/components/search-food-popup/search-food-popup.component";
import { MatStepper } from "@angular/material/stepper";
import { Router } from "@angular/router";
import { HOME, LAYOUT } from "src/app/shared/constants/routes-constant";
import { ToastMessagesService } from "src/services/toaster/toast-messages.service";
@Component({
  selector: "fit-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"],
})
export class RegisterFormComponent implements OnInit {
  isLinear = false;
  registerFormGroup!: FormGroup;
  currentIndex = 0;
  @ViewChild("stepper") stepper!: MatStepper;

  constructor(
    private registerApiService: RegisterApiService,
    private _router: Router,
    private matDialog: MatDialog,
    private toast: ToastMessagesService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerFormGroup = new FormGroup({
      personalDetailsForm: new FormGroup({
        fullName: new FormControl(null, [
          Validators.required,
          Validators.pattern(regexList.alphabetStringWithSpace),
        ]),
        gender: new FormControl(null, [Validators.required]),
        age: new FormControl(null, [
          Validators.required,
          Validators.pattern(regexList.numericString),
        ]),
      }),
      healthGoalForm: new FormGroup({
        goals: new FormArray([], [Validators.required]), // Expects array of strings
      }),
      measureAndTargetForm: new FormGroup({
        currentWeight: new FormControl(null, [
          Validators.required,
          Validators.pattern(regexList.weight),
        ]),
        currentHeight: new FormControl(null, [Validators.required]),
        targetStep: new FormControl(null, [
          Validators.required,
          Validators.pattern(regexList.numericString),
        ]),
        targetCaleroyBurn: new FormControl(null, [
          Validators.required,
          Validators.pattern(regexList.numericString),
        ]),
        targetWeight: new FormControl(null, [
          Validators.required,
          Validators.pattern(regexList.weight),
        ]),
      }),
      foodPreferenceForm: new FormGroup({
        foodPreference: new FormControl(null, [Validators.required]),
      }),
      medicalConditionForm: new FormGroup({
        medicalCondition: new FormArray([], [Validators.required]),
      }),
      activeForm: new FormGroup({
        howActive: new FormControl(null, [Validators.required]),
      }),
    });
  }

  /**
   *
   * @param FormGroupName form group name to get
   * @returns formGroup
   */
  getFormControl(FormGroupName: string): FormGroup {
    return this.registerFormGroup?.get(FormGroupName) as FormGroup;
  }

  /**
   * Submit Function
   */
  onSubmit() {
    const bodyObj = this.getSubmitPayload();
    debugger;
    this.registerApiService.submitRegistrForm(bodyObj).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.toast(res?.data?.message, "success-toast");
          this._router.navigate([`${LAYOUT}/${HOME}`]);
        }
      },
    });
  }

  /**
   *
   * @returns payload for form summition
   */
  getSubmitPayload(): UserFormData {
    const formValue = this.registerFormGroup.value;
    const bodyObj: UserFormData = {
      age: _.get(formValue, "personalDetailsForm.age"),
      weight: _.get(formValue, "measureAndTargetForm.currentWeight"),
      height: _.get(formValue, "measureAndTargetForm.currentHeight"),
      gender: _.get(formValue, "personalDetailsForm.gender"),
      diseases: _.get(formValue, "medicalConditionForm.medicalCondition"),
      health_preference: _.get(formValue, "healthGoalForm.goals"),
      diet_preference: _.get(formValue, "foodPreferenceForm.foodPreference"),
      daily_step_count_target: _.get(
        formValue,
        "measureAndTargetForm.targetStep"
      ),
      daily_calories_target: _.get(
        formValue,
        "measureAndTargetForm.targetCaleroyBurn"
      ),
      active: _.get(formValue, "activeForm.howActive"),
      weight_target: _.get(formValue, "measureAndTargetForm.targetWeight"),
      name: _.get(formValue, "personalDetailsForm.fullName"),
    };
    return bodyObj;
  }

  updateCurrentIndex(event: any) {
    this.currentIndex = event.selectedIndex;
  }

  goBack() {
    this.stepper.previous();
  }

  goForward() {
    this.stepper.next();
  }
  openSearchDialog() {
    this.matDialog.open(SearchFoodPopupComponent, {
      data: {
        functionType: "getrecepie",
        header: "Get Recepie",
      },
    });
  }
}
