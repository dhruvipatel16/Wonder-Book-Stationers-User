import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { Router } from '@angular/router';
import { userCLass } from 'src/app/users';
import { UsersDataService } from 'src/app/user_login/users-data.service';

@Component({
  selector: 'app-edituserdata',
  templateUrl: './edituserdata.component.html',
  styleUrls: ['./edituserdata.component.css']
})
export class EdituserdataComponent implements OnInit {

  constructor(private _route: Router, private _admin: UsersDataService) { }
  AdminPassChangeForm: FormGroup;
  adminMail: string;
  adminPass: string;
  ngOnInit() {
    console.log(localStorage.getItem("user_type"))
    this.adminMail = localStorage.getItem("user_email");
    this.adminPass = localStorage.getItem('user_password');
    console.log(this.adminPass);
    this.AdminPassChangeForm = new FormGroup({
      current_password:new FormControl(null),
      user_email: new FormControl(null),

      password_group: new FormGroup({
        user_password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
        user_confirm_password: new FormControl(null)
      }, [this.passwordmatch.bind(this)]),
      user_type: new FormControl('customer'),
    });
  }


  passwordmatch(c: AbstractControl): { [s: string]: boolean } {
    const pass = c.get('user_password').value;
    const cpass = c.get('user_confirm_password').value;
    if (pass != cpass) {
      return { 'PasswordMatch': true };
    }
    return null;
  }
  onDone(curpass) {
    console.log(curpass)
    console.log(this.adminPass)
    if (this.adminPass == curpass) {
      let userobj = {
        user_email: this.adminMail,
        user_password: this.AdminPassChangeForm.value.password_group.user_password,
        user_type: this.AdminPassChangeForm.value.user_type
      };

      console.log(userobj);
      this._admin.updateAdminPass(userobj).subscribe((data) => {
        console.log(data)
        this._route.navigate(['/nav/edit']);
      });
    }
    else
    {
      alert('Wrong Current Password ');
      this.AdminPassChangeForm.reset();
    }
  }

  onCancelClick() {
    this._route.navigate(['/nav/MyProfile']);
  }

  onLogOut() {
    localStorage.clear();
    this._route.navigate(['']);
  }

}
