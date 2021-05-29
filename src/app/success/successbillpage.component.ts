import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { cart } from '../cart';
import { cartdetails } from '../cartdetails';
import { Router } from '@angular/router';
import { SuccessserviceService } from './successservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { succClass } from './successClass';

@Component({
  selector: 'app-successbillpage',
  templateUrl: './successbillpage.component.html',
  styleUrls: ['./successbillpage.component.css']
})
export class SuccessbillpageComponent {

  cart: cart = JSON.parse(localStorage.getItem('cart')) as cart;
  arrcartItems: cartdetails[] = [];
  user_email = '1';
  emptyFlag: boolean = true;
  total: number[] = [];
  GrandTotal: number = 0;
  totals: number = 0;
  success: number;
  o_id: number;
  subto: number[] = [];
  add: any[] = [];
  biladd: any[] = [];
  cu_name: string;
  cu_address: string;
  cu_mno: number;
  cu_email: string;
  imgPath = 'http://localhost:3000/';
  img = 'http://localhost:3000/images/success.png';

  constructor(private _router: Router, private _orderDetails: SuccessserviceService) { this.dataSource = new MatTableDataSource(); }
  displayedColumnsOrder: string[] = ['order_id', 'order_date', 'total', 'payment_type'];
  displayedColumnsProduct: string[] = ['product_img', 'product_name', 'quantity', 'Total'];
  displayedColumnsTotal: string[] = ['subtot', 'shipping', 'Totalt'];
  dataSource: MatTableDataSource<succClass>;


  ngOnInit(): void {
    this.success = JSON.parse(localStorage.getItem('order'));
    console.log(this.success);
    console.log(typeof (this.success));
    this._orderDetails.getOrderDetailsByOrderId(this.success).subscribe(
      (data1: any) => {
        this.dataSource = data1;
      }
    );

    this._orderDetails.getCustomerAddress(this.success).subscribe(
      (data: any) => {
        console.log(data);
        this.add = data;
      }
    );

    if (this.cart != null && this.user_email != null) {

      if (this.cart.CartItems.length > 0) {
        this.arrcartItems = this.cart.CartItems;
        this.emptyFlag = false;
        console.log(this.arrcartItems);
        for (let i = 0; i < this.cart.CartItems.length; i++) {
          this.total[i] = this.arrcartItems[i].product.product_price * this.arrcartItems[i].qty;
          this.arrcartItems[i].product.total = this.total[i];
        }

      }
      this.GrandTotal = this.cart.grandtotal;
      this.totals = this.GrandTotal + 30;
    }
  }
  onGoToHome() {
    this._router.navigate(['/nav/HomePage']);
    localStorage.removeItem('cart');
  }

}
