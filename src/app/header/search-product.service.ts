import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchProductService {

  private url: string = environment.url + 'searchProduct/';

  constructor(private _http: HttpClient) { }

  searchProduc(text: any) {
    let obj= {
      "searchText":text
 }
    console.log(obj);
    let body = JSON.stringify(obj);
    return this._http.post(this.url, body, { headers: environment.header });
  }
}
