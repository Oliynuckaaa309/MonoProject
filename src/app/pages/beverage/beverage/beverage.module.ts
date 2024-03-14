import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BeverageComponent} from "./beverage.component";
import {BeverageRouting} from "./beverage-routing";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BeverageComponent,
    BeverageRouting
  ]
})
export class BeverageModule { }
