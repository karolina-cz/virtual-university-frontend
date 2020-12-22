import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PasswordChangeRoutingModule} from './password-change-routing.module';
import {PasswordChangeComponent} from './password-change.component';
import {PasswordChangeFailComponent} from './password-change-fail/password-change-fail.component';
import {PasswordChangeSuccessComponent} from './password-change-success/password-change-success.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    PasswordChangeComponent,
    PasswordChangeFailComponent,
    PasswordChangeSuccessComponent],
  imports: [
    CommonModule,
    PasswordChangeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PasswordChangeModule {
}
