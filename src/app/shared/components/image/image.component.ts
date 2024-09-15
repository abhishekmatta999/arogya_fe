import { Component, Input } from "@angular/core";

@Component({
  selector: "fit-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.scss"],
})
export class ImageComponent {
  @Input() alt!: string;
  @Input() imgCls!: string;
  @Input() src!: string;
  @Input() width: string = "auto";
  @Input() height: string = "auto";
}
