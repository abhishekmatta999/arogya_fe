import { Component, OnInit, ViewChild } from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { Router } from "@angular/router";
import { ACCOUNT, LAYOUT, LOGIN } from "../../constants/routes-constant";

@Component({
  selector: "fit-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  userInfo: any;
  constructor(private _route: Router) {}

  ngOnInit(): void {
    this.userInfo = JSON.parse(<any>localStorage.getItem("userInfo"));
  }

  openMatmenu() {}

  routeTo(route:string){
    this._route.navigate([`${LAYOUT}/${route}`])
  }

  onLogout() {
    localStorage.removeItem("userInfo");
    this._route.navigate([`${ACCOUNT}/${LOGIN}`]);
  }
}
