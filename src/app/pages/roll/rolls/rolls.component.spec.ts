import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { RollsComponent } from './rolls.component';
import { ApiService } from '../../../service/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { CountPriceService } from '../../../service/countPrice/count-price.service';
import { BasketService } from '../../../service/basket/basket.service';
import { of } from 'rxjs';
import { IProduct } from '../../../shared/interfaces/product';

describe('RollsComponent', () => {
  let component: RollsComponent;
  let fixture: ComponentFixture<RollsComponent>;
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
    fixture = TestBed.createComponent(RollsComponent);
    component = fixture.componentInstance;
    mockApiService.getProductsByCategory.and.returnValue(Promise.resolve({
      docs: [{ data: () => ({ id: '1', name: 'Roll 1', price: 15 }) }]
    }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load rolls on initialization', async () => {
    await fixture.whenStable();
    expect(component.rolls.length).toBeGreaterThan(0);
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
      id: '1', name: 'Roll 1', price: 15 };
    component.productCount(mockProduct, true);
    expect(mockCountPriceService.changeProductAmount).toHaveBeenCalledWith(mockProduct, true);
  });

  it('should call basketAction method when addToBasket is called', () => {
    const mockRolls: IProduct = {
      category: {
        title: '',
        img: '',
        path: ''
      },
      count: 0,
      imagePath: "",
      path: "",
      weight: "",
      id: '1', name: 'Roll 1', price: 15 };
    component.addToBasket(mockRolls);
    expect(mockBasketService.basketAction).toHaveBeenCalledWith(mockRolls);
  });
});
