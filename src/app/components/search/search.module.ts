import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import {TeacherSearchComponent} from './teacher-search/teacher-search.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    TeacherSearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule
  ]
})
export class SearchModule { }
