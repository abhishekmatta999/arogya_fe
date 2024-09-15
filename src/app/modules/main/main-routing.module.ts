import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {
  HOME,
  LAYOUT,
  PROFILE,
  RECIPE_DETAILS,
  TRACK,
  WEAKLYMEAL,
} from "../../shared/constants/routes-constant";
import { MainComponent } from "./main.component";
import { ProfileDetailsComponent } from "../accounts/components/profile-details/profile-details.component";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { workoutPlan } from "src/app/shared/constants/api-constants";
import { WorkoutComponentComponent } from "./workout-component/workout-component.component";

export const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      { path: "", redirectTo: HOME, pathMatch: "full" },
      {
        path: PROFILE,
        component: ProfileDetailsComponent,
        data: {
          item: [{ label: "My Profile", route: `${LAYOUT}/${PROFILE}` }],
        },
      },
      {
        path: HOME,
        loadChildren: () =>
          import("./home/home.module").then((m) => m.HomeModule),
      },
      {
        path: TRACK,
        loadChildren: () =>
          import("./meal-tracking/meal-tracking.module").then(
            (m) => m.MealTrackingModule
          ),
      },
      {
        path: WEAKLYMEAL,
        loadChildren: () =>
          import("./weakly-meal/weakly-meal.module").then(
            (m) => m.WeaklyMealModule
          ),
      },
      {
        path: RECIPE_DETAILS,
        component: RecipeDetailsComponent,
        data: {
          item: [{ label: "Recipe Details", route: `${LAYOUT}/${TRACK}` }],
        },
      },
      {
        path: TRACK,
        loadChildren: () =>
          import("./meal-tracking/meal-tracking.module").then(
            (m) => m.MealTrackingModule
          ),
        data: {
          item: [{ label: "Track Meal", route: `${LAYOUT}/${TRACK}` }],
        },
      },
      {
        path: WEAKLYMEAL,
        loadChildren: () =>
          import("./weakly-meal/weakly-meal.module").then(
            (m) => m.WeaklyMealModule
          ),
        data: {
          item: [
            { label: "Weekly Meal Plan", route: `${LAYOUT}/${WEAKLYMEAL}` },
          ],
        },
      },
      {
        path: "workout-plan",
        component: WorkoutComponentComponent,
        data: {
          item: [{ label: "Workout-plan", routes: `${LAYOUT}/workout-plan` }],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
