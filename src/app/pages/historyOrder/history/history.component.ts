import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, RouterModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

}
