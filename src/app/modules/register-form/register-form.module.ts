import { NgModule } from "@angular/core";
import { RegisterFormRoutingModule } from "./register-form.routing.module";
import { RegisterFormComponent } from "./register-form.component";
import { SharedModule } from "src/app/shared/modules/shared.module";
import { PersonalDetailsComponent } from "./components/personal-details/personal-details.component";
import { HealthGoalComponent } from "./components/health-goal/health-goal.component";
import { MeasurementTargetComponent } from "./components/measurement-target/measurement-target.component";
import { FoodPreferenceComponent } from "./components/food-preference/food-preference.component";
import { MedicalConditionComponent } from "./components/medical-condition/medical-condition.component";
import { UserActiveDataComponent } from "./components/user-active-data/user-active-data.component";
import { CommonModule } from "@angular/common";
import { ValidationErrorModule } from "src/pipes/validation-error/validation-error.module";

@NgModule({
  declarations: [
    RegisterFormComponent,
    PersonalDetailsComponent,
    HealthGoalComponent,
    MeasurementTargetComponent,
    FoodPreferenceComponent,
    MedicalConditionComponent,
    UserActiveDataComponent,
  ],
  imports: [
    RegisterFormRoutingModule,
    SharedModule,
    CommonModule,
    ValidationErrorModule,
  ],
})
export class RegisterFormModule {}
