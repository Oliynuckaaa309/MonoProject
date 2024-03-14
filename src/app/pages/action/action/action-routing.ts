import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ActionComponent} from "./action.component";
import {ActionDetailComponent} from "./action-detail/action-detail.component";




const routes:Routes=[
  { path: '',  component: ActionComponent  },
  {path:':path', component:ActionDetailComponent},

]
@NgModule({
  imports:[RouterModule.forChild(routes), ],
  exports:[RouterModule],
})
export class ActionRouting{}
