import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PasswordChangeComponent} from './password-change.component';
import {FooterOnlyLayoutComponent} from '../../common/layout/footer-only-layout/footer-only-layout.component';
import {ChangePasswordResolver} from '../../core/data-providers/change-password-resolver';

const routes: Routes = [
  {
    path: 'change-password',
    component: FooterOnlyLayoutComponent,
    children: [
      {path: '', component: PasswordChangeComponent, resolve: {isCodeValid: ChangePasswordResolver}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordChangeRoutingModule { }
