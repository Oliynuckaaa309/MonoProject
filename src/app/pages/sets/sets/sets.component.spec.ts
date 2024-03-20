import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { SetsComponent } from './sets.component';
import { ApiService } from '../../../service/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { CountPriceService } from '../../../service/countPrice/count-price.service';
import { BasketService } from '../../../service/basket/basket.service';
import { of } from 'rxjs';
import { IProduct } from '../../../shared/interfaces/product';

describe('SetsComponent', () => {
  let component: SetsComponent;
  let fixture: ComponentFixture<SetsComponent>;
  let mockApiService: any;
  let mockCountPriceService: any;
  let mockBasketService: any;

  beforeEach(waitForAsync(() => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getProductsByCategory']);
    mockCountPriceService = jasmine.createSpyObj('CountPriceService', ['changeProductAmount']);
    mockBasketService = jasmine.createSpyObj('BasketService', ['basketAction']);

    TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, RouterTestingModule],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: CountPriceService, useValue: mockCountPriceService },
        { provide: BasketService, useValue: mockBasketService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetsComponent);
    component = fixture.componentInstance;
    mockApiService.getProductsByCategory.and.returnValue(Promise.resolve({
      docs: [{ data: () => ({ id: '1', name: 'Set 1', price: 20 }) }]
    }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load setu on initialization', async () => {
    await fixture.whenStable();
    expect(component.setu.length).toBeGreaterThan(0);
  });

  it('should call changeProductAmount method when productCount is called', () => {
    const mockProduct: IProduct = {
      category: {
        title: '',
        img: '',
        path: ''
      },
      count: 0,
      imagePath: "",
      path: "",
      weight: "",
      id: '1', name: 'Set 1', price: 20 };
    component.productCount(mockProduct, true);
    expect(mockCountPriceService.changeProductAmount).toHaveBeenCalledWith(mockProduct, true);
  });

  it('should call basketAction method when addToBasket is called', () => {
    const mockSetu: IProduct = {
      category: {
        title: '',
        img: '',
        path: ''
      },
      count: 0,
      imagePath: "",
      path: "",
      weight: "",
      id: '1', name: 'Set 1', price: 20 };
    component.addToBasket(mockSetu);
    expect(mockBasketService.basketAction).toHaveBeenCalledWith(mockSetu);
  });
});
