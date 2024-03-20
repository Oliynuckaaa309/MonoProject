import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActionsComponent } from './actions.component';
import { ApiService } from '../../service/api.service';
import { ImageService } from '../../service/image/image.service';
import { of } from 'rxjs';
import { Storage } from '@angular/fire/storage';


describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockImageService: jasmine.SpyObj<ImageService>;
  let mockStorage: jasmine.SpyObj<Storage>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getActions', 'deleteAction', 'editAction', 'createActions']);
    mockStorage = jasmine.createSpyObj('Storage', ['ref']);
    mockApiService.getActions.and.returnValue(of([]));
    mockApiService.deleteAction.and.returnValue(Promise.resolve());
    mockApiService.editAction.and.returnValue(Promise.resolve());
    mockApiService.createActions.and.returnValue(new Promise( () => [{
      id: 1,
      title:'title',
      image :'image',
      description:'description',
      main_title:'mainTitle',
      path: 'path'}]));

    mockImageService = jasmine.createSpyObj('ImageService', ['uploadFile']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: ImageService, useValue: mockImageService },
        { provide: Storage, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize actionForm with correct initial values', () => {
    fixture.detectChanges();
    expect(component.actionForm).toBeDefined();
    expect(component.actionForm.get('title')).toBeTruthy();
    expect(component.actionForm.get('main_title')).toBeTruthy();
    expect(component.actionForm.get('description')).toBeTruthy();
    expect(component.actionForm.get('path')).toBeTruthy();
    expect(component.actionForm.get('image')).toBeTruthy();
  });

  it('should call getActionsForAdmin on ngOnInit', () => {
    spyOn(component, 'getActionsForAdmin');
    component.ngOnInit();
    expect(component.getActionsForAdmin).toHaveBeenCalled();
  });

  it('should call getActions and populate actionsAdmin on getActionsForAdmin', () => {
    const mockActions = [{
      id: 1,
      title:'title',
      image :'image',
      description:'description',
      main_title:'mainTitle',
      path: 'path'}];
    mockApiService.getActions.and.returnValue(of(mockActions));

    component.getActionsForAdmin();
    expect(component.actionsAdmin).toEqual(mockActions);
  });
});
