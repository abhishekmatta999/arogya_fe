import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import SwiperCore, { Navigation, Autoplay, Swiper } from "swiper";

SwiperCore.use([Navigation, Autoplay]);

@Component({
  selector: "fit-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"],
})
export class SliderComponent implements OnInit {
  @ViewChild("swiperRef") swiperRef!: ElementRef;

  @Input() bannerText: string = "Stick with this and thrive in health!";
  @Input() banners!: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    new Swiper(this.swiperRef.nativeElement, {
      slidesPerView: 2.5,
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
}
