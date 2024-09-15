import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { SliderComponent } from 'src/app/shared/components/slider/slider.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';

const inrRoutes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class HomeModule { }
