import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { userActive } from "src/app/shared/constants/values-constant";
import { TranslateService } from "src/services/translate/translate.service";

@Component({
  selector: "fit-user-active-data",
  templateUrl: "./user-active-data.component.html",
  styleUrls: ["./user-active-data.component.scss"],
})
export class UserActiveDataComponent implements OnInit {
  @Input() userActiveForm!: FormGroup;
  userActiveList = userActive;
  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}

  onCheckboxChange(e: any) {
    const medicalConditionArray: FormArray = this.userActiveForm.get(
      "howActive"
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
  getTranslate(key: string) {
    return this.translateService.getTranslate(key);
  }
}
