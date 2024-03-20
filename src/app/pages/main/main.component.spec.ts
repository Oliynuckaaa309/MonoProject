import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../../service/api.service';
import { OrderService } from '../../service/product-info/order.service';
import { AccountService } from '../../service/account/account.service';
import {of, Subject} from "rxjs";
import {category} from "../../shared/interfaces/category";

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockOrderService: jasmine.SpyObj<OrderService>;
  let mockAccountService: jasmine.SpyObj<AccountService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getFireBaseCategory']);
    mockOrderService = jasmine.createSpyObj('OrderService', ['changeBasket']);
    mockAccountService = jasmine.createSpyObj('AccountService', ['isUserLogin']);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    mockApiService.getFireBaseCategory.and.returnValue(of([{id: "id", image: "image", title: "title", path: "path"}]));
    mockOrderService.changeBasket = new Subject<boolean>()
    mockAccountService.isUserLogin = new Subject<boolean>()

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: OrderService, useValue: mockOrderService },
        { provide: AccountService, useValue: mockAccountService },
        { provide: MatDialog, useValue: mockMatDialog }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    expect(component.useForm).toBeDefined();
  });

  it('should load basket from localStorage', () => {
    const mockBasket: any = [{ id: 1, name: 'Product 1', count: 2, price: 10 }];
    localStorage.setItem('basket', JSON.stringify(mockBasket));
    component.loadBasket();
    expect(component.basket).toEqual(mockBasket);
  });

  afterEach(() => {
    localStorage.removeItem('basket');
  });
});
