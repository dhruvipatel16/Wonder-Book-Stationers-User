import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { cart } from '../cart';
import { cartdetails } from '../cartdetails';

@Injectable({
  providedIn: 'root'
})
export class CartdataService {
  url: string = environment.url + "cart/";

  constructor(private _http: HttpClient) { }
  getAllCartData() {
    return this._http.get(this.url);
  }

  addDataToCart(item) {
    let body = JSON.stringify(item);
    return this._http.post(this.url, item);
  }

  onRemoveFromCart(SelectedProduct_id): number {
    if (localStorage.getItem('cart') != null) {
      let cart: cart = JSON.parse(localStorage.getItem('cart')) as cart;
      let index: number = -1;
      if (cart.CartItems.length >= 0) {
        //index of prod
        index = cart.CartItems.map(function (x) {
          return x.product.product_id;
        }).indexOf(SelectedProduct_id);

        if (index != 1) {
          cart.CartItems.splice(index, 1);
          cart.grandtotal = this.doGrandTotal(cart.CartItems);
          localStorage.setItem('cart', JSON.stringify(cart));
          return cart.grandtotal;
        }
      }
    }
    return 0;
  }
  doSubTotal(price,quantity):number
  {
    return price*quantity;
  }
  doGrandTotal(cartItems:cartdetails[]):number
  {
    let GrandTotal:number=0;
    if(cartItems!=null)
    {
      if(cartItems.length>=0)
      {
        for(let i=0;i<cartItems.length;i++)
        {
          GrandTotal+=cartItems[i].subtotal;
        }
      }
    }
    return GrandTotal;
  }
}
