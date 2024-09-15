import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "fit-sync-dialog",
  templateUrl: "./sync-dialog.component.html",
  styleUrls: ["./sync-dialog.component.scss"],
})
export class SyncDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SyncDialogComponent>
  ) {
  }

  ngOnInit(): void {
    this.dialogRef.addPanelClass("sync-dialog-container");
  }
  
}
