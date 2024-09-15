import { TestBed } from '@angular/core/testing';
import { CommonService } from 'src/services/common/common.service';

import { AuthGuard } from './auth-guard.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let commonService: CommonService
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers:[
            AuthGuard
        ]
    });
    guard = TestBed.inject(AuthGuard);
    commonService = TestBed.inject(CommonService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });


  it('should not be able to activate when logged out', () => {
    const commonServiceSpy = spyOn(commonService,'getAccessToken').and.returnValue(null);
    guard.canActivate();
    guard.handler();
    expect(commonServiceSpy).toHaveBeenCalledWith('user');
  });

  it('should be able to activate when logged in', () => {
    const commonServiceSpy = spyOn(commonService,'getAccessToken').and.returnValue(true)
    const res = guard.canActivate();
    guard.handler();
    expect(commonServiceSpy).toHaveBeenCalledWith('user');
    expect(res).toBeTruthy();
  });

  it('should not be able to load when logged out', () => {
    const commonServiceSpy = spyOn(commonService,'getAccessToken').and.returnValue(false);
    guard.canLoad({},[]);
    guard.handler();
    expect(commonServiceSpy).toHaveBeenCalledWith('user');
  });

  it('should be able to load when logged in', () => {
    const commonServiceSpy = spyOn(commonService,'getAccessToken').and.returnValue(true);
    const result = guard.canLoad({},[]);
    guard.handler();
    expect(commonServiceSpy).toHaveBeenCalledWith('user');
    expect(result).toBeTruthy();
  });

});
