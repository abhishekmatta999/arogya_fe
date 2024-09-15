import { Component, OnDestroy, OnInit } from "@angular/core";
import { LayoutService } from "../layoutService/layout.service";
import { MatDialog } from "@angular/material/dialog";
import { SearchFoodPopupComponent } from "src/app/shared/components/search-food-popup/search-food-popup.component";
import { Subscription } from "rxjs";

@Component({
  selector: "fit-meal-tracking",
  templateUrl: "./meal-tracking.component.html",
  styleUrls: ["./meal-tracking.component.scss"],
})
export class MealTrackingComponent implements OnInit, OnDestroy {
  dialodSub!: Subscription;
  constructor(
    private layoutService: LayoutService,
    private matDialog: MatDialog
  ) {}

  breakfastData: any = [];
  morningSnacksData: any = [];
  lunchData: any = [];
  eveningSnacksData: any = [];
  dinnerData: any = [];

  ngOnInit(): void {
    this.getTrackingData();
  }
  getTrackingData() {
    this.layoutService.getTrackPlan().subscribe((res) => {
      this.breakfastData = res.data.find((res: any) => {
        if (res.meal_type == "breakfast") {
          return res;
        }
      });
      this.morningSnacksData = res.data.find((res: any) => {
        if (res.meal_type == "morning snacks") {
          return res;
        }
      });
      this.lunchData = res.data.find((res: any) => {
        if (res.meal_type == "lunch") {
          return res;
        }
      });
      this.eveningSnacksData = res.data.find((res: any) => {
        if (res.meal_type == "evening snacks") {
          return res;
        }
      });
      this.dinnerData = res.data.find((res: any) => {
        if (res.meal_type == "dinner") {
          return res;
        }
      });
    });
  }

  openSearchDialog(mealType: string) {
    this.dialodSub = this.matDialog
      .open(SearchFoodPopupComponent, {
        data: {
          functionType: "addmeal",
          header: "Add Meal",
          mealType: mealType,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res.data) this.getTrackingData();
      });
  }

  getCalorie(meal: any) {
    if (meal?.length) {
      let cal = 0;
      meal.forEach((ele: any) => {
        cal = cal + Number(ele.calories);
      });
      return cal;
    }
    return 0
  }

  deleteMeal(item: any) {
    const params = { meal_id: Number(item.id) };
    this.layoutService.deleteTrackPlanData(params).subscribe((res) => {
      this.getTrackingData();
    });
  }
  ngOnDestroy(): void {
    this.dialodSub?.unsubscribe();
  }
}
