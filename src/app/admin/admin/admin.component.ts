import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule, Router } from '@angular/router';
import { AccountService } from '../../service/account/account.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(public router:Router, public account:AccountService) {}

  logOut():void{
    this.router.navigate(['']);
    localStorage.removeItem('currentUser');
    this.account.isUserLogin.next(false);
  }

}
