import { Component, OnInit } from '@angular/core';
import { cart } from '../cart';
import { environment } from '../../environments/environment';
import { HomedataService } from '../home/homedata.service';
import { prod } from '../product';
import { categoryClass } from '../category-list/category';
import { CategoryListdataService } from '../category-list/category-listdata.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';


import { cartdetails } from '../cartdetails';
import { CartdataService } from '../cartdisplay/cartdata.service';
import { SearchProductService } from './search-product.service';
import { custClass } from '../customer';
import { SignupsService } from '../signup/signups.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  arr: cart;
  constructor(private _cust: SignupsService, private searchData: SearchProductService, private _cart: CartdataService, private _rout: Router, private _home: HomedataService, private _category: CategoryListdataService) { }

  NoOfItems: number = 0;
  statData: prod[] = [];
  public imagesUrl: string[] = [];
  imgpath: string = 'http://localhost:3000/';
  cartdataArray: cart;
  user_email = '1';
  GrandTotal: number = 0;
  UserId: string;
  shipCost: number = 30;
  arrcartItems: cartdetails[] = [];
  emptyFlag: boolean = true;

  cart: cart = JSON.parse(localStorage.getItem('cart')) as cart;


  catData: categoryClass[] = [];
  u_name: string;
  searchedData: prod[] = [];
  j: number;
  catData2: categoryClass[] = [];
  custData: custClass[] = [];
  imgPath: string = environment.url;
  ngOnInit() {

    this.UserId = localStorage.getItem('user_id');
    this.user_email = localStorage.getItem('user_email');
    //category---------
    this._cust.getCustomerById(this.UserId).subscribe((data: any) => {
      this.custData = data;
      this.u_name = data[0].customer_name;
    });
    this._category.getAllStationeryCategories().subscribe((data: categoryClass[]) => {
      this.j = data.length - 1;

      for (let i = 0; i < 10; i++) {
        this.catData[i] = data[this.j];
        this.j--;
      }
    });

    //---
    this.arr = JSON.parse(localStorage.getItem('cart')) as cart;


    this._home.getAllStationery().subscribe((statdata: prod[]) => {
      this.statData = statdata;
      for (let i = 0; i < 3; i++) {
        this.imagesUrl[i] = this.imgpath + statdata[i].product_img;
      }

    });

    if (this.cart != null && this.user_email != null) {

      if (this.cart.CartItems.length > 0) {
        this.arrcartItems = this.cart.CartItems;
        this.emptyFlag = false;

      }
      this.GrandTotal = this.cart.grandtotal;
    }

    this._cart.getAllCartData().subscribe((data: cart[]) => {

    });
  }
  searchtext: string = '';
  onSearchButton() {
    if (this.searchtext != '') {
      console.log(this.searchtext);
      this._rout.navigate(['/nav/searchData', this.searchtext]);
    }

  }
  onSearch(searchText) {
    this.searchtext = searchText;
  }
  onRemoveFromCart(SelectedProduct_id, index, Qty) {
    if (this.user_email != null) {
      this.GrandTotal = this._cart.onRemoveFromCart(SelectedProduct_id);

      this.arrcartItems.splice(index, 1);
    }
  }
  onLogOut() {
    localStorage.clear();
    this._rout.navigate(['']);
  }
  onQtyChange(item: cartdetails, txtQty: string, index: number) {

    item.qty = +txtQty;
    item.subtotal = this._cart.doSubTotal(item.product.product_price, item.qty);

    this.cart.CartItems[index] = item;
    this.cart.grandtotal = this._cart.doGrandTotal(this.cart.CartItems);
    this.GrandTotal = this.cart.grandtotal;
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  onDataByCategory(item) {
    let x1 = item.category_id;
    this._rout.navigate(['/nav/displayproduct/', x1]);
  }

}
