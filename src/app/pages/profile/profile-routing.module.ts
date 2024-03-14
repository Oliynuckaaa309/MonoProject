import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "./profile.component";
import {CredentialComponent} from "../credential/credential/credential.component";
import {HistoryComponent} from "../historyOrder/history/history.component";
import {PasswordComponent} from "../password/password.component";

const routes:Routes=[
  { path: '',  component: ProfileComponent, children:[
      { path: 'info', component: CredentialComponent   },
      { path: 'history', component: HistoryComponent  },
      { path: 'password', component: PasswordComponent },
    ]  },
]
@NgModule({
  imports:[RouterModule.forChild(routes), ],
  exports:[RouterModule],
})
export class ProfileRoutingModule{}
