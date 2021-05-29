import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupsService } from 'src/app/signup/signups.service';
import { LoginsService } from '../logins.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  signUpForm: FormGroup;
  loginForm: FormGroup;
  showPassw: string = "password";
  constructor(private _signup: SignupsService, private _route: Router, private _login: LoginsService) { }

  ngOnInit() {
    this.showPassw = 'password';
    this.loginForm = new FormGroup({
      user_email: new FormControl(null, [Validators.required, Validators.email]),
      user_password: new FormControl(null, [Validators.required])
    });

    this.signUpForm = new FormGroup({
      user_email: new FormControl(null, [Validators.required, Validators.email]),

      password_group: new FormGroup({
        user_password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
        user_confirm_password: new FormControl(null)

      }, [this.passwordmatch.bind(this)]),
      user_type: new FormControl('visitor'),
      customer_name: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('[a-zA-z]*')]),
      customer_gender: new FormControl(null),
      customer_address: new FormControl(null, [Validators.required]),
      customer_photo: new FormControl(null, [Validators.required]),
      customer_mobileno: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')])
    });
  }
  id: number = 1;
  hide = true;
  onLogin() {
    this._login.login(this.loginForm.value).subscribe(
      (data: any) => {
        console.log(data);
        if (data.length == 1) {
          // alert('valid');
          localStorage.setItem('user_email', this.loginForm.get('user_email').value);
          localStorage.setItem('user_password', this.loginForm.get('user_password').value);
          localStorage.setItem('user_id', data[0].user_id);
          // console.log(data[0].user_id);
          this._route.navigate(['nav']);

        }
        else {
          alert('invalid');

        }
      }
    );
  }
  onShowPass() {
    if (this.hide == true) {
      this.hide = false;
    } else {
      this.hide = true;

    }

  }





  onSignUp() {

    console.log(this.signUpForm.value.password_group.user_password);
    let userobj = {
      user_email: this.signUpForm.value.user_email,
      user_password: this.signUpForm.value.password_group.user_password,
      user_type: this.signUpForm.value.user_type
    };

    let fd = new FormData();
    fd.append('customer_name', this.signUpForm.value.customer_name);
    fd.append('customer_gender', this.signUpForm.value.customer_gender);
    fd.append('customer_address', this.signUpForm.value.customer_address);
    fd.append('customer_photo', this.selectedfile, this.selectedfile.name);
    fd.append('customer_mobileno', this.signUpForm.value.customer_mobileno);
    fd.append('fk_user_email', this.signUpForm.value.user_email);
    // console.log(this.selectedfile.name);

    this._signup.signUp(userobj).subscribe(
      (x: any) => {
        console.log("User done");
        this._signup.customerAdd(fd).subscribe(
          (y: any) => {
            location.reload();
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
