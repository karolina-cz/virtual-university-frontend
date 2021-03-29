import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../../core/services/course/course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserAuthService} from '../../../core/services/user-auth.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  subject = '';
  groupId;

  constructor(private route: ActivatedRoute, public router: Router, public authService: UserAuthService,
              private courseService: CourseService) { }

  ngOnInit(): void {
    this.groupId = this.route.snapshot.params.groupId;
    this.courseService.getCourseGrades(this.groupId).subscribe(
      data => {
        // @ts-ignore
        this.subject = data.subject;
      }
    );
  }
}
