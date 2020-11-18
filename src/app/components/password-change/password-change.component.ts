import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators, ValidatorFn, ValidationErrors, FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {
  myForm: FormGroup;
  code;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.code = params.code;
      console.log(this.code);
    });
    this.myForm = this.formBuilder.group({
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password.value === confirmPassword.value ? null : { passwordNotMatch: true };
  }

  get password(){return this.myForm.get('password'); }

  get confirmPassword() {return this.myForm.get('confirmPassword'); }

  onSave(): void{
    console.log(this.code);
  }

}
