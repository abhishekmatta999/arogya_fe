import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyIamgeDirective } from './lazy-iamge.directive';



@NgModule({
  declarations: [
    LazyIamgeDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LazyIamgeDirective
  ]
})
export class LazyImageModule { }
