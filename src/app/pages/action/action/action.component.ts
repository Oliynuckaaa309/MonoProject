import { Component } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { actions } from '../../../shared/interfaces/actions';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-action',
  standalone: true,
  imports: [FormsModule,  CommonModule, RouterLink, RouterLinkActive, RouterOutlet, RouterModule],
  templateUrl: './action.component.html',
  styleUrl: './action.component.css'
})
export class ActionComponent {
  public actionArray:actions[]=[];
  constructor(public data:ApiService){}
  ngOnInit():void{
   this.getActions();
  }
  getActions(){
    this.data.getActions().subscribe(item=>{
    this.actionArray=item as actions[];
    })
  }}



