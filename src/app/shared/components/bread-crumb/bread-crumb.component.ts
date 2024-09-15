import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { HOME, LAYOUT } from "../../constants/routes-constant";
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
    private changeDetectionRef: ChangeDetectorRef
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
