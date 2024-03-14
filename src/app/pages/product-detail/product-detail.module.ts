import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductDetailComponent} from "./product-detail.component";
import {ProductDetailRouting} from "./product-detail-routing";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductDetailComponent,
    ProductDetailRouting
  ]
})
export class ProductDetailModule { }
