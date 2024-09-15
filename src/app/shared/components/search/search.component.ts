import { Component, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "fit-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  @Input() cls: string = "";
  @Input() isReset: boolean = true;
  @Input() placeholder: string = "Search Food Item";

  @Output() filter = new EventEmitter();

  searchKey = "";

  ngOnChanges(changes: any): void {
    if (!changes?.isReset?.previousValue) {
      this.searchKey = "";
    }
  }

  searchOnChange(event: any) {
    this.filter.emit(event.target.value);
  }
}
