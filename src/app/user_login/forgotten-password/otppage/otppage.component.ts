import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginsService } from '../../logins.service';

@Component({
  selector: 'app-otppage',
  templateUrl: './otppage.component.html',
  styleUrls: ['./otppage.component.css']
})
export class OtppageComponent implements OnInit {

  constructor(private _act: ActivatedRoute,private _log:LoginsService) { }

  ngOnInit()
  {
  }
  onDoneClick(otp1)
  {
  }
}
