import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CategorydataService } from '../categorydata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../category';

@Component({
  selector: 'app-categoryedit',
  templateUrl: './categoryedit.component.html',
  styleUrls: ['./categoryedit.component.css']
})
export class CategoryeditComponent implements OnInit {

  category_id: number;
  CategoryUpdateForm: FormGroup;

  constructor(private _route: Router, private _data: CategorydataService, private _activate_route: ActivatedRoute) { }

  ngOnInit() {
    this.category_id = this._activate_route.snapshot.params['category_id'];
    // console.log(this.category_id);
    this.CategoryUpdateForm = new FormGroup({
      category_id: new FormControl,
      category_name: new FormControl(null)
    });
    this._data.getCategorybyid(this.category_id).subscribe(
      (data: Category[]) => {

        this.formDataBind(data[0]);
      }
    );
  }
  formDataBind(item: Category) {
    console.log(item);
    this.CategoryUpdateForm.patchValue({
      category_id: item.category_id,
      category_name: item.category_name
    });
  }

  onCategoryEdit() {
    this._data.updateCategory(this.CategoryUpdateForm.value).subscribe(
      (data: Category) => {
        console.log(data[0]);
        this._route.navigate(['/nav/categories']);
      }
    );
  }
  onCancel() {
    this._route.navigate(['/nav/categories']);
  }
}
