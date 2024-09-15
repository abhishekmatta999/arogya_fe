import { Injectable } from '@angular/core';
import { CanLoad, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { LAYOUT } from 'src/app/shared/constants/routes-constant';
import { CommonService } from 'src/services/common/common.service';


@Injectable({
  providedIn: 'root'
})
export class LogInGuard implements CanLoad {

  constructor(
    private _router: Router,
    private _commonService: CommonService,
    private _actRoute: ActivatedRoute
  ) { }

  canLoad():any {
    if (localStorage.getItem('userInfo')) {
      const tree: UrlTree = this._router.parseUrl(LAYOUT);
      return tree;
    } else {
      return true;
    }
  }

}
