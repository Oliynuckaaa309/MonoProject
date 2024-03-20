import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../service/product-info/order.service';
import { CountPriceService } from '../../service/countPrice/count-price.service';
import { BasketService } from '../../service/basket/basket.service';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  public productPath!: string;
  public productDetails!: IProduct;
  constructor(
    private route: ActivatedRoute,
    private data: ApiService,
    private countPrice: CountPriceService,
    private basketServise:BasketService,
    public order:OrderService
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.productPath = param.get('path') as string;
      this.data.getOneProductByPath(this.productPath).then(
        (res) => {
          this.productDetails = res.docs[0].data() as IProduct;
        }
      )
    })
  }
  productCount(product: IProduct, value: boolean) {
    this.countPrice.changeProductAmount(product, value);
  }
  addToBasket(product: IProduct) {
   this.basketServise.basketAction(product);
   }
}
