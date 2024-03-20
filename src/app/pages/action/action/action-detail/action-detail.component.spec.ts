import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ActionDetailComponent } from './action-detail.component';
import { ApiService } from '../../../../service/api.service';
import { actions } from '../../../../shared/interfaces/actions';

describe('ActionDetailComponent', () => {
  let component: ActionDetailComponent;
  let fixture: ComponentFixture<ActionDetailComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ApiService', ['getOneActiontByPath']);
    await TestBed.configureTestingModule({
      declarations: [  ],
      imports:[ActionDetailComponent],
      providers: [
        { provide: ApiService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (param: string) => 'example-path'
            } as ParamMap)
          }
        },
      ]
    })
      .compileComponents();
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add your other tests here...
});
