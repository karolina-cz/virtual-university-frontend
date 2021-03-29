import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserAuthService} from '../../user-auth.service';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {ErrorUtils} from '../../error-utils';
import {of} from 'rxjs';
import {User} from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SearchTeacherService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient, private authService: UserAuthService, private router: Router) { }

  getTeachers(pattern){
    const body = {
      pattern
    };
    return this.httpClient.post<any>(this.baseUrl + 'utils/searchTeacher/', body, {withCredentials: true}).pipe(
      map(data => {
        const users = [];
        for (const user of data.users) {
          users.push(new User(user.username, user.firstname, user.lastname, false));
        }
        return users;
      }),
      catchError((error) => {
        ErrorUtils.isSessionExpired(error, this.authService, this.router);
        return of([]);
      })
    );
  }
}
