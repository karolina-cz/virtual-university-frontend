import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../../core/services/course/course.service';
import {Router} from '@angular/router';
import {UserAuthService} from '../../../core/services/user-auth.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(public router: Router, public authService: UserAuthService) { }

  ngOnInit(): void {
  }

}
