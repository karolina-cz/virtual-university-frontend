import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from '../../common/layout/main-layout/main-layout.component';
import {HomeComponent} from '../home/home.component';
import {AuthGuard} from '../../core/services/auth.guard';
import {ProfileComponent} from './profile.component';

const routes: Routes = [
  {
    path: 'profile',
    component: MainLayoutComponent,
    children: [
      {path: '', component: ProfileComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
