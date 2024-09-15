import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layoutService/layout.service';

@Component({
  selector: 'fit-meal-tracking',
  templateUrl: './weakly-meal.component.html',
  styleUrls: ['./weakly-meal.component.scss']
})
export class WeaklyMealComponent implements OnInit {

  mealPlan:any;

  constructor(
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    this.fetchPlan();
  }

  fetchPlan(){
    this.layoutService.getWeeklyPlan().subscribe({
      next:(resp:any)=>{
        if(resp.success){
          this.mealPlan = resp?.data;
        }
      }
    })
  }

}
