import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BUTTONUIMODEL } from "../../constants/button-config-constant";

@Component({
  selector: "fit-success-dialog",
  templateUrl: "./success-dialog.component.html",
  styleUrls: ["./success-dialog.component.scss"],
})
export class SuccessDialogComponent implements OnInit {
  successMsg: string = "error.wrong";

  successButtonConfig: BUTTONUIMODEL = {
    text: "Close",
    cls: "btn-success btn",
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public successDialogRef: MatDialogRef<SuccessDialogComponent>
  ) {
    this.successMsg = this.data?.errorMsg;
  }

  ngOnInit(): void {
    this.successDialogRef.addPanelClass("success-dialog");
    this.successDialogRef.disableClose = true;
  }
}
