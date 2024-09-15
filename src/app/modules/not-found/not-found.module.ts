import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/modules/shared.module';

const inrRoutes: Routes = [
  { path: '', component: NotFoundComponent },
];

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class NotFoundModule { }
