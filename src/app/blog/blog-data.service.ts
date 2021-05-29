import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogDataService {
  private url:string=environment.url+'blog/';
  constructor(private _http: HttpClient) { }

  getAllBlogData()
  {
    return this._http.get(this.url);
  }
}
