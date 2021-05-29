import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { cart } from '../cart';
import { cartdetails } from '../cartdetails';
import { CheckoutdataService } from './checkoutdata.service';
import { addtoCart } from './checkout';
import { Router } from '@angular/router';
import { SignupsService } from '../signup/signups.service';
import { custClass } from '../customer';
import { UsersDataService } from '../user_login/users-data.service';

declare let paypal: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, AfterViewInit {

  @ViewChild("paypal") paypalele: ElementRef;

  constructor(private _user: UsersDataService, private _cust: SignupsService, private _route: Router, private _order: CheckoutdataService) { }
  cartdataArray: cart;
  user_email = '1';
  GrandTotal: number = 0;
  UserId: string = '1';
  shipCost: number = 30;
  arrcartItems: cartdetails[] = [];
  NoOfItems: number = 0;
  emptyFlag: boolean = true;

  total: number[] = [];
  totals: number = 0;
  imgPath = 'http://localhost:3000/';
  cart: cart = JSON.parse(localStorage.getItem('cart')) as cart;
  padiFor = false;
  customerId: number;
  custData: any[] = [];
  Address: string = '';
  ngAfterViewInit() {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "Stationery books",
                amount: {
                  //currency_code: "USD",
                  value: this.totals,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.padiFor = true;
          console.log(order);

        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(this.paypalele.nativeElement);
  }
  ngOnInit(): void {

    this.customerId = +localStorage.getItem('user_id');

    if (this.cart != null && this.user_email != null) {
      this.placeOrderButton = false;
      if (this.cart.CartItems.length > 0) {
        this.arrcartItems = this.cart.CartItems;
        this.emptyFlag = false;

        for (let i = 0; i < this.cart.CartItems.length; i++) {
          this.total[i] = this.arrcartItems[i].product.product_price * this.arrcartItems[i].qty;
          this.arrcartItems[i].product.total = this.total[i];
        }

      }
      this.GrandTotal = this.cart.grandtotal;
      this.totals = this.GrandTotal + 30;
    }
    else {
      this.placeOrderButton = true;
    }
    this._cust.getCustomerById(this.customerId).subscribe((data: any[]) => {
      this.custData = data;

      if (this.Address == '') {
        this.Address = data[0].customer_address;

      }
    });
  }
  prod_arr: number[] = [];
  quant_arr: number[] = [];
  placeOrderButton: boolean = true;
  p_type: string;
  notes: string = '';
  onPlaceOrder() {
    //
    // let dt = new Date();
    if (this.notes == '') {
      this.notes = 'No Order Notes';
    }
    let orderObj = {
      shipping_address: this.Address,
      order_notes: this.notes,
      order_amount: this.totals,
      payment_type: 'COD',
      order_date: new Date(),
      order_status: "Pending",
      fk_customer_id: this.custData[0].customer_id
    }
    let detailObj = {
      fk_order_id: null,
      fk_product_id: null,
      quantity: null
    }
    this._order.addOrder(orderObj).subscribe((orderdata: any) => {
      detailObj.fk_order_id = orderdata.insertId;

      let z = new addtoCart(this.arrcartItems, detailObj.fk_order_id);
      this._order.addOrderDetails(z).subscribe((detdata: any[]) => {
        alert("added");


        if (this.custData[0].user_type == "visitor") {
          this._user.updateusertype(this.custData[0].user_id).subscribe((data1: any) => {

          });
        }
        localStorage.setItem('order', detailObj.fk_order_id);

        // localStorage.removeItem('cart');
        this._route.navigate(['/nav/successbill']);

      });
    });
  }
  onOrderNotes(onText) {
    if (onText != '') {
      this.notes = onText;
    }
    else {
      this.notes = 'No Order Notes';
    }

  }
  onKeyUp(addText) {
    if (addText != '') {
      this.Address = addText;
    }
    else {

      this.Address = this.custData[0].customer_address;
    }

  }
}
