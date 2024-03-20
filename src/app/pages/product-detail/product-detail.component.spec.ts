import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ApiService } from '../../service/api.service';
import { OrderService } from '../../service/product-info/order.service';
import { CountPriceService } from '../../service/countPrice/count-price.service';
import { BasketService } from '../../service/basket/basket.service';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../shared/interfaces/product';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let mockActivatedRoute: any;
  let mockApiService: any;
  let mockOrderService: any;
  let mockCountPriceService: any;
  let mockBasketService: any;

  beforeEach(waitForAsync(() => {
    mockActivatedRoute = {
      paramMap: of({
        get: (key: string) => 'sample-product-path' // Provide a sample product path for testing
      })
    };

    mockApiService = jasmine.createSpyObj('ApiService', ['getOneProductByPath']);
    mockApiService.getOneProductByPath.and.returnValue(of([{
      category: {
        title: '',
        img: '',
        path: ''
      },
      count: 0,
      imagePath: "",
      price: 0,
      weight: "",
      id: '1', name: 'Sample Product', path: 'sample-product-path' }]));

    mockOrderService = jasmine.createSpyObj('OrderService', ['']);
    mockCountPriceService = jasmine.createSpyObj('CountPriceService', ['changeProductAmount']);
    mockBasketService = jasmine.createSpyObj('BasketService', ['basketAction']);

    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ApiService, useValue: mockApiService },
        { provide: OrderService, useValue: mockOrderService },
        { provide: CountPriceService, useValue: mockCountPriceService },
        { provide: BasketService, useValue: mockBasketService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch product details on initialization', () => {
    expect(component.productPath).toEqual('sample-product-path');
    expect(mockApiService.getOneProductByPath).toHaveBeenCalledWith('sample-product-path');
    expect(component.productDetails).toEqual({
      category: {
        title: '',
        img: '',
        path: ''
      },
      count: 0,
      imagePath: "",
      price: 0,
      weight: "",
      id: '1', name: 'Sample Product', path: 'sample-product-path' });
  });

  it('should call changeProductAmount method of CountPriceService when productCount is called', () => {
    const mockProduct: IProduct = {
      category: {
        title: '',
        img: '',
        path: ''
      },
      count: 0,
      imagePath: "",
      price: 0,
      weight: "",
      id: '1', name: 'Sample Product', path: 'sample-product-path' };
    component.productCount(mockProduct, true);
    expect(mockCountPriceService.changeProductAmount).toHaveBeenCalledWith(mockProduct, true);
  });

  it('should call basketAction method of BasketService when addToBasket is called', () => {
    const mockProduct: IProduct = {
      category: {
        title: '',
        img: '',
        path: ''
      },
      count: 0,
      imagePath: "",
      price: 0,
      weight: "",
      id: '1', name: 'Sample Product', path: 'sample-product-path' };
    component.addToBasket(mockProduct);
    expect(mockBasketService.basketAction).toHaveBeenCalledWith(mockProduct);
  });
});
