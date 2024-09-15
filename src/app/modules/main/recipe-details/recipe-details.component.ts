import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LayoutService } from "../layoutService/layout.service";

@Component({
  selector: "fit-recipe-details",
  templateUrl: "./recipe-details.component.html",
  styleUrls: ["./recipe-details.component.scss"],
})
export class RecipeDetailsComponent implements OnInit {
  foodName!: any;
  reciepeDetails: any;

  constructor(
    private route: ActivatedRoute,
    private layoutApiService: LayoutService
  ) {}

  ngOnInit(): void {
    this.foodName = this.route.snapshot.queryParams["foodName"];
    if (this.foodName) this.getRecipeData();
  }
  getRecipeData() {
    const params = { reciepe_name: this.foodName };
    this.layoutApiService.getRecipeData(params).subscribe((res) => {
      this.reciepeDetails = res.data;
    });
  }
}
