import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { heightList } from "src/app/shared/constants/values-constant";
import { TranslateService } from "src/services/translate/translate.service";

@Component({
  selector: "fit-measurement-target",
  templateUrl: "./measurement-target.component.html",
  styleUrls: ["./measurement-target.component.scss"],
})
export class MeasurementTargetComponent implements OnInit {
  @Input() measureTargetForm!: FormGroup;
  heightsList = heightList;
  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}

  validateNumericInput(event: KeyboardEvent) {
    return !isNaN(+event.key);
  }
  getTranslate(key: string) {
    return this.translateService.getTranslate(key);
  }
}
