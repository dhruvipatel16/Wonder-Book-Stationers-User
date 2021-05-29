import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {environment} from '../../environments/environment'
import { prod } from '../product';
import { CartdataService } from '../cartdisplay/cartdata.service';
import { cart } from '../cart';
import { cartdetails } from '../cartdetails';



@Component({
  selector: 'app-viewmore',
  templateUrl: './viewmore.component.html',
  styleUrls: ['./viewmore.component.css']
})
export class ViewmoreComponent implements OnInit {

  constructor(public _cartService: CartdataService,public dialogRef: MatDialogRef<ViewmoreComponent>,

    @Inject(MAT_DIALOG_DATA) public item: prod, ) { }

  product_name: string = "";
  product_img: string;
  product_desc: string;
  product_price: Number;
  imgPath:string=environment.url;


  UserId: string;
  statdata: prod[] = [];

  arrProductList: prod[] = [];
  cartProductItem: prod = null;
  currentCartItem: cartdetails = null;

  SubTotal: number = 0;
  GrandTotal: number = 0;

  category_id: number = 0;
  prodData: prod[] = [];


  ngOnInit() {
    this.UserId = localStorage.getItem('user_email');
    console.log(this.item);
    this.product_name = this.item.product_name;
    this.product_img = this.item.product_img;
    this.product_desc = this.item.product_desc;
    this.product_price = this.item.product_price;
  }
  onAddToCart() {
    if (this.UserId == null) {
      alert('Go To Login');
    }
    else {
      this.cartProductItem = this.item;
      this.SubTotal = this._cartService.doSubTotal(this.item.product_price, 1);
      this.currentCartItem = new cartdetails(this.cartProductItem, 1, this.SubTotal);

      if (localStorage.getItem('cart') == null) {
        const cartItems: cartdetails[] = [];
        cartItems.push(this.currentCartItem);
        this.GrandTotal = this._cartService.doGrandTotal(cartItems);

        const myCart = new cart(cartItems, this.GrandTotal, this.UserId);
        localStorage.setItem('cart', JSON.stringify(myCart));

      }
      else {
        const cart: cart = JSON.parse(localStorage.getItem('cart')) as cart;
        let index: number = -1;

        if (cart.CartItems.length >= 0) {
          index = cart.CartItems.map(function (x) {
            return x.product.product_id;
          }).indexOf(this.item.product_id);

          if (index == -1) {
            cart.CartItems.push(this.currentCartItem);
            cart.grandtotal = this._cartService.doGrandTotal(cart.CartItems);
            cart.user_email = this.UserId;
            localStorage.setItem('cart', JSON.stringify(cart));

          }
          else {
            const cartItem: cartdetails = cart.CartItems[index];
            cartItem.qty += 1;
            cartItem.subtotal = this._cartService.doSubTotal(this.cartProductItem.product_price, cartItem.qty);
            cart.CartItems[index] = cartItem;

            cart.grandtotal = this._cartService.doGrandTotal(cart.CartItems);
            cart.user_email = this.UserId;

            localStorage.setItem('cart', JSON.stringify(cart));
          }
        }
      }
      alert('added to cart');
    }
  }
  onClickzoom(){

  }
}
