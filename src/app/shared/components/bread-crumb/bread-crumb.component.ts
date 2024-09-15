import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { HOME, LAYOUT } from "../../constants/routes-constant";
import { MatDialog } from "@angular/material/dialog";
import { SyncDialogComponent } from "../sync-dialog/sync-dialog.component";
@Component({
  selector: "fit-bread-crumb",
  templateUrl: "./bread-crumb.component.html",
  styleUrls: ["./bread-crumb.component.scss"],
})
export class BreadCrumbComponent implements OnInit {
  public breadCrumbs: any;
  public dashboardRoute: string = `${LAYOUT}/${HOME}`;
  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private changeDetectionRef: ChangeDetectorRef,
    private dialog:MatDialog
  ) {
  }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() {
    const currentUrl = this.router.url;
    const data = this.actRoute.routeConfig?.children?.filter(
      (resp:any) => currentUrl && currentUrl.includes(resp?.path)
    );
    if(data && data.length){
      data.forEach((element:any) => {
        if(element?.data){
          this.breadCrumbs = [...element?.data?.item]
          this.changeDetectionRef.detectChanges();
        }
      });
    }
  }

  routeTo(route: string) {
    this.router.navigate([route]);
  }
}
