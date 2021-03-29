import {Injectable} from '@angular/core';
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
        const gradeSubjects = [];
        const subject = data.subject;
        const typeOfClasses = data.type_of_classes;
        // tslint:disable-next-line:forin
        for (const userData in data) {
          if (userData === 'subject' || userData === 'type_of_classes'){
            continue;
          }
          const user = new User(data[userData].login, data[userData].first_name, data[userData].last_name, true);
          const grades = [];
          for (const grade of data[userData].grades){
            grades.push(new Grade(grade.id, grade.name, grade.value));
            if (!gradeSubjects.includes(grade.name)){
              gradeSubjects.push(grade.name);
            }
          }
          userGrades.push({
            user,
            didacticGroupAttendee: userData,
            grades
          });
        }
        return {
          userGrades,
          gradeSubjects,
          subject,
          typeOfClasses
        };
      }),
      catchError((error) => {
        ErrorUtils.isSessionExpired(error, this.authService, this.router);
        return of({});
      })
    );
  }

  getCourseInfo(courseId) {
    const body = {
      didactic_group_id: courseId
    };
    return this.httpClient.post<any>(this.baseUrl + 'utils/getGeneralCourseInfo/', body, {withCredentials: true}).pipe(
      map(data => {
        const course = new Course(data.Subject__c, data.Assessment_methods__c, data.Id, data.ECTS__c,
          data.Faculty__c, data.Literature__c, data.Statute__c);
        return course;
      }),
      catchError((error) => {
        ErrorUtils.isSessionExpired(error, this.authService, this.router);
        return of('error');
      })
    );
  }

  addGrade(value, name,  didacticGroupAttendee) {
    const body = {
      grade_info: {
        Didactic_Group_Attendee__c: didacticGroupAttendee,
        Name: name,
        Grade_Value__c: value
      }
    };
    return this.httpClient.post<any>(this.baseUrl + 'utils/addGrade/', body, {withCredentials: true}).pipe(
      catchError((error) => {
        ErrorUtils.isSessionExpired(error, this.authService, this.router);
        return of('error');
      })
    );
  }

  updateGrade(value, name,  gradeId) {
    const body = {
      grade_info: {
        Id: gradeId,
        Name: name,
        Grade_Value__c: value
      }
    };
    // @ts-ignore
    return this.httpClient.post<any>(this.baseUrl + 'utils/editGrade/', body, {withCredentials: true, responseType: 'text'}).pipe(
      catchError((error) => {
        ErrorUtils.isSessionExpired(error, this.authService, this.router);
        return of('error');
      })
    );
  }

  removeGrade(gradeId) {
    const body = {
      grades_ids: [gradeId]
    };
    // @ts-ignore
    return this.httpClient.post<any>(this.baseUrl + 'utils/removeGrade/', body, {withCredentials: true, responseType: 'text'}).pipe(
      catchError((error) => {
        ErrorUtils.isSessionExpired(error, this.authService, this.router);
        return of('error');
      })
    );
  }

  createChangeGroupRequest(fromGroupId, toGroupId) {
    const body = {
      from_dg_id: fromGroupId,
      to_dg_id: toGroupId
    };
    return this.httpClient.post<any>(this.baseUrl + 'utils/createChangeGroupRequest/', body, {withCredentials: true}).pipe(
      catchError((error) => {
        ErrorUtils.isSessionExpired(error, this.authService, this.router);
        return of('error');
      })
    );
  }

  removeChangeGroupRequest(changeRequestId) {
    const body = {
      change_group_request_ids: [changeRequestId]
    };
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<any>(this.baseUrl + 'utils/removeChangeGroupRequest/', body, {withCredentials: true, responseType: 'text'}).pipe(
      catchError((error) => {
        ErrorUtils.isSessionExpired(error, this.authService, this.router);
        return of('error');
      })
    );
  }

  getChangeGroupRequestInfo(didacticGroupId) {
    const body = {
      didactic_group_id: didacticGroupId
    };
    return this.httpClient.post<any>(this.baseUrl + 'utils/getChangeGroupRequestInfo/', body, {withCredentials: true}).pipe(
      catchError((error) => {
        ErrorUtils.isSessionExpired(error, this.authService, this.router);
        return of('error');
      })
    );
  }

  getMyGroupChangeRequests(didacticGroupId) {
    const body = {
      didactic_group_id: didacticGroupId
    };
    return this.httpClient.post<any>(this.baseUrl + 'utils/getChangeGroupRequests/', body, {withCredentials: true}).pipe(
      map(data => {
        if (data.records.length === 0){
          return null;
        }
        return {
          id: data.records[0].Id,
          teacher: data.records[0].To_Group__c.Teacher_Name__c,
          startDate: new Date(data.records[0].To_Group__c.Classes_Start_Date__c),
          endDate: new Date(data.records[0].To_Group__c.Classes_End_Date__c)
        };
      }),
      catchError((error) => {
        ErrorUtils.isSessionExpired(error, this.authService, this.router);
        return of('error');
      })
    );
  }
}
