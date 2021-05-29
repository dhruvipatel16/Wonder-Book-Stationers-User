import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorydataService } from '../categorydata.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-categoryadd',
  templateUrl: './categoryadd.component.html',
  styleUrls: ['./categoryadd.component.css']
})
export class CategoryaddComponent implements OnInit {
  categoryAddForm: FormGroup;
  constructor(private _route: Router, private _data: CategorydataService) { }

  ngOnInit() {
    this.categoryAddForm = new FormGroup({
      category_name: new FormControl(null, [Validators.required])
    });
  }
  onCategoryAdd() {
    console.log(this.categoryAddForm.value);
    this._data.addCategory(this.categoryAddForm.value).subscribe(
      (data: any[]) => {
        console.log(data);
        this._route.navigate(['/nav/categories']);
      }
    );
  }
  onCancel() {
    this._route.navigate(['/nav/categories']);
  }
}


