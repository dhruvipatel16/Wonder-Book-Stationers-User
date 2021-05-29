import { Component, OnInit } from '@angular/core';
import { ForgettenPasswordDataService } from './forgetten-password-data.service';
import { Router } from '@angular/router';
import { LoginsService } from '../logins.service';
import { UsersDataService } from '../users-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';



@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit {

  constructor(private _snack:MatSnackBar,private _log: LoginsService, private _rout: Router, private _forgot: ForgettenPasswordDataService, private _user: UsersDataService) { }

  ngOnInit() {
  }
  pass: string;
  u_id: number;
  onCancelClick() {
    this._rout.navigate(['/']);

  }

  onDoneClick(Address) {
    console.log(Address);
    this._forgot.getRecordByEmail(Address).subscribe((data) => {
      console.log(data[0].user_password);
      this.u_id=data[0].user_id;
      this._forgot.sendMail(Address,"Forgotten Password",data[0].user_password).subscribe((data) => {
        this._snack.openFromComponent(SnackbarComponent,{duration:5000});
        this._rout.navigate(['/']);

      });
    });
  }

  onOTPClick(Address) {

    let otp;
    otp = Math.floor(1000 + Math.random() * 9000);
    console.log(this.u_id);

    this._forgot.getRecordByEmail(Address).subscribe((data) => {
      console.log(data[0].user_password);
      this.u_id=data[0].user_id;
      this._log.UpdateOtp(this.u_id).subscribe
       this._rout.navigate(['/OtpPage/'+this.u_id]);

    });

    // // this._forgot.sendMailByOtp(Address,otp).subscribe((data) => {
    // //   console.log("success");
    // this._rout.navigate(['/OtpPage/'+this.uid],);
    // // });
  }
}
