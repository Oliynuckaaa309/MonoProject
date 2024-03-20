import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import {Firestore} from "@angular/fire/firestore";

xdescribe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let firestoreStub: Partial<AngularFirestore>;

  beforeEach(() => {
    firestoreStub = {
      // @ts-ignore
      collection: () => ({
        add: () => of({}),
        doc: () => ({
          update: () => of({}),
          delete: () => of({})
        })
      })
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        { provide: Firestore, useValue: firestoreStub }
      ]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get actions', () => {
    const dummyActions = [{ id: '1', name: 'Action 1' }];
    service.getActions().subscribe(actions => {
      expect(actions).toEqual(dummyActions);
    });
    const req = httpMock.expectOne('/actions');
    expect(req.request.method).toBe('GET');
    req.flush(dummyActions);
  });

  // Add more tests for other methods like createActions, editAction, deleteAction, etc.
});
