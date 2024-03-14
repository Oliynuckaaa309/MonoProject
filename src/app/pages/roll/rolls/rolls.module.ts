import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RollsRouting} from "./rolls-routing";
import {RollsComponent} from "./rolls.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RollsRouting,
    RollsComponent
  ]
})
export class RollsModule { }
