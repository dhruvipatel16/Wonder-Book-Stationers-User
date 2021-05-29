import { Component, OnInit } from '@angular/core';
import { CartdataService } from './cartdata.service';
import { cart } from '../cart';
import { cartdetails } from '../cartdetails';

@Component({
  selector: 'app-cartdisplay',
  templateUrl: './cartdisplay.component.html',
  styleUrls: ['./cartdisplay.component.css']
})
export class CartdisplayComponent implements OnInit {

  constructor(private _cart:CartdataService) { }
  cartdataArray:cart;
  user_email:string;
  GrandTotal:number=0;
  UserId: string ;
shipCost:number=30;
  arrcartItems: cartdetails [] = [];
  NoOfItems:number=0;
emptyFlag:boolean=true;
  imgPath = 'http://localhost:3000/';
  cart: cart = JSON.parse(localStorage.getItem('cart')) as cart;
  ngOnInit() {
    this.UserId=localStorage.getItem('user_email');
    this.user_email=localStorage.getItem('user_email');

    if(this.cart!=null && this.user_email!=null)
    {

      if(this.cart.CartItems.length>0)
      {

        this.arrcartItems=this.cart.CartItems;
        this.emptyFlag=false;
        this.NoOfItems=this.arrcartItems.length;

      }
      this.GrandTotal=this.cart.grandtotal;
    }

    this._cart.getAllCartData().subscribe((data:cart[])=>{

    });
  }
  onRemoveFromCart(SelectedProduct_id,index,Qty)
  {
    if(this.user_email!=null)
    {
      this.GrandTotal=this._cart.onRemoveFromCart(SelectedProduct_id);

      this.arrcartItems.splice(index,1);
    }
  }
  onQtyChange(item:cartdetails,txtQty:string,index:number)
  {

    item.qty= +txtQty;
    item.subtotal=this._cart.doSubTotal(item.product.product_price,item.qty);

    this.cart.CartItems[index]=item;
    this.cart.grandtotal=this._cart.doGrandTotal(this.cart.CartItems);
    this.GrandTotal=this.cart.grandtotal;
    localStorage.setItem('cart',JSON.stringify(this.cart));
  }

}
