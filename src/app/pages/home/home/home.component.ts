import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule } from '@angular/router';
import { RollsComponent } from '../../roll/rolls/rolls.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RollsComponent,RouterLink, RouterLinkActive, RouterOutlet, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

}
