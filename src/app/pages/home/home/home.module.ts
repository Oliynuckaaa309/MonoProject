import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {HomeRouting} from "./home-routing";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeComponent,
    HomeRouting
  ]
})
export class HomeModule { }
