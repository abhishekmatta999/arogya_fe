import { Component, Inject, OnInit, Sanitizer } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "fit-dishes-nutrition",
  templateUrl: "./dishes-nutrition.component.html",
  styleUrls: ["./dishes-nutrition.component.scss"],
})
export class DishesNutritionComponent implements OnInit {
  imageUrl: string | ArrayBuffer | null = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<DishesNutritionComponent>,
    private sanatizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.matDialogRef.addPanelClass("dishes-nutrition");
    this.matDialogRef.disableClose = true;
  }

  sanatizeUrl(base64: string) {
    return this.sanatizer.bypassSecurityTrustResourceUrl(this.data.img);
  }
}
