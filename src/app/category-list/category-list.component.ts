import { Component, OnInit } from '@angular/core';
import { HomedataService } from '../home/homedata.service';
import { prod } from '../product';
import { cartdetails } from '../cartdetails';
import { CartdataService } from '../cartdisplay/cartdata.service';
import { Router } from '@angular/router';
import { cart } from '../cart';
import { categoryClass } from './category';
import { CategoryListdataService } from './category-listdata.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {


  constructor(private _categ:CategoryListdataService,private _home: HomedataService, public _cartService: CartdataService, private _route: Router) { }
  statdata: prod[] = [];
  imgPath: string = 'http://localhost:3000/';


  arrProductList: prod[] = [];
  cartProductItem: prod = null;
  currentCartItem: cartdetails = null;

  SubTotal: number = 0;
  GrandTotal: number = 0;
cat_Arr:categoryClass[]=[];
  UserId: string ;

  ngOnInit(): void {
    this.UserId=localStorage.getItem('user_email');

    this._categ.getAllCategories().subscribe((data:categoryClass[])=>{
   this.cat_Arr=data;
    });
    this._home.getAllStationery().subscribe((data: prod[]) => {
      console.log(data);
      for(let i=0;i<this.cat_Arr.length;i++)
      {
        if(this.cat_Arr[i].category_name==data[i].category_name)
        {
          this.statdata[i]=data[i];
        }
      }
    });
  }


  onAddToCart(item: prod) {
    if (this.UserId == null) {
      alert('Go To Login');
    }
    else {
      this.cartProductItem = item;
      this.SubTotal = this._cartService.doSubTotal(item.product_price, 1);
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
          }).indexOf(item.product_id);

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

}
