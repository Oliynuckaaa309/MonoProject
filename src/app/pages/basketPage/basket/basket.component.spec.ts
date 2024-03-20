import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BasketComponent } from './basket.component';
import { MatDialog } from '@angular/material/dialog';
import { CountPriceService } from '../../../service/countPrice/count-price.service';
import { BasketService } from '../../../service/basket/basket.service';
import { OrderService } from '../../../service/product-info/order.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../shared/interfaces/product';
import { BehaviorSubject } from 'rxjs';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockCountPriceService: jasmine.SpyObj<CountPriceService>;
  let mockBasketService: jasmine.SpyObj<BasketService>;
  let mockOrderService: jasmine.SpyObj<OrderService>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['closeAll']);
    mockCountPriceService = jasmine.createSpyObj('CountPriceService', ['changeProductAmount']);
    mockBasketService = jasmine.createSpyObj('BasketService', ['addToBasket']);
    mockOrderService = jasmine.createSpyObj('OrderService', ['changeBasket']);
    mockOrderService.changeBasket = new BehaviorSubject<boolean>(true);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, RouterTestingModule, BasketComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: CountPriceService, useValue: mockCountPriceService },
        { provide: BasketService, useValue: mockBasketService },
        { provide: OrderService, useValue: mockOrderService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog', () => {
    component.closeModal();
    expect(mockDialog.closeAll).toHaveBeenCalled();
  });


  // Add more tests for other component methods as needed
});

