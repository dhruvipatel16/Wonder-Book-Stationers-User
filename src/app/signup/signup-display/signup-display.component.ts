import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SignupsService } from '../signups.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup-display',
  templateUrl: './signup-display.component.html',
  styleUrls: ['./signup-display.component.css']
})
export class SignupDisplayComponent implements OnInit {
  signUpForm: FormGroup;


  constructor(private _signup: SignupsService, private _route: Router) { }


  ngOnInit() {
    this.signUpForm = new FormGroup({
      user_email: new FormControl(null, [Validators.required, Validators.email]),

      password_group: new FormGroup({
        user_password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
        user_confirm_password: new FormControl(null)

      }, [this.passwordmatch.bind(this)]),
      user_type: new FormControl('visitor'),
      customer_name: new FormControl('kashish', [Validators.required, Validators.minLength(5), Validators.pattern('[a-zA-z]*')]),
      customer_gender:new FormControl(null),
      customer_address: new FormControl('abc'),
      customer_photo: new FormControl(null),
      customer_mobileno: new FormControl('9408956502', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]*')])
    });
  }
  onSignUp() {

    console.log(this.signUpForm.value.password_group.user_password);
    let userobj = {
      user_email: this.signUpForm.value.user_email,
      user_password: this.signUpForm.value.password_group.user_password,
      user_type: this.signUpForm.value.user_type
    };
    // let customerobj = {
    //   customer_name: this.signUpForm.value.customer_name,
    //   customer_address: this.signUpForm.value.customer_address,
    //   customer_mobileno: this.signUpForm.value.customer_mobileno,
    //   customer_photo:this.signUpForm.value.customer_photo,
    //   fk_user_email: this.signUpForm.value.user_email
    // };
    let fd = new FormData();
    fd.append('customer_name', this.signUpForm.value.customer_name);
    fd.append('customer_gender', this.signUpForm.value.customer_gender);
    fd.append('customer_address', this.signUpForm.value.customer_address);
    fd.append('customer_photo', this.selectedfile, this.selectedfile.name);
    fd.append('customer_mobileno', this.signUpForm.value.customer_mobileno);
    // console.log(this.selectedfile.name);

    this._signup.signUp(userobj).subscribe(
      (x: any) => {
        console.log("User done");
        this._signup.customerAdd(fd).subscribe(
          (y: any) => {
            console.log(y);
            // alert('done');
            this._route.navigate(['/nav/users']);
          }
        );
      }
    );
  }
  passwordmatch(c: AbstractControl): { [s: string]: boolean } {
    const pass = c.get('user_password').value;
    const cpass = c.get('user_confirm_password').value;
    if (pass != cpass) {
      return { 'PasswordMatch': true };
    }
    return null;

  }
  selectedfile: File = null;

  onChange(value) {
    this.selectedfile = <File>value.target.files[0];
  }
  onClick() {
    this._route.navigate(['/nav/users']);
  }
}
