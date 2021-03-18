import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseInfoComponent} from './course-info/course-info.component';
import {CourseGradesStudentComponent} from './course-grades-student/course-grades-student.component';
import {CourseGradesTeacherComponent} from './course-grades-teacher/course-grades-teacher.component';



@NgModule({
  declarations: [CourseInfoComponent,
    CourseGradesStudentComponent,
    CourseGradesTeacherComponent],
  exports: [
    CourseGradesStudentComponent,
    CourseInfoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoursesModule { }
