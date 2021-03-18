import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../../core/services/course/course.service';
import {Grade} from '../../../core/models/course/grade.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-course-grades-student',
  templateUrl: './course-grades-student.component.html',
  styleUrls: ['./course-grades-student.component.css']
})
export class CourseGradesStudentComponent implements OnInit {
  grades;
  groupId;
  constructor(private courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.groupId = this.route.snapshot.params.groupId;
    this.courseService.getCourseGrades(this.groupId).subscribe(data => {
      this.grades = data[0].grades;
      console.log(this.grades);
    });
  }

}
