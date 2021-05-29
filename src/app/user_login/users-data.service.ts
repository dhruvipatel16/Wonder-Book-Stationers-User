import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userCLass } from '../users';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  private url:string=environment.url+'user/';
  private type_url:string=environment.url+'typeUpdate/';

  constructor(private _http:HttpClient) { }
  updateusertype(u_id)
  {
    let obj = { "user_type": "customer"};
    let body = JSON.stringify(obj);

      console.log(body)
    return this._http.put(this.type_url+u_id,body,{headers:environment.header});
  }
  getAllUser()
  {
    return this._http.get(this.url);
  }
  addUser(item)
  {
    let body=JSON.stringify(item);
    return this._http.post(this.url+item,{headers:environment.header});
  }
  deleteUser(User_id:number)
  {
    return this._http.delete(this.url+User_id,{headers:environment.header});
  }
  getUserById(user_email: string) {
    // console.log(p_id);
    return this._http.get(this.url + user_email, { headers: environment.header });
  }
  deleteAllUserData(id: userCLass[]) {
    // console.log(id);
    let body = JSON.stringify(id);
    return this._http.post(this.url + id, body, { headers: environment.header });
  }

updateAdminPass(obj)
{ console.log(obj);
  let body=JSON.stringify(obj);
  return this._http.put(this.url+obj.user_email,body,{headers:environment.header});
}
}
