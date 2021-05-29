import { Component, OnInit } from '@angular/core';
import { orderClass } from 'src/app/order';
import { custClass } from 'src/app/customer';
import { environment } from 'src/environments/environment';
import { AccdashService } from '../accdash.service';
import { SignupsService } from 'src/app/signup/signups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.css']
})
export class AccountOrdersComponent implements OnInit {


  constructor(private _rout: Router, private _cust: SignupsService, private _accdash: AccdashService) { }
  custData: custClass[] = [];
  userEmail: string;
  customerId: number;
  imgPath: string = environment.url;
  orderData: orderClass[] = [];

  ngOnInit(): void {
    this.customerId = +localStorage.getItem('user_id');
    this.userEmail = localStorage.getItem('user_email');
    this._cust.getCustomerById(this.customerId).subscribe((data: any) => {
      console.log(data)
      this.custData = data;
      console.log(localStorage.getItem('user_id'))
      this._accdash.getOrderByCustomer(data[0].customer_id).subscribe((data1: orderClass[]) => {
        this.orderData= data1;

      });
    });
  }

  onLogOut() {
    localStorage.clear();
    this._rout.navigate(['']);
  }
}
