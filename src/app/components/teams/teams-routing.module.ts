import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeamsComponent} from './teams.component';
import {AuthGuard} from '../../core/services/auth.guard';
import {TeamComponent} from './team/team.component';
import {FooterOnlyLayoutComponent} from '../../common/layout/footer-only-layout/footer-only-layout.component';
import {LoginComponent} from '../login/login.component';
import {MainLayoutComponent} from '../../common/layout/main-layout/main-layout.component';
import {TeamCalendarComponent} from './team/team-calendar/team-calendar.component';

const routes: Routes = [
  {
    path: 'teams',
    component: MainLayoutComponent,
    children: [
      {path: '', component: TeamsComponent, canActivate: [AuthGuard]},
      {path: ':id', component: TeamComponent, canActivate: [AuthGuard]},
      {path: ':id/calendar', component: TeamCalendarComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
