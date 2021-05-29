import { Component, OnInit } from '@angular/core';
import { CategoryListdataService } from '../category-list/category-listdata.service';
import { categoryClass } from '../category-list/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private _rout:Router,private cat: CategoryListdataService) { }
  bookCatArr:categoryClass[]=[];
  statCatArr:categoryClass[]=[];

  ngOnInit() {
    this.cat.getAllBookCategories().subscribe((data: any) => {

      this.bookCatArr=data;
    });
    this.cat.getAllStationeryCategories().subscribe((data: any) => {

      this.statCatArr=data;
    });
  }
  onCategoryClick(item)
  {
    let x1 = item.category_id;
    this._rout.navigate(['/nav/displayproduct/', x1]);
  }
}
