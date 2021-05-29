import { Component, OnInit } from '@angular/core';
import { prod } from '../product';
import { bookClass } from '../book';
import { cart } from '../cart';
import { FormGroup, FormControl } from '@angular/forms';
import { cartdetails } from '../cartdetails';
import { Router } from '@angular/router';
import { HomedataService } from './homedata.service';
import { CartdataService } from '../cartdisplay/cartdata.service';
import { stringify } from '@angular/compiler/src/util';
import { MatDialog } from '@angular/material/dialog';
import { ViewmoreComponent } from '../viewmore/viewmore.component';
import { CategoryListdataService } from '../category-list/category-listdata.service';
import { categoryClass } from '../category-list/category';
import { CategorydataService } from '../categorypage/categorydata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _dialog: MatDialog, private _home: HomedataService, private _cart: CartdataService, private _router: Router, private _Category: CategoryListdataService, private _categ: CategorydataService) { }

  statData: prod[] = [];
  cartProductItem: prod = null;
  currentCartItem: cartdetails = null;
  SubTotal: number = 0;
  GrandTotal: number = 0;
  user_email: string = '1';


  slideImages: prod[];
  bookData: bookClass[] = [];
  cartAddForm: FormGroup;
  imgpath: string = 'http://localhost:3000/';
  slideImage1: string;
  slideImage2: string;
  slideImage3: string;
  categoryarr: categoryClass[] = [];
  o_id: number;
  ngOnInit() {

    this._home.getAllBooks().subscribe(
      (data: bookClass[]) => {
        this.bookData = data;
      });
    this._Category.getAllCategories().subscribe((data: any[]) => {
      this.categoryarr = data;

    });
    this._home.getAllStationery().subscribe((statdata: prod[]) => {
      this.statData = statdata;

      for (let i = 0; i < 3; i++) {
        // this.imagesUrl[i]=this.imgpath+statdata[i].product_img;
      }
      // console.log(this.imagesUrl);
    });
    this.cartAddForm = new FormGroup({
      fk_user_email: new FormControl("kashishshahr@gmail.com"),
      fk_product_id: new FormControl(null)
    });
  }
  onDataByCategory(item) {

    let x1 = item.category_id;

    this._router.navigate(['/nav/displayproduct/', x1]);

  }




  onAddToCart(item: prod) {
    if (this.user_email == null) {
      alert('Go to Login');
    }
    else {
      this.cartProductItem = item;
      this.SubTotal = this._cart.doSubTotal(this.cartProductItem.product_price, 1);
      this.currentCartItem = new cartdetails(this.cartProductItem, 1, this.SubTotal);

      // first item of the cart
      if (localStorage.getItem('cart') == null) {

        const cartItems: cartdetails[] = [];
        cartItems.push(this.currentCartItem);

        this.GrandTotal = this._cart.doGrandTotal(cartItems);

        const myCart = new cart(cartItems, this.GrandTotal, this.user_email);
        localStorage.setItem('cart', JSON.stringify(myCart));
      }
      else {
        // cart has already some itmes
        const cart: cart = JSON.parse(localStorage.getItem('cart')) as cart;
        let index: number = -1;

        if (cart.CartItems.length >= 0) {

          // getting index of product
          index = cart.CartItems.map(function (x) {
            return x.product.product_id;
          }).indexOf(item.product_id);

          // if current product does not exist in cart then add it
          if (index == -1) {
            cart.CartItems.push(this.currentCartItem);

            cart.grandtotal = this._cart.doGrandTotal(cart.CartItems);
            cart.user_email = this.user_email;

            localStorage.setItem('cart', JSON.stringify(cart));
          }
          else {
            const cartItem: cartdetails = cart.CartItems[index];
            cartItem.qty += 1;
            cartItem.subtotal = this._cart.doSubTotal(this.cartProductItem.product_price, cartItem.qty);
            cart.CartItems[index] = cartItem;

            cart.grandtotal = this._cart.doGrandTotal(cart.CartItems);
            cart.user_email = this.user_email;

            localStorage.setItem('cart', JSON.stringify(cart));
          }
        }
      }
      alert('Successfully Added to Cart');
    }
  }

  onRemoveFromCart(SelectedProductID) {
    if (this.user_email != null) {
      this._cart.onRemoveFromCart(SelectedProductID);
      // this._router.navigate(['/shoppingcart']);
      alert('Removed From Cart');
    }
  }
  openDialog(row) {
    this._dialog.open(ViewmoreComponent, {
      data: row
    });
  }
  onStationery() {
    this._router.navigate(['/nav/stationery']);
  }
  onBook() {
    this._router.navigate(['/nav/books']);

  }
}
