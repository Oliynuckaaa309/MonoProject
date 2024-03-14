import { Component } from '@angular/core';
import {MainComponent} from './pages/main/main.component'
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActionComponent } from './pages/action/action/action.component';
 import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule } from '@angular/router';
import { FooterComponent } from './pages/footer/footer/footer.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ MainComponent, ReactiveFormsModule,
    RouterLink, RouterLinkActive, RouterOutlet, RouterModule, FooterComponent , CommonModule,
    HttpClientModule, HttpClientJsonpModule, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'mono-app';
}
