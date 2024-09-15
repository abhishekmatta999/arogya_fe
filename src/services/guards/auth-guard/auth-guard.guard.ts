import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ACCOUNT, FORGOT_PASSWORD, HOME, LOGIN, REGISTER } from 'src/app/shared/constants/routes-constant';
import { CommonService } from '../../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate ,CanLoad{
  constructor(
    private _router: Router,
    private _commonService: CommonService
  ) { }

  canActivate(): Observable<any> | Promise<any> | any {
   return this.handler()
  }

  canLoad(route: Route, segments: UrlSegment[]):any {
    return this.handler();
  }

  handler(){
    const userInfo = JSON.parse(<any>localStorage.getItem('userInfo'));
    const isProfileSaved = userInfo?.user?.profile_saved
    if (userInfo) {
      if(isProfileSaved==false) return this._router.parseUrl(REGISTER);
      else return true
    } else {
      return this._router.parseUrl(ACCOUNT);
    }
  }

}
