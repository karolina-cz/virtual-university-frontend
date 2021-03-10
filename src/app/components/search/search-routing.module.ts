import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from '../../common/layout/main-layout/main-layout.component';
import {TimetableComponent} from '../timetable/timetable.component';
import {AuthGuard} from '../../core/services/auth.guard';
import {TeacherSearchComponent} from './teacher-search/teacher-search.component';

const routes: Routes = [{path: 'search',
  component: MainLayoutComponent,
  children: [
    {path: 'teacher', component: TeacherSearchComponent, canActivate: [AuthGuard]},
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
