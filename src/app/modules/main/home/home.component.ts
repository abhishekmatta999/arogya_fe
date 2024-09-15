import { ElementRef, Inject, ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { LayoutService } from "../layoutService/layout.service";
import { MatDialog } from "@angular/material/dialog";
import { DishesNutritionComponent } from "src/app/shared/components/dishes-nutrition/dishes-nutrition.component";
import { Router } from "@angular/router";
import { LAYOUT, RECIPE_DETAILS, TRACK } from "src/app/shared/constants/routes-constant";
import { environment } from "src/environments/environment";
import { GoogleService } from "src/services/googleService/google.service";
import { AccountService } from "../../accounts/service/account.service";
import SwiperCore, { Navigation, Autoplay, Swiper } from "swiper";

SwiperCore.use([Navigation, Autoplay]);

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
  mealData:any;
  maxDate = new Date();
  constructor(
    private matDialog: MatDialog,
    private layoutService: LayoutService,
    private router: Router,
    private _googleService: GoogleService,
    private _accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.getFitnessData();
    this.getNutritionData();
    this.getMealData();
  }

  ngAfterViewInit(): void {
    new Swiper(this.swiperRef.nativeElement, {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      autoplay: true,
      breakpoints: {  
        '480': {
          slidesPerView: 1.2},
        '640': {
          slidesPerView: 2,
          spaceBetween: 50, },
      },
      navigation: {
        nextEl: ".custom-swiper-button-next",
        prevEl: ".custom-swiper-button-prev",
      },
    });
  }

  getFitnessData() {
    const bodyObj = { end_date: this.selectedDate || new Date() };
    this.layoutService.getFitness(bodyObj).subscribe({
      next: (resp: any) => {
        if (resp.success) {
          this.fitnessData = resp?.data;
          const bmi = this.fitnessData.profile.bmi;
          let angle = 0;
          if(bmi < 18.5) angle = 5;
          else if(bmi >= 18.5 && bmi < 24.9) angle = -60;
          else if(bmi >= 25 && bmi < 29.9) angle = 30;
          else if(bmi >= 30 && bmi < 39.9) angle = 70;
          else angle = 90;
          this.fitnessData["bmiAngle"] = angle + "deg"
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
    return Math.round(value);
  }

  exportDiet() {
    this.layoutService.getDietChart().subscribe({
      next: (resp: any) => {
        if(resp?.success && resp?.data){
          const url = `${environment.FILE_PATH}${resp.data}`;
          let anchor = document.createElement('a');
          anchor.href = url;
          anchor.target = '_blank'
          anchor.download = 'Weekly_Plan';
          anchor.click();
        }
      },
    });
  }

  getMealData(){
    this.layoutService.getNextPlan().subscribe({
      next:(res:any)=>{
        if(res.success && res.data && res.data.length){
          this.mealData = res.data;
        }
      }
    })
  }

  routeToTrack() {
    this.router.navigate([`${LAYOUT}/${TRACK}`]);
  }

  routeTo(item:any){
    this.router.navigate([`${LAYOUT}/${RECIPE_DETAILS}`],{queryParams:{foodName:item?.meal_name}})
  }

  loginWithGoogle(){
    this._googleService.loginWithGoogle((profileData, tokenData) => {
      const body = {
        email:profileData?.email,
        google_id:profileData?.id,
        name:profileData?.name,
        profile_picture_url:profileData?.picture,
        access_token:tokenData?.accessToken,
        refresh_token:''
      }
      this.callGoogleLogin(body)
    });
  }

  callGoogleLogin(body:any){
    this._accountService.googleLogin(body).subscribe({
      next:(resp:any)=>{
        if(resp?.success){
          this.getFitnessData();
          this.getNutritionData();
        }
      }
    })
  }

  onDateSelected(event: any) {
    this.selectedDate = event.value;
    this.getFitnessData();
    this.getNutritionData();
  }
}
