import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from '../../common/layout/main-layout/main-layout.component';
import {ProfileComponent} from '../profile/profile.component';
import {AuthGuard} from '../../core/services/auth.guard';
import {TimetableComponent} from './timetable.component';

const routes: Routes = [
  {path: 'timetable',
    component: MainLayoutComponent,
    children: [
      {path: '', component: TimetableComponent, canActivate: [AuthGuard]},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimetableRoutingModule { }
