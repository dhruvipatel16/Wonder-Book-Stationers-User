import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactusdataService {
  private url: string = environment.url + 'mail/';
  constructor(private _http: HttpClient)  { }

  sendMail(item,subject, message) {

    let obj = { "name": item, "subject": subject, "message":message };
    console.log(obj);
    return this._http.post(this.url, obj, { headers: environment.header});
  }


}
