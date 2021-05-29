import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { orderDetailClass } from '../orderdetail';
import { addtoCart } from './checkout';

@Injectable({
  providedIn: 'root'
})
export class CheckoutdataService {
  private url: string = environment.url + "order/";
  private detail_url: string = environment.url + 'order_detail/';

  constructor(private _http: HttpClient) { }
  addOrder(obj) {
    console.log(obj);
    let body = JSON.stringify(obj);
    return this._http.post(this.url, body, { headers: environment.header });
  }

  item: orderDetailClass;

  addOrderDetails(item:addtoCart) {
    console.log(item);
    let body = JSON.stringify(item);
    return this._http.post(this.detail_url, body, { headers: environment.header });
  }
}


