import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BUTTONUIMODEL } from "../../constants/button-config-constant";

@Component({
  selector: "fit-error-dialog",
  templateUrl: "./error-dialog.component.html",
  styleUrls: ["./error-dialog.component.scss"],
})
export class ErrorDialogComponent implements OnInit {
  errorMsg: string = "Something went wrong";

  errorButtonConfig: BUTTONUIMODEL = {
    text: "Close",
    cls: "btn-error btn",
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public errorDialogRef: MatDialogRef<ErrorDialogComponent>
  ) {
    this.errorMsg = this.data?.errorMsg;
  }

  ngOnInit(): void {
    this.errorDialogRef.addPanelClass("error-dialog");
    this.errorDialogRef.disableClose = true;
  }
}
