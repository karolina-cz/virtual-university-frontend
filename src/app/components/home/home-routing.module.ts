import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FooterOnlyLayoutComponent} from '../../common/layout/footer-only-layout/footer-only-layout.component';
import {LoginComponent} from '../login/login.component';
import {HomeComponent} from './home.component';
import {AuthGuard} from '../../core/services/auth.guard';
import {MainLayoutComponent} from '../../common/layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'home',
    component: MainLayoutComponent,
    children: [
      {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
