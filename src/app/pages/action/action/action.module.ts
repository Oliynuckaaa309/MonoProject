import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActionRouting} from "./action-routing";
import {ActionComponent} from "./action.component";
import {ActionDetailComponent} from './action-detail/action-detail.component'
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ActionRouting,
    ActionComponent,
    ActionDetailComponent
  ]
})
export class ActionModule { }
