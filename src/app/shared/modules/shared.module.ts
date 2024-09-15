import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "../components/button/button.component";
import { ImageComponent } from "../components/image/image.component";
import { ResultNotFoundComponent } from "../components/result-not-found/result-not-found.component";
import { SearchComponent } from "../components/search/search.component";
import { HeaderComponent } from "../components/header/header.component";
import { LoaderComponent } from "../components/loader/loader.component";
import { RouterModule } from "@angular/router";
import { TranlsateModule } from "src/pipes/translate/translate.module";
import { LazyImageModule } from "src/directives/lazy-image/lazy-image.module";
import { BreadCrumbComponent } from "../components/bread-crumb/bread-crumb.component";
import { AngularMaterialModule } from "./angular-material.module";
import { OutlineHeaderComponent } from "../components/outline-header/outline-header.component";
import { SwiperModule } from "swiper/angular";
import { ErrorDialogComponent } from "../components/error-dialog/error-dialog.component";
import { SuccessDialogComponent } from "../components/success-dialog/success-dialog.component";
import { AnimatedLoaderComponent } from "../components/animated-loader/animated-loader.component";
import { SkeletonModule } from "src/directives/skeleton/skeleton.module";

@NgModule({
  declarations: [
    ButtonComponent,
    ImageComponent,
    ResultNotFoundComponent,
    SearchComponent,
    HeaderComponent,
    OutlineHeaderComponent,
    LoaderComponent,
    BreadCrumbComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,
    AnimatedLoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranlsateModule,
    LazyImageModule,
    SwiperModule,
    AngularMaterialModule,
    SkeletonModule
  ],
  exports: [
    ButtonComponent,
    FormsModule,
    ImageComponent,
    ReactiveFormsModule,
    TranlsateModule,
    OutlineHeaderComponent,
    ResultNotFoundComponent,
    SearchComponent,
    AngularMaterialModule,
    HeaderComponent,
    LoaderComponent,
    BreadCrumbComponent,
    SwiperModule,
    AnimatedLoaderComponent
  ],
})
export class SharedModule {}
