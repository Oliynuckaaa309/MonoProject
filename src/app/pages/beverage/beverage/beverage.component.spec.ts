import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { BeverageComponent } from './beverage.component';
import { ApiService } from '../../../service/api.service';
import { IProduct } from '../../../shared/interfaces/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule } from '@angular/router';
import { CountPriceService } from '../../../service/countPrice/count-price.service';
import { BasketService } from '../../../service/basket/basket.service';

describe('BeverageComponent', () => {
  let component: BeverageComponent;
  let fixture: ComponentFixture<BeverageComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockCountPriceService: jasmine.SpyObj<CountPriceService>;
  let mockBasketService: jasmine.SpyObj<BasketService>;

  beforeEach(async () => {
    // Створення мокованих об'єктів сервісів
    mockApiService = jasmine.createSpyObj('ApiService', ['getProductsByCategory']);
    mockCountPriceService = jasmine.createSpyObj('CountPriceService', ['changeProductAmount']);
    mockBasketService = jasmine.createSpyObj('BasketService', ['basketAction']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [BeverageComponent, FormsModule, CommonModule, RouterLink, RouterLinkActive, RouterOutlet, RouterModule],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: CountPriceService, useValue: mockCountPriceService },
        { provide: BasketService, useValue: mockBasketService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeverageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load beverages from ApiService on initialization', () => {
    // Arrange
    const mockBeverages: IProduct[] = [

    ];
    mockApiService.getProductsByCategory.and.returnValue(new Promise(() => mockBeverages));

    // Act
    component.ngOnInit();

    // Assert
    expect(mockApiService.getProductsByCategory).toHaveBeenCalledWith('Напої');
    expect(component.beverage).toEqual(mockBeverages);
  });


});
