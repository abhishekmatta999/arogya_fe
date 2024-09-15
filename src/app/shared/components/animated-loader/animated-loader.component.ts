import { Component, NgZone, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";
import { LoaderService } from "../loader/services/loader.service";

@Component({
  selector: "fit-animated-loader",
  templateUrl: "./animated-loader.component.html",
  styleUrls: ["./animated-loader.component.scss"],
})
export class AnimatedLoaderComponent implements OnInit, OnDestroy {
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  private animatedImage = [
    "assets/images/loader-animation-2.gif",
    "assets/images/loader-animation-3.gif",
    "assets/images/loader-animation-1.gif",
    "assets/images/loader-animation-4.gif",
  ];

  selectedImage = this.animatedImage[0];
  private interval: any;

  constructor(private ngZone: NgZone, private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.changeImage();
  }

  changeImage() {
    let index = 0;
    this.interval = setInterval(() => {
      this.ngZone.run(() => {
        this.selectedImage = this.animatedImage[index++];
        if (index === this.animatedImage.length) {
          index = 0;
        }
      });
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
