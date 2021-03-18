import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavbarToggleDirective } from './directives/navbar-toggle.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {LayoutModule} from './common/layout/layout.module';
import {PasswordChangeModule} from './components/password-change/password-change.module';
import {LoginModule} from './components/login/login.module';
import {HomeModule} from './components/home/home.module';
import {TeamsModule} from './components/teams/teams.module';
import {ProfileModule} from './components/profile/profile.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import localePl from '@angular/common/locales/pl';
import {TimetableModule} from './components/timetable/timetable.module';
import {SearchModule} from './components/search/search.module';
import { CourseInfoComponent } from './components/courses/course-info/course-info.component';
import { CourseGradesStudentComponent } from './components/courses/course-grades-student/course-grades-student.component';
import { CourseGradesTeacherComponent } from './components/courses/course-grades-teacher/course-grades-teacher.component';
import {CoursesModule} from './components/courses/courses.module';
registerLocaleData(localePl);


@NgModule({
  declarations: [
    AppComponent,
    NavbarToggleDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    LayoutModule,
    PasswordChangeModule,
    LoginModule,
    HomeModule,
    CoursesModule,
    TeamsModule,
    ProfileModule,
    TimetableModule,
    SearchModule,
    BrowserAnimationsModule
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
