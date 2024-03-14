import { Component } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { IProduct } from '../../../shared/interfaces/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule } from '@angular/router';
import { CountPriceService } from '../../../service/countPrice/count-price.service';
import { BasketService } from '../../../service/basket/basket.service';
@Component({
  selector: 'app-rolls',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterLink, RouterLinkActive, RouterOutlet, RouterModule],
  templateUrl: './rolls.component.html',
  styleUrl: './rolls.component.sass'
})
export class RollsComponent {
  public rolls:IProduct[] = [];
  constructor(public data:ApiService,
    private countPrice:CountPriceService, private basketServise:BasketService) {}
  ngOnInit(){
this.loadRolls();
  }
  loadRolls(){
    this.data.getProductsByCategory('Роли').subscribe((data)=>{
this.rolls=data
    })
  }
productCount(product:IProduct, value:boolean){
  this.countPrice.changeProductAmount(product, value);
}
addToBasket(rolls:IProduct){
  this.basketServise.basketAction(rolls);

}
}
