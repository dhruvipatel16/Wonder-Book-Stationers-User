import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuccessserviceService {

  private orderDetail: string = environment.url + 'order/';
  private custAdd: string = environment.url + 'custAdd/';
  constructor(private _http: HttpClient) { }

  getOrderDetailsByOrderId(o_id) {
    return this._http.get(this.orderDetail + o_id);
  }

  getCustomerAddress(o_id) {
    return this._http.get(this.custAdd + o_id);
  }
}
