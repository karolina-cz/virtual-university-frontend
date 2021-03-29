import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserAuthService} from '../user-auth.service';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {User} from '../../models/user.model';
import {Grade} from '../../models/course/grade.model';
import {ErrorUtils} from '../error-utils';
import {of} from 'rxjs';
import {Announcement} from '../../models/announcement/announcement.model';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient, private authService: UserAuthService, private router: Router) { }

  getAllAnnouncements() {
    return this.httpClient.get<any>(this.baseUrl + 'utils/getAnnouncements/', {withCredentials: true}).pipe(
      map(data => {
        const announcements = [];
        for (const ann of data.records) {
          const announcement = new Announcement(ann.Subject__c, ann.Message__c, new Date(ann.Announced_On__c));
          announcements.push(announcement);
        }
        return announcements;
      }),
      catchError((error) => {
        ErrorUtils.isSessionExpired(error, this.authService, this.router);
        return of([]);
      })
    );
  }
}
