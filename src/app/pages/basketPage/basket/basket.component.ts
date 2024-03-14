import { Component } from '@angular/core';
 import { IProduct } from '../../../shared/interfaces/product';
 import { CommonModule } from '@angular/common';
import { CountPriceService } from '../../../service/countPrice/count-price.service';
import { BasketService } from '../../../service/basket/basket.service';
import {OrderService} from '../../../service/product-info/order.service';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule, Router } from '@angular/router';
 import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, RouterModule ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.sass'
})
export class BasketComponent {
  public basketJson:string | null =localStorage.getItem("basket");
  public basket:IProduct[]=[];
  public index!:number;
  public basket3: Array<IProduct> = [];
  public  countAll=0;
  constructor( public count:CountPriceService,
    public basketService:BasketService,
    public order: OrderService,
    public dialog: MatDialog) {}
  ngOnInit(){
    if(this.basketJson){
      this.basket=JSON.parse(this.basketJson)
    }
    this.countAll= this.getTotalPrice()
    this.order.changeBasket.subscribe((value)=>{
      this.countAll= this.getTotalPrice()
    })
  }

  deleteItem(id:any){
    this.index=id;
    const indexToRemove=this.basket.findIndex(item => item.id===id);
    const goods:any= JSON.parse(localStorage.getItem("basket") as string);
    goods.splice(indexToRemove,1);

    this.basket.splice(id, 1);
    localStorage.setItem('basket', JSON.stringify(goods));
    this.order.changeBasket.next(true);


  }

  productCount(product:IProduct, isAdd:boolean):void{
    this.count.changeProductAmount(product, isAdd);
    this.basketService.addToBasket(product);
    this.order.changeBasket.next(true);
  }
  getTotalPrice(): number {
    return this.basket.reduce((total: number, prod: IProduct) => {
      return total + (prod.count * prod.price);
    }, 0);



  }
  closeModal(){
    this.dialog.closeAll();
  }
}
