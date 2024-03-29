import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "./admin/admin.component";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [],
  imports: [
    AdminComponent,
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
