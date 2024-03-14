import { Component } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { IProduct } from '../../../shared/interfaces/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule } from '@angular/router';
import { CountPriceService } from '../../../service/countPrice/count-price.service';
import { BasketService } from '../../../service/basket/basket.service';
@Component({
  selector: 'app-sets',
  standalone: true,
  imports: [ FormsModule, CommonModule, RouterLink, RouterLinkActive, RouterOutlet, RouterModule ],
  templateUrl: './sets.component.html',
  styleUrl: './sets.component.sass'
})
export class SetsComponent {
  public setu:IProduct[]=[];
  constructor(private data:ApiService, private countPrice:CountPriceService,private basketServise:BasketService){}
  ngOnInit(){
this.loadSetu();

  }
  loadSetu(){
    this.data.getProductsByCategory('Сети').subscribe((data)=>[
      this.setu=data
    ])
  }
  productCount(product:IProduct, value:boolean){
    this.countPrice.changeProductAmount(product, value);
  }
  addToBasket(setu:IProduct) {
    this.basketServise.basketAction(setu);

  }
}
