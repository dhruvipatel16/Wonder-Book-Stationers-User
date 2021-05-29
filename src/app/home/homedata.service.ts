import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { prod } from '../product';

@Injectable({
  providedIn: 'root'
})
export class HomedataService {
  private url:string=environment.url+'book/';
  private staturl:string=environment.url+'product/';
  constructor(private _http: HttpClient) { }

  getAllBooks()
  {
    return this._http.get(this.url);
  }
  getAllStationery()
  {
    return this._http.get(this.staturl);
  }
  getProductByID(product_id)
  {
    return this._http.get(this.url+product_id);
  }
  addProduct(item:prod)
  {
    const body=JSON.stringify(item);
    return this._http.post(this.url,body,{headers:environment.header});
  }
  updateProduct(item:prod)
  {
    const body=JSON.stringify(item);
    return this._http.put(this.url,body,{headers:environment.header});
  }
}
