import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeaklyMealComponent } from './weakly-meal.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/modules/shared.module';

export const routes = [
  {path:'',component:WeaklyMealComponent}
]

@NgModule({
  declarations: [
    WeaklyMealComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class WeaklyMealModule { }
