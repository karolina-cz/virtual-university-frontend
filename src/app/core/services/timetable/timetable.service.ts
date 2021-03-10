import {Injectable} from '@angular/core';
import {UserAuthService} from '../user-auth.service';
import {of} from 'rxjs';
import {catchError, delay} from 'rxjs/operators';
import {ErrorUtils} from '../error-utils';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  username;
  baseUrl = environment.baseUrl;

  constructor(private authService: UserAuthService, private router: Router, private httpClient: HttpClient) {
    this.username = this.authService.currentUserValue.username;
  }

  getTimetable() {
    // @ts-ignore
    return this.httpClient.get<any>(this.baseUrl + 'utils/getSchedule/', {withCredentials: true}).pipe(
      catchError((error) => {
        ErrorUtils.isSessionExpired(error, this.authService, this.router);
        return of('error');
      })
    );
  }
}
