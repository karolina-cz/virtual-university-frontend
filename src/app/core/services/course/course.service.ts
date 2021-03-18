import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserAuthService} from '../user-auth.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {ErrorUtils} from '../error-utils';
import {of} from 'rxjs';
import {User} from '../../models/user.model';
import {Grade} from '../../models/course/grade.model';
import {Course} from '../../models/course/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient, private authService: UserAuthService, private router: Router) { }

  getCourseGrades(didacticGroupId){
    const body = {
      didactic_group_id: didacticGroupId
    };

    // @ts-ignore
    return this.httpClient.post<any>(this.baseUrl + 'utils/getMyCourseInfo/', body, {withCredentials: true}).pipe(
      map(data => {
        const userGrades = [];
        // tslint:disable-next-line:forin
        for (const userData in data) {
          const user = new User(data[userData].login, data[userData].first_name, data[userData].last_name, true);
          const grades = [];
          for (const grade of data[userData].grades){
            grades.push(new Grade(grade.id, grade.name, grade.value));
          }
          userGrades.push({
            user,
            grades
          });
        }
        return userGrades;
      }),
      catchError((error) => {
        console.log(error);
        ErrorUtils.isSessionExpired(error, this.authService, this.router);
        return of('error');
      })
    );
  }

  getCourseInfo(courseId) {
    const body = {
      course_id: courseId
    };
    return this.httpClient.post<any>(this.baseUrl + 'utils/getGeneralCourseInfo/', body, {withCredentials: true}).pipe(
      map(data => {
        const course = new Course(data.Subject__c, data.Assessment_methods__c, data.Id, data.ECTS__c,
          data.Faculty__c, data.Literature__c, data.Statute__c);
        return course;
      }),
      catchError((error) => {
        console.log(error);
        ErrorUtils.isSessionExpired(error, this.authService, this.router);
        return of('error');
      })
    );
  }
}
