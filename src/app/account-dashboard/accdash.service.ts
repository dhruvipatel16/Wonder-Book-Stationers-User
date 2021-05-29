import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccdashService {
  private url: string = environment.url + "orderByCustomer/";

  constructor(private _http: HttpClient) { }
  getOrderByCustomer(c_id)
  {
    return this._http.get(this.url + c_id, { headers: environment.header });
  }
}
