import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from './category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorydataService {
  url: string =environment.url +  "category/";
  deleteUrl:string=environment.url  + "categoryDelete/";
  constructor(private _http: HttpClient) { }
  getAllCategory() {
    return this._http.get(this.url);
  }
  deleteCategory(category_id) {
    console.log(category_id)

    return this._http.delete(this.url + category_id);
  }
  addCategory(item) {
    let body = JSON.stringify(item);

    return this._http.post(this.url, item);
  }
  getCategorybyid(category_id) {
    return this._http.get(this.url + category_id);
  }
  updateCategory(item: Category) {
    let body = JSON.stringify(item);
    return this._http.put(this.url + item.category_id, body);
  }
  deleteAllCategoryData(id)
  {
    let body=JSON.stringify(id);

    return this._http.post(this.deleteUrl,body);
    // console.log(id);
  }
}
