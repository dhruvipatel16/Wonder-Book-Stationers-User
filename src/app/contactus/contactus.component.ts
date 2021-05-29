import { Component, OnInit } from '@angular/core';
import { ContactusdataService } from './contactusdata.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor(private _contact: ContactusdataService) { }

  ngOnInit(): void {
  }
  email = new FormControl(null,[Validators.required, Validators.email]);
  subject = new FormControl(null, [Validators.required]);
  message = new FormControl(null);

  getMailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  onDoneClick()
  {
    console.log(this.email.value);
this._contact.sendMail(this.email.value,this.subject.value,this.message.value).subscribe(
  (data)=>{
alert('SENT');
});
  }


}
