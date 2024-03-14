import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SouseComponent} from "./souse.component";



const routes:Routes=[
  { path: '',  component:SouseComponent },
]
@NgModule({
  imports:[RouterModule.forChild(routes), ],
  exports:[RouterModule],
})
export class SouseRouting{}
