import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "fit-outline-header",
  templateUrl: "./outline-header.component.html",
  styleUrls: ["./outline-header.component.scss"],
})
export class OutlineHeaderComponent implements OnInit {
  @Input() headerText!: string;
  @Input() margin!: any;
  @Input() border!: any;
  @Input() class!: any;
  constructor() {}

  ngOnInit(): void {}

  getHeaderHtml(headerText: string) {
    const words = headerText?.split(" ");
    const length = words.length;
    let firstHalfOfHeading = "";
    words.slice(0, length / 2).forEach((ele) => {
      firstHalfOfHeading = firstHalfOfHeading + (ele + " ");
    });
    let secondHalfOfHeader = "";
    words.slice(length / 2, length).forEach((ele) => {
      secondHalfOfHeader = secondHalfOfHeader + (ele + " ");
    });
    return `${firstHalfOfHeading} <span class = "primary-text">${secondHalfOfHeader}</span>`;
  }
}
