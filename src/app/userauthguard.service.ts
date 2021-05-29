import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserauthguardService implements CanActivate {

  canActivate(_active:ActivatedRouteSnapshot,_state:RouterStateSnapshot):boolean{
    if(localStorage.getItem('user_email')!=null)
    {
      return true;
    }
    alert('not logged in');
    this._route.navigate(['/']);
    return false;
  }

  constructor(private _route:Router) { }
}
