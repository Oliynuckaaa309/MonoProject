import { Injectable } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CountPriceService {

  constructor() { }
  changeProductAmount(product:IProduct, increment:boolean){
    if(increment){
     product.count++;
    }
    else if(!increment && product.count>1){
     product.count--;
    }
     
 
   }
}
