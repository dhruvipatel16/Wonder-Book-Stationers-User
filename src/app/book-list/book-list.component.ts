import { Component, OnInit } from '@angular/core';
import { bookClass } from '../book';
import { HomedataService } from '../home/homedata.service';
import { CartdataService } from '../cartdisplay/cartdata.service';
import { Router } from '@angular/router';
import { cartdetails } from '../cartdetails';
import { prod } from '../product';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  constructor(private _home: HomedataService, public _cartService: CartdataService, private _route: Router) { }
  bookdata: bookClass[] = [];
  imgPath: string = 'http://localhost:3000/';

  ngOnInit(): void {
    this._home.getAllBooks().subscribe((data: bookClass[]) => {
      this.bookdata = data;
    });
  }


 }
