import { Injectable } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product';
import {OrderService} from '../product-info/order.service'

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  constructor(private order: OrderService) { }
  basketAction(product:IProduct){
    console.log(product)
    let basket: Array<IProduct> = [];

    if (localStorage.getItem("basket")) {
      console.log("basketExists")

      basket = JSON.parse(localStorage.getItem("basket") as string)
      if (basket.some(prod => prod.id === product.id)) {
        console.log("product exists in bucket")

        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count = product.count;
      }
       else {
        console.log("add new product")

        basket.push(product);
       }
    }
     else {
      console.log("no bucket in storage")

      basket.push(product);
     }
    console.log("setting basket in local storage: " + JSON.stringify(basket))
    localStorage.setItem('basket', JSON.stringify(basket))
      product.count = 1;
     this.order.changeBasket.next(true);
  }
  addToBasket(product:IProduct){
    let basket: Array<IProduct> = [];

    if (localStorage.length > 0 && localStorage.getItem("basket")) {
      basket = JSON.parse(localStorage.getItem("basket") as string)
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count = product.count;
      }}
      localStorage.setItem('basket', JSON.stringify(basket));
      this.order.changeBasket.next(true);

  }
}
