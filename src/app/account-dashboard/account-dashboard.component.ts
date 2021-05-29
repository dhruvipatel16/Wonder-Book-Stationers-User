import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { SignupsService } from '../signup/signups.service';
import { custClass } from '../customer';
import { environment } from '../../environments/environment';
import { AccdashService } from './accdash.service';
import { orderClass } from '../order';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.css']
})
export class AccountDashboardComponent implements OnInit {

  constructor(private _rout: Router, private _cust: SignupsService, private _accdash: AccdashService) { }
  custData: custClass[] = [];
  userEmail: string;
  customerId: number;
  imgPath: string = environment.url;
  orderData: orderClass[] = [];
  j: number;
  ngOnInit(): void {
    this.customerId = +localStorage.getItem('user_id');
    this.userEmail = localStorage.getItem('user_email');
    this._cust.getCustomerById(this.customerId).subscribe((data: any) => {
      console.log(data)
      this.custData = data;
      console.log(localStorage.getItem('user_id'))
      this._accdash.getOrderByCustomer(data[0].customer_id).subscribe((data1: orderClass[]) => {
        console.log(data1);
        this.j = data1.length - 1;
        for (let i = 0; i < 3; i++) {
          if (data1[this.j] == null) {
            break;
          }
          else {
            this.orderData[i] = data1[this.j];
            this.j--;
          }
        }
      });
    });

  }

  onLogOut() {
    localStorage.clear();
    this._rout.navigate(['']);
  }

}
