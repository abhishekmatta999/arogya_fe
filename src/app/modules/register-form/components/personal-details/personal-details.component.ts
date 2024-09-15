import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { TranslateService } from "src/services/translate/translate.service";

@Component({
  selector: "fit-personal-details",
  templateUrl: "./personal-details.component.html",
  styleUrls: ["./personal-details.component.scss"],
})
export class PersonalDetailsComponent implements OnInit {
  @Input() PersonalDetailsForm!: FormGroup;
  constructor(private translateService: TranslateService) {}
  ngOnInit(): void {}

  getTranslate(key: string) {
    return this.translateService.getTranslate(key);
  }
  validateNumericInput(event: KeyboardEvent) {
    return !isNaN(+event.key);
  }
}
