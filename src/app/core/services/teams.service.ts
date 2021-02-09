import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Team} from '../models/team/team.model';
import {User} from '../models/user.model';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {UserAuthService} from './user-auth.service';
import {ErrorUtils} from './error-utils';
import {Router} from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import {Constants} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  baseUrl = environment.baseUrl;
  teams = [];

  constructor(private httpClient: HttpClient, private authService: UserAuthService, private router: Router) {
  }

  addTeam(subject, description, teamMembers) {
    const teacherId = this.authService.currentUserValue.username;
    const body = {
      subject,
      description,
      teacher_id: teacherId,
      team_members: teamMembers
    };
    // @ts-ignore
    return this.httpClient.post<any>(this.baseUrl + 'collab/createTeam/', body, {withCredentials: true}).pipe(
      catchError((error) => {
        ErrorUtils.isSessionExpired(error, this.authService, this.router);
        return of('error');
      })
    );
  }

  addTeamMembers(id: string, addedMembers: User[]){
    const members = addedMembers.map(u => u.username);
    const body = {
      team_id: id,
      team_members: members
    };
    return this.httpClient.post<any>(this.baseUrl + 'collab/addMember/', body, {withCredentials: true}).pipe(
      catchError((error) => {
        ErrorUtils.isSessionExpired(error, this.authService, this.router);
        return of(null);
      })
    );
  }

  getTeamInfo(id: string) {
    const body = {
      id
    };
    return this.httpClient.post<any>(this.baseUrl + 'collab/teamInfo/', body, {withCredentials: true}).pipe(
      map((data) => {
        const teamMembers = [];
        for (const member of data.team_members){
          teamMembers.push(new User(member.login, member.first_name, member.last_name, null));
        }
        return new Team(data.subject, data.description, data.id, teamMembers, null, null);
      }),
      catchError((error) => {
        ErrorUtils.isSessionExpired(error, this.authService, this.router);
        return of(null);
      })
    );
  }

  getTeamEvents(from: string, to: string, teamId: string){
    const body = {
      team_id: teamId,
      start_date: from,
      end_date: to
    };
    return this.httpClient.post<any>(this.baseUrl + 'collab/getEvents/', body, {withCredentials: true}).pipe(
      catchError((error) => {
        ErrorUtils.isSessionExpired(error, this.authService, this.router);
        return of({});
      })
    );
  }

  getTeams(page: number) {
    const login = this.authService.currentUserValue.username;
    const body = {
      page,
      login
    };
    return this.httpClient.post<any>(this.baseUrl + 'collab/getTeams/', body, {withCredentials: true}).pipe(
      map((data) => {
        const teams: Team[] = [];
        for (const team of data.teams){
          teams.push(new Team(team.Subject__c, team.Description__c, team.Id, null, null, null));
        }
        return {teams, totalCount: data.size};
      }),
      catchError((error) => {
        ErrorUtils.isSessionExpired(error, this.authService, this.router);
        return of({});
      })
    );
  }

  getUsersByPattern(pattern) {
    const userId = this.authService.currentUserValue.username;
    const body = {
      pattern
    };
    return this.httpClient.post<any>(this.baseUrl + 'collab/getMatchingNames/', body, {withCredentials: true}).pipe(
      map((data) => {
        const users = [];
        for (const item of data.users) {
          if (item.username !== userId) {
            users.push(new User(item.username, item.firstname, item.lastname, item.isStudent));
          }
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
