import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ForgettenPasswordDataService {
  private url: string = environment.url + 'mail/';
  private passURL: string = environment.url + 'password/';
  constructor(private _http: HttpClient) {
  }
  sendMail(item,subject, message) {

    let obj = { "name": item, "subject": subject, "message":"Your Password for WonderBooksnStationers Account is:"+ message };
    let body = JSON.stringify(obj);
    return this._http.post(this.url, body, { headers:environment.header });
  }


  sendMailByOtp(item, message) {

    let obj = { "name": item, "subject": "hello", "message":"Your Otp:"+ message };
    let body = JSON.stringify(obj);
    return this._http.post(this.url, body, { headers:environment.header });
  }

  getRecordByEmail(item) {

    let obj = { "name": item,  "message": "Verifying" };
    let body = JSON.stringify(obj);
    console.log(obj);
    return this._http.post(this.passURL, body, { headers:environment.header });
  }
}
