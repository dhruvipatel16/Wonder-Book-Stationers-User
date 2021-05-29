import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SignupsService } from 'src/app/signup/signups.service';
import { custClass } from '../customer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { stringify } from 'querystring';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editcustomer',
  templateUrl: './editcustomer.component.html',
  styleUrls: ['./editcustomer.component.css']
})
export class EditcustomerComponent implements OnInit {

  constructor(private _route: Router, private _act: ActivatedRoute, private _cust: SignupsService, private _snackBar: MatSnackBar) { }
  EditCustomerForm: FormGroup;
  user_email: string;
  user_id: number;
  img1: string = '';
  customer_id: number;
  customerurl: string = "http://localhost:3000/";

  ngOnInit() {
    this.user_id = +localStorage.getItem('user_id');
    this.user_email = localStorage.getItem('user_email');
    console.log(this.user_id);

    this.EditCustomerForm = new FormGroup({
      customer_id: new FormControl(null),
      customer_name: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('[a-zA-z]*')]),
      customer_gender: new FormControl(null, [Validators.required]),
        customer_mobileno: new FormControl(null, [Validators.required, Validators.minLength(10),Validators.maxLength(10), Validators.pattern('[0-9]*')]),
          customer_address: new FormControl(null,[Validators.required]),
            customer_photo: new FormControl(null),
              fk_user_email: new FormControl(null)
  });
    this._cust.getCustomerById(this.user_id).subscribe((data: custClass[]) => {

    this.customer_id = data[0].customer_id;

    this.editCustomerFormDataBind(data[0]);
  });
  }

editCustomerFormDataBind(item: custClass) {
  this.img1 = item.customer_photo;
  this.customerurl = environment.url + item.customer_photo;
  this.EditCustomerForm.patchValue({
    customer_id: item.customer_id,
    customer_name: item.customer_name,
    customer_gender: item.customer_gender,
    customer_mobileno: item.customer_mobileno,
    customer_address: item.customer_address,
    customer_photo: item.customer_photo,
    fk_user_email: item.fk_user_email
  });
  console.log(this.EditCustomerForm.value);
}

onEditSubmit() {
  console.log(this.EditCustomerForm.value)
  console.log(this.customer_id)
  let fd = new FormData();
  fd.append('customer_name', this.EditCustomerForm.value.customer_name);
  fd.append('customer_gender', this.EditCustomerForm.value.customer_gender);
  fd.append('customer_mobileno', this.EditCustomerForm.value.customer_mobileno);
  fd.append('customer_address', this.EditCustomerForm.value.customer_address);
  if (this.selectedfile != null) {
    fd.append('pic', this.selectedfile, this.selectedfile.name);
  }
  else {
    fd.append('pic', this.EditCustomerForm.get('customer_photo').value);
  }
  this._cust.updateCustomer(this.customer_id, fd).subscribe((data: any) => {

    this.openSnackBar('Your Profile have been updated ' + this.EditCustomerForm.value.customer_name);
    this._route.navigate(['/nav/']);

  });
}

selectedfile: File = null;

onChange(value) {
  this.selectedfile = <File>value.target.files[0];
}

onCancel() {

  this._route.navigate(['/nav/']);
}
action: string;
openSnackBar(message: string) {
  this.action = 'Success';
  this._snackBar.open(message, this.action, {
    duration: 2000,
  });
}

onLogOut() {
  localStorage.clear();
  this._route.navigate(['']);
}
}

