import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FooterOnlyLayoutComponent} from '../../common/layout/footer-only-layout/footer-only-layout.component';
import {LoginComponent} from './login.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: 'login',
    component: FooterOnlyLayoutComponent,
    children: [
      {path: '', component: LoginComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
