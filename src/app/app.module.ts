import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AngularMaterialModule } from "./shared/modules/angular-material.module";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { httpInterceptorProviders } from "../services/interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/modules/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { TranslateService } from "../services/translate/translate.service";
import { environment } from "src/environments/environment";
import { SearchFoodPopupComponent } from './shared/components/search-food-popup/search-food-popup.component';
import { DishesNutritionComponent } from "./shared/components/dishes-nutrition/dishes-nutrition.component";

export function setupTranslateFactory(service: TranslateService): Function {
  return () => service.use("en");
}

@NgModule({
  declarations: [
    AppComponent,
    SearchFoodPopupComponent,
    DishesNutritionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    AngularMaterialModule,
  ],
  providers: [
    httpInterceptorProviders,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true,
    },
    { provide: "API_URL", useValue: environment.API_BASE_PATH },
    { provide: "GOOGLE_CLIENT_ID", useValue: environment.clientId },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
