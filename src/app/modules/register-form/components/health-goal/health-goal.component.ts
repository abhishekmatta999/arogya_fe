import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { healthGoalList } from "src/app/shared/constants/values-constant";
import { TranslateService } from "src/services/translate/translate.service";

@Component({
  selector: "fit-health-goal",
  templateUrl: "./health-goal.component.html",
  styleUrls: ["./health-goal.component.scss"],
})
export class HealthGoalComponent implements OnInit {
  @Input() healthGoalForm!: FormGroup;
  healthGoalList = healthGoalList;
  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}

  getTranslate(key: string) {
    return this.translateService.getTranslate(key);
  }

  onCheckboxChange(e: any) {
    const medicalConditionArray: FormArray = this.healthGoalForm.get(
      "goals"
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
