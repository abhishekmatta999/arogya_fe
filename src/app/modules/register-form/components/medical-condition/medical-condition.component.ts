import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { medicalCondition } from "src/app/shared/constants/values-constant";
import { TranslateService } from "src/services/translate/translate.service";

@Component({
  selector: "fit-medical-condition",
  templateUrl: "./medical-condition.component.html",
  styleUrls: ["./medical-condition.component.scss"],
})
export class MedicalConditionComponent implements OnInit {
  @Input() medicalConditionForm!: FormGroup;
  medicalConditionList = medicalCondition;
  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}

  getTranslate(key: string) {
    return this.translateService.getTranslate(key);
  }

  onCheckboxChange(e: any) {
    const medicalConditionArray: FormArray = this.medicalConditionForm.get(
      "medicalCondition"
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
}
