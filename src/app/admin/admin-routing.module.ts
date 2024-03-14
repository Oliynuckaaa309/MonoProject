import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin/admin.component";
import {ActionsComponent} from "./actions/actions.component";
import {CategoryComponent} from "./category/category.component";
import {ProductsComponent} from "./products/products.component";
const routes:Routes=[
  {path:'', component:AdminComponent, children:[
  {path: 'actions-admin', component: ActionsComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'products', component: ProductsComponent}
]
  }
]
@NgModule({
  imports:[RouterModule.forChild(routes), ],
  exports:[RouterModule],
})
export class AdminRoutingModule{}
