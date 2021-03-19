import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserAuthService} from '../../user-auth.service';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {User} from '../../../models/user.model';
import {ErrorUtils} from '../../error-utils';
import {of} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {Course} from '../../../models/course/course.model';

@Injectable({
  providedIn: 'root'
})
export class SearchCourseService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient, private authService: UserAuthService, private router: Router) { }

  getCourses(pattern){
    const body = {
      pattern
    };
    return this.httpClient.post<any>(this.baseUrl + 'utils/searchCourses/', body, {withCredentials: true}).pipe(
      map(data => {
        const courses = [];
        for (const course of data.records) {
          courses.push(new Course(course.Subject__c, null, course.Didactic_Group__c[0], null, course.Faculty__c, null, null));
        }
        console.log(courses);
        return courses;
      }),
      catchError((error) => {
        ErrorUtils.isSessionExpired(error, this.authService, this.router);
        return of([]);
      })
    );
  }
}
