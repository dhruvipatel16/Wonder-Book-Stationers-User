import { Component, OnInit } from '@angular/core';
import { prod } from '../product';
import { cartdetails } from '../cartdetails';
import { ActivatedRoute } from '@angular/router';
import { CategoryListdataService } from '../category-list/category-listdata.service';
import { HomedataService } from '../home/homedata.service';
import { CartdataService } from '../cartdisplay/cartdata.service';
import { cart } from '../cart';
import { ViewmoreComponent } from '../viewmore/viewmore.component';
import { MatDialog } from '@angular/material/dialog';
import { SearchProductService } from '../header/search-product.service';

@Component({
  selector: 'app-search-data',
  templateUrl: './search-data.component.html',
  styleUrls: ['./search-data.component.css']
})
export class SearchDataComponent implements OnInit {

  UserId: string;


  arrProductList: prod[] = [];
  cartProductItem: prod = null;
  currentCartItem: cartdetails = null;

  SubTotal: number = 0;
  GrandTotal: number = 0;

  category_id: number = 0;
  imgpath: string = 'http://localhost:3000/';

  constructor(private _search: SearchProductService, private _dialog: MatDialog, private act: ActivatedRoute, private _Category: CategoryListdataService, private _home: HomedataService, public _cartService: CartdataService) { }
  name: string;
  prodData: prod[] = [];
  ngOnInit(): void {
    this.UserId = localStorage.getItem('user_email');
    this.act.params.subscribe((data: any) => {
      console.log(data.searchtext);

      this._search.searchProduc(data.searchtext).subscribe((data1:prod[]) => {
        this.prodData=data1;

      });
    });
    //   this.act.params.subscribe((data:any)=>{
    // console.log(data);
    //   });


  }
  openDialog(row) {
    this._dialog.open(ViewmoreComponent, {
      data: row
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
