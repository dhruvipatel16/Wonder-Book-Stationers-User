import { Component, OnInit } from '@angular/core';
import { categoryClass } from '../category-list/category';
import { CategorydataService } from '../categorypage/categorydata.service';
import { CategoryListdataService } from '../category-list/category-listdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homestat',
  templateUrl: './homestat.component.html',
  styleUrls: ['./homestat.component.css']
})
export class HomestatComponent implements OnInit {
  categoryarr: categoryClass[] = [];

  imgpath: string = 'http://localhost:3000/';
  constructor(private _Category: CategoryListdataService, private _categ: CategorydataService,private _router:Router) { }

  ngOnInit(): void {
    this._Category.getAllStationeryCategories().subscribe((data: any[]) => {
      this.categoryarr = data;
    });
  }

  onDataByCategory(item)
  {
    let x1=item.category_id;
    this._router.navigate(['/nav/displayproduct/',x1]);

  }

}
