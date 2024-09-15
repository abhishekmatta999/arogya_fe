import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { authenticateUrl } from 'src/app/shared/constants/api-constants';
import { environment } from 'src/environments/environment';

import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AccountService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should perform login correctly", () => {
    let body = {
        email:'emai@gmail.com',
        password:'abc@123'
    }
    let response = null;
    const mockResponse = {
        status: '200'
      };
    service.login(body).subscribe((receivedResponse: any) => {
        response = receivedResponse;
        expect(mockResponse.status.toString()).toEqual('200');
    },(error: any) => {}
    );
    const req = httpTestingController.expectOne({
      method: "POST",
      url: `${environment.API_BASE_PATH}${authenticateUrl}`
    });
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush({
        token:'xyz',
        message:'login successfully'
    });
    httpTestingController.verify();
  });

  it("should perform reset password correctly", () => {
    let body = {
        email:'emai@gmail.com'
    }
    let response = null;
    const mockResponse = {status: '200'};
    service.forgotPassword(body).subscribe((receivedResponse: any) => {
        response = receivedResponse;
        expect(mockResponse.status.toString()).toEqual('200');
    },(error: any) => {}
    );
    const req = httpTestingController.expectOne({
      method: "POST",
      url: `${environment.API_BASE_PATH}`
    });
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush({
        token:'xyz',
        message:'link successfully'
    });
    httpTestingController.verify();
  });

});
