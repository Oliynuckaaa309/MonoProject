
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AccountService } from './account.service';
import { Ilogin } from '../../shared/interfaces/account';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountService]
    });
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user data when login is successful', () => {
    const mockLoginData: Ilogin = {
      email: 'test@example.com',
      password: 'password123'
    };
    const mockUserData = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'user'
    };

    service.login(mockLoginData).subscribe(userData => {
      expect(userData).toEqual(mockUserData);
    });

    const req = httpMock.expectOne(`${service.api.users}?email=${mockLoginData.email}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserData);
  });
});
