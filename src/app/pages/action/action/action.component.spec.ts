import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionComponent } from './action.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { ApiService } from '../../../service/api.service';
import { actions } from '../../../shared/interfaces/actions';
import { RouterTestingModule } from "@angular/router/testing";


const discount = {
  id: 1,
  title:'title',
  image :'image',
  description:'description',
  main_title:'mainTitle',
  path: 'path'};
describe('ActionComponent', () => {
  let component: ActionComponent;
  let fixture: ComponentFixture<ActionComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getActions']);
    mockApiService.getActions.and.returnValue(of([discount]));

    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, RouterTestingModule],
      providers: [
        { provide: ApiService, useValue: mockApiService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch actions on initialization', () => {
    const mockActions: actions[] = [{
      id: 1,
      title:'title',
      image :'image',
      description:'description',
      main_title:'mainTitle',
      path: 'path'}];
    mockApiService.getActions.and.returnValue(of(mockActions));

    component.ngOnInit();

    expect(component.actionArray).toEqual(mockActions);
  });
});
