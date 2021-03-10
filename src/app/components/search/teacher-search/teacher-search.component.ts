import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {SearchTeacherService} from '../../../core/services/search/search-teacher/search-teacher.service';

@Component({
  selector: 'app-teacher-search',
  templateUrl: './teacher-search.component.html',
  styleUrls: ['./teacher-search.component.css']
})
export class TeacherSearchComponent implements OnInit {
  teachers = [];
  isDataLoaded = false;
  constructor(private searchService: SearchTeacherService) { }

  ngOnInit(): void {
    this.searchService.getTeachers('').subscribe(data => {
      this.isDataLoaded = true;
      this.teachers = data;
    });
  }

  onSearchTeacher(form: NgForm) {
    this.searchService.getTeachers(form.value.teacher).subscribe(data => {
      this.teachers = data;
    });
  }

}
