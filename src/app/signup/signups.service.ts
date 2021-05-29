import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { custClass } from '../customer';
@Injectable({
  providedIn: 'root'
})
export class SignupsService {
  private url: string = environment.url + "user/";
  private cust_url: string = environment.url + "customer/";
  private custbymail_url: string = environment.url + "custbymail/";
  constructor(private _http: HttpClient) { }

  getCustomerById(c_id)
  {
    console.log(c_id);
    return this._http.get(this.cust_url + c_id, { headers: environment.header });
  }
  signUp(obj) {
    console.log(obj);
    let body = JSON.stringify(obj);

    return this._http.post(this.url, body, { headers: environment.header });
  }
  customerAdd(item) {
    console.log(item);
    // let body = JSON.stringify(item);
    // let x = new HttpHeaders().set('Content-type', 'application/json');
    // return this._http.post(this.url, body, { headers: x });
    return this._http.post(this.cust_url, item);
  }

  getAllCustomer() {
    return this._http.get(this.cust_url);
  }

  deleteCustomer(c_id) {
    return this._http.delete(this.cust_url + c_id, { headers: environment.header });
  }


  getCustomerByEmail(e_mail) {
    let obj = { "e_mail": e_mail };
    let body = JSON.stringify(obj);
    return this._http.post(this.custbymail_url, body, { headers:environment.header });

  }

  updateCustomer(customer_id,item) {
    console.log(customer_id)
    return this._http.put(this.cust_url+customer_id, item);
  }

  deleteAllCustomerData(id: custClass[]) {
    let body = JSON.stringify(id);
    return this._http.post(this.cust_url + id, body, { headers: environment.header });
  }
}
