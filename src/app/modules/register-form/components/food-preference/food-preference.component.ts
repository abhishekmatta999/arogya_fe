import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { TranslateService } from "src/services/translate/translate.service";

@Component({
  selector: "fit-food-preference",
  templateUrl: "./food-preference.component.html",
  styleUrls: ["./food-preference.component.scss"],
})
export class FoodPreferenceComponent implements OnInit {
  @Input() foodPreferenceForm!: FormGroup;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}
  getTranslate(key: string) {
    return this.translateService.getTranslate(key);
  }
}
