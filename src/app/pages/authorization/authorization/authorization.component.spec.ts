import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationComponent } from './authorization.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Storage} from "@angular/fire/storage";
import {AuthGuard} from "@angular/fire/auth-guard";
import {Auth} from "@angular/fire/auth";
import {Firestore} from "@angular/fire/firestore";

describe('AuthorizationComponent', () => {
  let component: AuthorizationComponent;
  let fixture: ComponentFixture<AuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorizationComponent, HttpClientTestingModule],
      providers: [
        { provide: Auth, useClass: MockStorage },
        { provide: Firestore, useClass: FireStorage },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
class MockStorage {}
class FireStorage {}
