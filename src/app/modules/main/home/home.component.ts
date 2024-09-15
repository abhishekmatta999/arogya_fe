import { ElementRef, Inject, ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { LayoutService } from "../layoutService/layout.service";
import { MatDialog } from "@angular/material/dialog";
import { DishesNutritionComponent } from "src/app/shared/components/dishes-nutrition/dishes-nutrition.component";
import { Router } from "@angular/router";
import {
  LAYOUT,
  RECIPE_DETAILS,
  TRACK,
} from "src/app/shared/constants/routes-constant";
import { environment } from "src/environments/environment";
import { GoogleService } from "src/services/googleService/google.service";
import { AccountService } from "../../accounts/service/account.service";
import SwiperCore, { Navigation, Autoplay, Swiper } from "swiper";
import { SearchFoodPopupComponent } from "src/app/shared/components/search-food-popup/search-food-popup.component";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
} from "chart.js";
import { ToastMessagesService } from "src/services/toaster/toast-messages.service";
import { SyncDialogComponent } from "src/app/shared/components/sync-dialog/sync-dialog.component";

SwiperCore.use([Navigation, Autoplay]);
Chart.register(CategoryScale, LinearScale, BarController, BarElement);

export const dayCollection = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};
@Component({
  selector: "fit-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  @ViewChild("fileInput", { static: false }) fileInput!: ElementRef;
  @ViewChild("swiperRef") swiperRef!: ElementRef;

  private selectedDate: any;
  banners = [
    { imageUrl: "assets/images/banner-1.svg" },
    { imageUrl: "assets/images/banner-2.svg" },
    { imageUrl: "assets/images/banner-3.svg" },
  ];
  private imagBase64!: string;
  fitnessData: any;
  nutriData: any;
  recipies: any;
  mealData: any;
  maxDate = new Date();
  chart2!: any;
  chart1!: any;
  chartFail: boolean = false;
  constructor(
    private matDialog: MatDialog,
    private layoutService: LayoutService,
    private router: Router,
    private _googleService: GoogleService,
    private _accountService: AccountService,
    private _toast: ToastMessagesService
  ) {}

  ngOnInit(): void {
    this.callDashboardApi();
    this.getMealData();
  }

  callDashboardApi() {
    this.getFitnessData();
    this.getNutritionData();
  }

  ngAfterViewInit(): void {
    new Swiper(this.swiperRef?.nativeElement, {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      autoplay: true,
      breakpoints: {
        "480": {
          slidesPerView: 1.2,
        },
        "640": {
          slidesPerView: 2,
          spaceBetween: 50,
        },
      },
      navigation: {
        nextEl: ".custom-swiper-button-next",
        prevEl: ".custom-swiper-button-prev",
      },
    });
    this.fetchChartData();
  }

  getFitnessData() {
    const bodyObj = { end_date: this.selectedDate || new Date() };
    this.layoutService.getFitness(bodyObj).subscribe({
      next: (resp: any) => {
        if (resp.success) {
          this.fitnessData = resp?.data;
          const bmi = this.fitnessData.profile.bmi;
          this.fitnessData["bmiAngle"] = bmi/100*180 + "deg"
          if(!resp?.data?.fit_sync_status) this.matDialog.open(SyncDialogComponent,{
            autoFocus:false
          }).afterClosed().subscribe(res=>{
            res && this.loginWithGoogle();
          })
          this.fitnessData.current["distance"] = Math.round(
            this.fitnessData.current["distance"]
          );
          this.fitnessData.current["calories"] = Math.round(
            this.fitnessData.current["calories"]
          );
        }
      },
    });
  }

  getNutritionData() {
    const bodyObj = { end_date: this.selectedDate || new Date() };
    this.layoutService.getNutri(bodyObj).subscribe({
      next: (resp: any) => {
        if (resp.success) {
          this.nutriData = resp?.data;
        }
      },
    });
  }

  onFileSelected(event: Event) {
    const input = <HTMLInputElement>event.target;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      let reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        let result = (reader as any).result.toString();
        this.imagBase64 = result;
      };

      this.getImageNutrition(file);
    }
  }

  getImageNutrition(imageData: any) {
    console.log(imageData);
    let bodyObj = new FormData();
    bodyObj.append("file", imageData);

    this.layoutService.getImageNutrition(bodyObj).subscribe(({ data }) => {
      this.matDialog.open(DishesNutritionComponent, {
        data: {
          ...data,
          img: this.imagBase64,
        },
      });
    });
  }

  getRoundData(value: any) {
    if (!value) return 0;
    return Math.round(value);
  }

  exportDiet() {
    this.layoutService.getDietChart().subscribe({
      next: (resp: any) => {
        if (resp?.success && resp?.data) {
          const url = `${environment.FILE_PATH}${resp.data}`;
          let anchor = document.createElement("a");
          anchor.href = url;
          anchor.target = "_blank";
          anchor.download = "Weekly_Plan";
          anchor.click();
        }
      },
    });
  }

  getMealData() {
    this.layoutService.getNextPlan().subscribe({
      next: (res: any) => {
        if (res.success && res.data && res.data.length) {
          this.mealData = res.data;
        }
      },
    });
  }

  fetchChartData() {
    const param = { date: this.selectedDate || new Date(), type: "all" };
    this.chart1 && this.chart1.destroy();
    this.chart2 && this.chart2.destroy();
    this.layoutService.getChartData(param).subscribe({
      next: (resp: any) => {
        if (resp.success && resp.data && resp?.data?.length) {
          const labels = this.generateLabel(resp.data);
          this.chartFail = true;
          const calories = resp.data.map((ele: any) =>
            Math.round(ele?.calories)
          );
          const step = resp.data.map((ele: any) => Math.round(ele?.step_count));
          this.chart1 = new Chart(<any>document.getElementById("chart1"), {
            type: "bar",
            data: {
              labels: labels,
              datasets: [
                {
                  data: calories,
                  borderColor: "#00599f",
                  backgroundColor: "#d8edd6",
                },
              ],
            },
            options: {
              responsive: true,
              animation: {
                duration: 0,
              },
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  callbacks: {},
                },
              },
              scales: {
                x: {
                  type: "category",
                  grid: {
                    display: false,
                  },
                },
                y: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    // callback:{function (value: any, index: any, values: any) {
                    //     return formatNumber(value);
                    //   }}
                  },
                },
              },
            },
          });
          this.chart2 = new Chart(<any>document.getElementById("chart2"), {
            type: "bar", // or 'bar', 'pie', etc.
            data: {
              labels: labels,
              datasets: [
                {
                  data: step,
                  borderColor: "#00599f",
                  backgroundColor: "#d8edd6",
                },
              ],
            },
            options: {
              responsive: true,
              animation: {
                duration: 0,
              },
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  callbacks: {},
                },
              },
              scales: {
                x: {
                  type: "category",
                  grid: {
                    display: false,
                  },
                },
                y: {
                  grid: {
                    display: false,
                  },
                  ticks: {},
                },
              },
            },
          });
          this.chart1.render();
          this.chart2.render();
        } else this.chartFail = false;
      },
    });
  }

  addMeal(item: any) {
    const obj = {
      meal_name: item.meal_name,
      meal_quantity: Number(item.meal_quantity),
      unit: item?.meal_unit,
      meal_type: item?.meal_type,
    };
    this.layoutService.saveGetTrackPlan(obj).subscribe({
      next: (resp: any) => {
        if (resp?.success) {
          this._toast.toast(resp?.data?.message, "success-toast");
          this.getNutritionData();
          this.getFitnessData();
        }
      },
    });
  }
  generateLabel(data: any) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      const day = new Date(data[i].date).getDay();
      arr.push((<any>dayCollection)[day]);
    }
    return arr;
  }

  routeToTrack() {
    this.router.navigate([`${LAYOUT}/${TRACK}`]);
  }
  routeToworkout() {
    this.router.navigate([`${LAYOUT}/workout-plan`]);
  }

  routeTo(item: any) {
    this.router.navigate([`${LAYOUT}/${RECIPE_DETAILS}`], {
      queryParams: { foodName: item?.meal_name },
    });
  }

  loginWithGoogle() {
    this._googleService.loginWithGoogle((profileData, tokenData) => {
      const body = {
        email: profileData?.email,
        google_id: profileData?.id,
        name: profileData?.name,
        profile_picture_url: profileData?.picture,
        access_token: tokenData?.accessToken,
        refresh_token: "",
      };
      this.callGoogleLogin(body);
    });
  }

  callGoogleLogin(body: any) {
    this._accountService.googleLogin(body).subscribe({
      next: (resp: any) => {
        if (resp?.success) {
          this.getFitnessData();
          this.getNutritionData();
        }
      },
    });
  }

  onDateSelected(event: any) {
    this.selectedDate = event.value;
    this.getFitnessData();
    this.getNutritionData();
    this.fetchChartData();
  }

  openSearch() {
    this.matDialog.open(SearchFoodPopupComponent, {
      data: {
        functionType: "getrecepie",
        header: "Search Recipe",
      },
    });
  }
}
