import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Team} from '../models/team/team.model';
import {User} from '../models/user.model';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {UserAuthService} from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient, private authService: UserAuthService) {
  }

  addTeam(subject, description, teamMembers){
    const teacherId = this.authService.currentUserValue.username;
    const body = {
      subject,
      description,
      teacher_id: teacherId,
      team_members: teamMembers
    };
    // @ts-ignore
    return this.httpClient.post<any>(this.baseUrl + 'collab/createTeam/', body, {withCredentials: true}).pipe(
      catchError(() => of(''))
    );
  }

  getTeamInfo() {
  }

  getTeams() {
  }

  getUsersByPattern(pattern) {
    const userId = this.authService.currentUserValue.username;
    const body = {
      pattern
    };
    return this.httpClient.post<any>(this.baseUrl + 'collab/getMatchingNames/', body, { withCredentials: true}).pipe(
      map((data) => {
        const users = [];
        for (const item of data.users) {
          if (item.username !== userId) {
            users.push(new User(item.username, item.firstname, item.lastname, item.isStudent));
          }
        }
        return users;
      }),
      catchError(() => of([]))
    );
  }
}
