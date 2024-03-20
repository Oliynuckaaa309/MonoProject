import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductsComponent} from './products.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {RouterTestingModule} from '@angular/router/testing';
import {ApiService} from '../../service/api.service';
import {Storage} from '@angular/fire/storage';
import {ImageService} from '../../service/image/image.service';
import {Observable, of} from 'rxjs';
import {category} from "../../shared/interfaces/category";
import {IProduct} from '../../shared/interfaces/product';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockStorage: jasmine.SpyObj<Storage>;
  let mockImageService: jasmine.SpyObj<ImageService>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getFireBaseCategory', 'getProducts', 'createProduct', 'updateProduct', 'deleteProduct']);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockStorage = jasmine.createSpyObj('Storage', ['ref']);
    mockImageService = jasmine.createSpyObj('ImageService', ['uploadFile']);
    mockApiService.getFireBaseCategory.and.returnValue(of([{
      id: "1",
      title: "title",
      img: "title",
      path: "title"
    }]));
    mockApiService.getProducts.and.returnValue(of([{
      id: 'sampleId',
      category: {
        id: "1",
        title: "title",
        img: "title",
        path: "title"
      },
      name: 'Sample Product',
      path: '/sample-path',
      description: 'Sample description',
      weight: '10 kg',
      price: 100,
      imagePath: '/sample-image-path',
      img: 'sample-image-url',
      count: 5
    }]));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        {provide: ApiService, useValue: mockApiService},
        {provide: MatDialog, useValue: mockMatDialog},
        {provide: Storage, useValue: mockStorage},
        {provide: ImageService, useValue: mockImageService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on construction', () => {
    expect(component.productForm).toBeDefined();
  });

  it('should load categories and products on initialization', () => {
    const mockCategories: category[] = [{title: 'Category 1', img: 'category1.jpg', path: 'category1'}];
    // const mockProducts: IProduct[] = [{ id: '', name: 'Product 1', category: {title:'', img:'', path:'frgvr'}, path: 'product1.jpg', description: 'Description 1', weight: '1kg', price: 10, img: 'product1.jpg', count: 1 }];
    // @ts-ignore
    mockApiService.getFireBaseCategory.and.returnValue(of(mockCategories));
    // @ts-ignore
    //mockApiService.getProducts.and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(component.adminCategory).toEqual(mockCategories);
    //expect(component.adminProducts).toEqual(mockProducts);
  });

  afterEach(() => {
    localStorage.removeItem('basket');
  });
});
