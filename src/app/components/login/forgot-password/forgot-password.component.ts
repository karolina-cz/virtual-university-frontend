import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserAuthService} from '../../../core/services/user-auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  isSuccessful;
  isUsernameValid = true;
  constructor(private authService: UserAuthService) { }

  ngOnInit(): void {
  }
  onSave(form: NgForm) {
    const username = form.value.username;
    if (!username.replace(/\s/g, '').length){
      this.isUsernameValid = false;
    } else {
      this.isUsernameValid = true;
      this.authService.forgotPassword(form.value.username).subscribe(data => {
          // @ts-ignore
          this.isSuccessful = data !== 'error';
      });
    }
  }

}
