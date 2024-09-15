import { Component, OnInit, ViewChild } from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { Router } from "@angular/router";
import { ACCOUNT, HOME, LAYOUT, LOGIN } from "../../constants/routes-constant";
import { TranslateService } from "src/services/translate/translate.service";

@Component({
  selector: "fit-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  darkMode = false;
  selectedLang: string = "English";

  userInfo: any;
  constructor(private _route: Router, private translate: TranslateService) {}

  ngOnInit(): void {
    this.userInfo = JSON.parse(<any>localStorage.getItem("userInfo"));
    this.selectedLang = localStorage.getItem("selectedLang") || "English";
    this.checkTheme();
  }

  checkTheme() {
    const theme = localStorage.getItem("theme");
    this.darkMode = theme === "dark-mode" ? true : false;
  }

  setTheme(theme: string) {
    this.darkMode = theme === "dark-mode" ? true : false;
    localStorage.setItem("theme", theme);

    document.body.classList.add(theme);
    document.body.classList.remove(
      theme === "dark-mode" ? "light-mode" : "dark-mode"
    );
  }

  routeTo(route: string) {
    this._route.navigate([`${LAYOUT}/${route}`]);
  }

  routeToDashBoard() {
    this._route.navigate([`${LAYOUT}/${HOME}`]);
  }

  onLogout() {
    localStorage.removeItem("userInfo");
    this._route.navigate([`${ACCOUNT}/${LOGIN}`]);
  }

  changeLanguage(lang: string, value: string) {
    this.selectedLang = value;
    localStorage.setItem("selectedLang", this.selectedLang);
    this.translate.use(lang).then((res) => {
      console.log(res);
    });
  }
}
