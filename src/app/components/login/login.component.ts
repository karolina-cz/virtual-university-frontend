import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserAuthService} from '../../core/services/user-auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  areCredentialsInvalid: boolean;
  sessionExpired = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
              private authService: UserAuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.sessionExpired = params.sessionExpired === 'true';
    });
    this.myForm = this.formBuilder.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', Validators.required]
    });
  }

  get password() {
    return this.myForm.get('password');
  }

  get username() {
    return this.myForm.get('username');
  }

  onLoginClicked() {
    if (this.myForm.valid) {
        this.authService.login(this.username.value, this.password.value).subscribe(
          (data) => {
            this.router.navigate(['/home']);
            },
          () => {
            this.areCredentialsInvalid = true;
          }
        );
    }
  }

}
