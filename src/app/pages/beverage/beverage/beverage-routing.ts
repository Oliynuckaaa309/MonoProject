import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BeverageComponent} from "./beverage.component";
const routes:Routes=[
  { path: '',  component:BeverageComponent },
]
@NgModule({
  imports:[RouterModule.forChild(routes), ],
  exports:[RouterModule],
})
export class BeverageRouting{}
