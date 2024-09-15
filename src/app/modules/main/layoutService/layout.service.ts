import { Injectable } from "@angular/core";
import {
  deleteTrackMealSave,
  dietChartUrl,
  fitnessDataUrl,
  getReciepe,
  imageNutritionUrl,
  nextMeanUrl,
  nutriCountUrl,
  searchFoodUrl,
  trackMeal,
  trackMealSave,
  weeklyPlanUrl,
} from "src/app/shared/constants/api-constants";
import { HttpService } from "src/services/http/http.service";

@Injectable({
  providedIn: "root",
})
export class LayoutService {
  constructor(private _http: HttpService) {}

  getFitness(bodyObj = {}) {
    return this._http.post(fitnessDataUrl, bodyObj);
  }

  getNutri(bodyObj = {}) {
    return this._http.post(nutriCountUrl, bodyObj);
  }

  getImageNutrition(bodyObj: any) {
    return this._http.post(imageNutritionUrl, bodyObj);
  }
  searchFoodItem(params: any) {
    return this._http.post(searchFoodUrl, {}, { params }, false);
  }

  getRecipeData(params: any) {
    return this._http.post(getReciepe, {}, { params });
  }

  getDietChart() {
    return this._http.post(dietChartUrl, {});
  }

  getWeeklyPlan(){
    return this._http.post(weeklyPlanUrl,{})
  }

  getNextPlan(){
    return this._http.post(nextMeanUrl,{})
  }
  getTrackPlan() {
    return this._http.post(trackMeal, {});
  }
  saveGetTrackPlan(bodyObj: any) {
    return this._http.post(trackMealSave, bodyObj);
  }

  deleteTrackPlanData(params: any) {
    return this._http.post(deleteTrackMealSave, {}, { params });
  }

}
