import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { ProfileDetailsComponent } from '../accounts/components/profile-details/profile-details.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { WorkoutComponentComponent } from './workout-component/workout-component.component';


@NgModule({
  declarations: [
    MainComponent,
    RecipeDetailsComponent,
    ProfileDetailsComponent,
    WorkoutComponentComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
