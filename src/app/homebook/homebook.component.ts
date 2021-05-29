import { Component, OnInit } from '@angular/core';
import { categoryClass } from '../category-list/category';
import { CategoryListdataService } from '../category-list/category-listdata.service';
import { CategorydataService } from '../categorypage/categorydata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homebook',
  templateUrl: './homebook.component.html',
  styleUrls: ['./homebook.component.css']
})
export class HomebookComponent implements OnInit {
  categoryarr: categoryClass[] = [];

  imgpath: string = 'http://localhost:3000/';
  constructor(private _Category: CategoryListdataService, private _categ: CategorydataService,private _router:Router) { }

  ngOnInit(): void {
    this._Category.getAllBookCategories().subscribe((data: any[]) => {
      this.categoryarr = data;
    });
  }

  onDataByCategory(item)
  {
    let x1=item.category_id;
    this._router.navigate(['/nav/displayproduct/',x1]);

  }

}

