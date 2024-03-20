import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // Import RouterModule to resolve RouterLink and RouterOutlet
import { RollsComponent } from '../../roll/rolls/rolls.component';
import {Component} from "@angular/core";
import {ApiService} from "../../../service/api.service";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockApiService: any;


  beforeEach(waitForAsync(() => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getProductsByCategory']);
    mockApiService.getProductsByCategory.and.returnValue(new Promise(() => []));
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientModule,
        RouterModule
      ], providers: [ { provide: ApiService, useValue: mockApiService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
