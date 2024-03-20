


import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { Role } from '../constant/constant';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user is admin', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ role: Role.admin }));
    const canActivate = guard.canActivate(null!, null!);
    expect(canActivate).toBe(true);
  });

  it('should navigate to root URL and return false if user is not admin', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ role: 'user' }));
    const navigateSpy = spyOn(router, 'navigateByUrl');
    const canActivate = guard.canActivate(null!, null!);
    expect(navigateSpy).toHaveBeenCalledWith('/');
    expect(canActivate).toBe(false);
  });

  it('should navigate to root URL and return false if user is not logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const navigateSpy = spyOn(router, 'navigateByUrl');
    const canActivate = guard.canActivate(null!, null!);
    expect(navigateSpy).toHaveBeenCalledWith('/');
    expect(canActivate).toBe(false);
  });
});

