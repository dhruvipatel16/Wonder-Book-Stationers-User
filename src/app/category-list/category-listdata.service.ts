import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryListdataService {

  private url:string=environment.url+'category';
  private url1:string=environment.url+'bookcategory';

  private url3:string=environment.url+'statCategory';

  private url2:string=environment.url+'prodbycat/';

  constructor(private _http:HttpClient) { }
  getAllCategories()
  {
    return this._http.get(this.url);

   }
   getAllBookCategories()
   {
     return this._http.get(this.url1);

    }
    getAllStationeryCategories()
    {
      return this._http.get(this.url3);

     }
    getAllDataByCategory(cat_id:number)
   {
     return this._http.get(this.url2+cat_id);
    }
//   addUser(item)
//   {
//     let body=JSON.stringify(item);
//     return this._http.post(this.url+item,{headers:environment.header});
//   }
//   deleteUser(User_id:number)
//   {
//     return this._http.delete(this.url+User_id,{headers:environment.header});
//   }
//   getUserById(user_email: string) {
//     // console.log(p_id);
//     return this._http.get(this.url + user_email, { headers: environment.header });
//   }
//   deleteAllUserData(id: userCLass[]) {
//     // console.log(id);
//     let body = JSON.stringify(id);
//     return this._http.post(this.url + id, body, { headers: environment.header });
//   }

// updateAdminPass(obj)
// { console.log(obj);
//   let body=JSON.stringify(obj);
//   return this._http.put(this.url+obj.user_email,body,{headers:environment.header});
// }
}
