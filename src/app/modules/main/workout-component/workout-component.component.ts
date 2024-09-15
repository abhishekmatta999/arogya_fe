import { Component, OnInit } from "@angular/core";
import { LayoutService } from "../layoutService/layout.service";

@Component({
  selector: "fit-workout-component",
  templateUrl: "./workout-component.component.html",
  styleUrls: ["./workout-component.component.scss"],
})
export class WorkoutComponentComponent implements OnInit {
  constructor(private layoutService: LayoutService) {}
  workoutPlan: any = [];
  activeDay: number | null = null;
  ngOnInit(): void {
    const data = localStorage.getItem("workout");
    if (!data) {
      this.getApidata();
    } else {
      this.workoutPlan = JSON.parse(data);
    }
  }

  getApidata() {
    this.layoutService.generateWorkout().subscribe((res) => {
      if (res.success) {
        this.workoutPlan = res.data;
        localStorage.setItem("workout", JSON.stringify(this.workoutPlan));
      }
    });
  }

 
}
