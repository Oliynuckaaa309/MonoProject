import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../../service/api.service';
import { ImageService } from '../../service/image/image.service';
import { of } from 'rxjs';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let mockApiService: any;
  let mockImageService: any;

  beforeEach(waitForAsync(() => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getFireBaseCategory', 'deleteCategory', 'createFireBaseCategory', 'editCategory']);
    mockApiService.getFireBaseCategory.and.returnValue(of([]));
    mockApiService.deleteCategory.and.returnValue(Promise.resolve());
    mockApiService.createFireBaseCategory.and.returnValue(Promise.resolve());
    mockApiService.editCategory.and.returnValue(Promise.resolve());

    mockImageService = jasmine.createSpyObj('ImageService', ['uploadFile']);

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterTestingModule],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: ImageService, useValue: mockImageService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize categoryForm with correct initial values', () => {
    fixture.detectChanges();
    expect(component.categoryForm).toBeDefined();
    expect(component.categoryForm.get('title')).toBeTruthy();
    expect(component.categoryForm.get('path')).toBeTruthy();
    expect(component.categoryForm.get('img')).toBeTruthy();
  });

  it('should call getCategories on ngOnInit', () => {
    spyOn(component, 'getCategories');
    component.ngOnInit();
    expect(component.getCategories).toHaveBeenCalled();
  });

  it('should call getFireBaseCategory and populate categoryForAdmin on getCategories', () => {
    const mockCategories = [{ id: '1', title: 'Category 1', path: '/category1', img: 'category1.jpg' }];
    mockApiService.getFireBaseCategory.and.returnValue(of(mockCategories));

    component.getCategories();
    expect(component.categoryForAdmin).toEqual(mockCategories);
  });

  it('should call deleteCategory method when deleteItem is called', async () => {
    const mockCategoryId = '1';
    await component.deleteItem(mockCategoryId);
    expect(mockApiService.deleteCategory).toHaveBeenCalledWith(mockCategoryId);
  });
});
