import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {SearchTeacherService} from '../../../core/services/search/search-teacher/search-teacher.service';
import {SearchCourseService} from '../../../core/services/search/search-course/search-course.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.css']
})
export class CourseSearchComponent implements OnInit {
  courses = [];
  isDataLoaded = false;

  constructor(private searchService: SearchCourseService, private router: Router) { }

  ngOnInit(): void {
    this.searchService.getCourses('').subscribe(data => {
      this.isDataLoaded = true;
      this.courses = data;
    });
  }
  onSearchCourse(form: NgForm) {
    this.searchService.getCourses(form.value.course).subscribe(data => {
      this.courses = data;
    });
  }
  onCourseClicked(course) {
    this.router.navigate(['/search/course/' + course.id]);
  }

}
