import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Subject, debounceTime, distinctUntilChanged } from "rxjs";
import { LayoutService } from "src/app/modules/main/layoutService/layout.service";
import { regexList } from "../../constants/constants";
import { unitList } from "../../constants/values-constant";

@Component({
  selector: "fit-search-food-popup",
  templateUrl: "./search-food-popup.component.html",
  styleUrls: ["./search-food-popup.component.scss"],
})
export class SearchFoodPopupComponent implements OnInit {
  foodData: any;
  nutriData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      functionType: "addmeal" | "getrecepie";
      header: string;
      mealType?: string;
    },
    public dialogRef: MatDialogRef<SearchFoodPopupComponent>,
    private layoutService: LayoutService,
    private router: Router
  ) {}
  searchSubject: Subject<string> = new Subject<string>();
  searchResultList = [];
  isLoading = false;

  foodQuantity = new FormControl(null, [
    Validators.required,
    Validators.pattern(regexList.numericString),
  ]);
  foodUnit = new FormControl(null, [Validators.required]);
  unitList: any = unitList;

  ngOnInit(): void {
    this.dialogRef.addPanelClass("pannel-container");
    this.searchSubject
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((searchTerm) => {
        if (searchTerm) {
          const params = { name: searchTerm };
          this.isLoading = true;
          this.layoutService.searchFoodItem(params).subscribe({
            next: (res) => {
              this.isLoading = false;
              this.searchResultList = res.data;
            },
          });
        }
      });
  }
  Cancel() {
    this.dialogRef.close();
  }
  valueEntered(event: string) {
    this.searchSubject.next(event);
  }

  clickEvent(food: any) {
    if (this.data.functionType == "addmeal") this.onAddMeal(food);
    else this.gotoRecepie(food);
  }
  onAddMeal(foodData: any) {
    this.foodData = foodData;
    this.unitList = this.unitList[this.foodData?.food_type];
  }

  getNutridata() {
    const data = this.foodQuantity.value;
    const unit = this.unitList.find((res: any) => {
      if (res.unit == this.foodUnit.value) {
        return res;
      }
    })?.unit_in_g;
    if (data && unit) {
      const dataInGram = data * unit;
      const selecedFoodQuentity =
        this.unitList.find((res: any) => {
          if (res.unit == this.foodData.unit) {
            return res;
          }
        })?.unit_in_g || 120;

      this.nutriData = {
        calories: Math.round(
          (this.extractWeight(this.foodData.calories) /
            (this.foodData.quantity * selecedFoodQuentity)) *
            dataInGram
        ),
        carbs: Math.round(
          (this.extractWeight(this.foodData.carbs) /
            (this.foodData.quantity * selecedFoodQuentity)) *
            dataInGram
        ),
        fat: Math.round(
          (this.extractWeight(this.foodData.fat) /
            (this.foodData.quantity * selecedFoodQuentity)) *
            dataInGram
        ),
        fiber: Math.round(
          (this.extractWeight(this.foodData.fiber) /
            (this.foodData.quantity * selecedFoodQuentity)) *
            dataInGram
        ),
      };
    }
  }

  gotoRecepie(foodData: any) {
    this.router.navigate(["layout/recepie-details"], {
      queryParams: { foodName: foodData.name },
    });
    this.dialogRef.close();
  }
  validateNumericInput(event: KeyboardEvent) {
    return !isNaN(+event.key);
  }

  submitFood() {
    const bodyObj = {
      meal_name: this.foodData.name,
      meal_quantity: Number(this.foodQuantity.value),
      unit: this.foodUnit.value,
      meal_type: this.data.mealType,
    };
    this.layoutService.saveGetTrackPlan(bodyObj).subscribe((res) => {
      this.dialogRef.close({ data: true });
    });
  }

  extractWeight(input: string) {
    // Use regex to find the numeric part in the string
    const match = input.match(/(\d+(\.\d+)?)/); // Looks for numbers (including decimals)

    // If a match is found, return the number as a float or integer
    return match ? parseFloat(match[0]) : 0; // parseFloat handles both integers and decimals
  }
}
