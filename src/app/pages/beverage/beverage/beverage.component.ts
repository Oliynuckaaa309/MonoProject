import { Component } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { IProduct } from '../../../shared/interfaces/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule } from '@angular/router';
import { CountPriceService } from '../../../service/countPrice/count-price.service';
import { BasketService } from '../../../service/basket/basket.service';
@Component({
  selector: 'app-beverage',
  standalone: true,
  imports: [FormsModule , CommonModule, RouterLink, RouterLinkActive, RouterOutlet, RouterModule],
  templateUrl: './beverage.component.html',
  styleUrl: './beverage.component.sass'
})
export class BeverageComponent {
  public beverage:IProduct[]=[];
constructor(private data:ApiService, private countPrice:CountPriceService,
  private basketServise:BasketService){}
ngOnInit(){
  this.loadBeverage()
}
loadBeverage(){
  this.data.getProductsByCategory("Напої").subscribe((res)=>{
this.beverage=res;
console.log(this.beverage)
  })
}
productCount(product:IProduct, value:boolean){
  this.countPrice.changeProductAmount(product, value);
}
addToBasket(beverage:IProduct){
  this.basketServise.basketAction(beverage);

}
}
