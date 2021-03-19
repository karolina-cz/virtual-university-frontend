import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseInfoComponent} from './course-info/course-info.component';
import {CourseGradesStudentComponent} from './course-grades-student/course-grades-student.component';
import {CourseGradesTeacherComponent} from './course-grades-teacher/course-grades-teacher.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
import {TeamsModule} from '../teams/teams.module';



@NgModule({
  declarations: [CourseInfoComponent,
    CourseGradesStudentComponent,
    CourseGradesTeacherComponent],
    exports: [
        CourseGradesStudentComponent,
        CourseInfoComponent,
        CourseGradesTeacherComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        TeamsModule
    ]
})
export class CoursesModule { }
