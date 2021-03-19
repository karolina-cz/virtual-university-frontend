import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import {TeacherSearchComponent} from './teacher-search/teacher-search.component';
import {FormsModule} from '@angular/forms';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CoursePageComponent } from './course-search/course-page/course-page.component';
import {CoursesModule} from '../courses/courses.module';


@NgModule({
  declarations: [
    TeacherSearchComponent,
    CourseSearchComponent,
    CoursePageComponent
  ],
    imports: [
        CommonModule,
        SearchRoutingModule,
        FormsModule,
        CoursesModule
    ]
})
export class SearchModule { }
