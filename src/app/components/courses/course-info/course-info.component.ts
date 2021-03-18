import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../../core/services/course/course.service';
import {Course} from '../../../core/models/course/course.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {
  courseId;
  course: Course = new Course(null, null, null, null, null, null, null);

  constructor(private courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params.courseId;
    this.courseService.getCourseInfo(this.courseId).subscribe(
      data => {
        if (data !== 'error'){
          // @ts-ignore
          this.course = data;
        }
      }
    );
  }

}
