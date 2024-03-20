import { Component } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { IProduct } from '../../../shared/interfaces/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule } from '@angular/router';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Router } from 'express';
import { CountPriceService } from '../../../service/countPrice/count-price.service';
import { BasketService } from '../../../service/basket/basket.service';

@Component({
  selector: 'app-souse',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterLink, RouterLinkActive, RouterOutlet, RouterModule ],
  templateUrl: './souse.component.html',
  styleUrl: './souse.component.css'
})
export class SouseComponent {
  public souse:IProduct[]=[];
  constructor(private data:ApiService,  private countPrice:CountPriceService,
    private basketServise:BasketService){

  }
  ngOnInit(){
   this.loadSouse();
   }
  loadSouse(){
    console.error("load Souce!!")

    this.data.getProductsByCategory('Соуси').then((querySnapshot:any)=>{
      console.error(JSON.stringify(querySnapshot))
    this.souse = querySnapshot.docs.map((document: { data: any; }) => document.data());
        })
      }
      productCount(product:IProduct, value:boolean){
        this.countPrice.changeProductAmount(product, value);
      }
      addToBasket(souse:IProduct) {
        this.basketServise.basketAction(souse);
      }
  }


