import { Injectable } from '@angular/core';
import { CommonService } from '../../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _commonService: CommonService 
  ) { }

  authorization(): any {
    const userInfo:any = JSON.parse(<any>localStorage.getItem('userInfo'));
    let auth: any = {
      'Access-Control-Allow-Origin': '*',
    }

    if(userInfo && userInfo?.access_token){
      auth['Authorization'] = `Bearer ${userInfo?.access_token}`;
    }
    return auth;
  }

}
