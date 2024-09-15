import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealTrackingComponent } from './meal-tracking.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/modules/shared.module';

export const routes = [
  {path:'',component:MealTrackingComponent}
]

@NgModule({
  declarations: [
    MealTrackingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class MealTrackingModule { }
