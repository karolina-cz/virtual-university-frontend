import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FooterOnlyLayoutComponent} from '../../common/layout/footer-only-layout/footer-only-layout.component';
import {PasswordChangeComponent} from '../password-change/password-change.component';
import {ChangePasswordResolver} from '../../core/data-providers/change-password-resolver';
import {LoginComponent} from './login.component';

const routes: Routes = [
  {
    path: 'login',
    component: FooterOnlyLayoutComponent,
    children: [
      {path: '', component: LoginComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
