import {RouterModule, Routes, withPreloading} from '@angular/router';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AuthGuard } from './shared/guards/auth.guard';
import {NgModule} from "@angular/core";

export const routes: Routes = [
    { path: '',
      loadChildren:()=>import('./pages/home/home/home.module').then((m)=>m.HomeModule)},
    { path: 'discount',
      loadChildren:()=>import('./pages/action/action/action.module').then((m)=>m.ActionModule)
    },
    { path: 'product-category/roli',
      loadChildren:()=>import('./pages/roll/rolls/rolls.module').then((m)=>m.RollsModule) },
    { path: 'product-category/setu',
      loadChildren:()=>import('./pages/sets/sets/sets.module').then((m)=>m.SetsModule)
    },
    { path: 'product-category/beverage',
      loadChildren:()=>import('./pages/beverage/beverage/beverage.module').then((m)=>m.BeverageModule)
    },
    { path: 'product-category/souse',
      loadChildren:()=>import('./pages/souse/souse/souse.module').then((m)=>m.SouseModule)
    },
    { path: 'delivery',
      loadChildren:()=>import('./pages/delivery/delivery/delivery.module').then((m)=>m.DeliveryModule) },
    { path: 'product/:path',
      loadChildren:()=>import('./pages/product-detail/product-detail.module').then((m)=>m.ProductDetailModule)
    },
    { path: 'about-us',
      loadChildren:()=>import('./pages/aboutUs/about-us/about-us.module').then((m)=>m.AboutUsModule)
    },
    { path: 'auth',
    loadChildren:()=>import('./pages/authorization/authorization.module').then((m)=>m.AuthorizationModule)},
    { path: 'profile',
      loadChildren:()=>import('./pages/profile/profile.module').then((m)=>m.ProfileModule)},
     { path: 'admin-component',
       canActivate:[AuthGuard],
    loadChildren:()=>import('./admin/admin.module').then((m)=>m.AdminModule)},




];
@NgModule({
  imports:[RouterModule.forRoot(routes),],
  exports:[RouterModule],
})
export class AppRoutingModule{}
