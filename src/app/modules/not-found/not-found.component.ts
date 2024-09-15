import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GO_TO_HOME_CONFIG } from 'src/app/shared/constants/button-config-constant';
import { HOME, LAYOUT } from 'src/app/shared/constants/routes-constant';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  notFoundConfig = GO_TO_HOME_CONFIG;
  constructor(
    private _router: Router
  ) { }

  routeToHome(){
    this._router.navigate([`${LAYOUT}/${HOME}`])
  }

}
