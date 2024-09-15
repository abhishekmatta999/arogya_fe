import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ACCOUNT, HOME, LAYOUT } from 'src/app/shared/constants/routes-constant';

@Injectable({
  providedIn: 'root'
})
export class RegisterGuardGuard implements CanLoad {

  constructor(
    private _router :Router
  ){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userInfo = JSON.parse(<any>localStorage.getItem('userInfo'));
    const isProfileSaved = userInfo?.user?.profile_saved
    if (isProfileSaved==false) {
      return true;
    } else {
        let tree!: UrlTree ;
        if(userInfo) tree = this._router.parseUrl(LAYOUT)
        else tree = this._router.parseUrl(ACCOUNT);
        return tree;
    }
    }
}
