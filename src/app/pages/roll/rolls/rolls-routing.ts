import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RollsComponent} from "./rolls.component";


const routes:Routes=[
  { path: '',  component:RollsComponent },
]
@NgModule({
  imports:[RouterModule.forChild(routes), ],
  exports:[RouterModule],
})
export class RollsRouting{}
