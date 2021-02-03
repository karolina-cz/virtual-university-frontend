import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Team} from '../models/team/team.model';
import {User} from '../models/user.model';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {UserAuthService} from './user-auth.service';
import {ErrorUtils} from './error-utils';

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

  getTeams(from, to) {
    const teams = [];
    teams.push(new Team('Projekt inżynierski', 'Projekt inżynierski wykorzystujący Spring i Angular', '123', null, null, null));
    teams.push(new Team('Aplikacje Webowe', 'fvevn veenr jc vi fher vebfhb fbvhebd dceidbrf uvhfuerh  erhugbcyue yuy hdgydgdf, hfgfyh, lsgtsbd, hgtaplb, bdgtard, ndhdh', '234', null, null, null));
    teams.push(new Team('Projekt z ochrony danych', 'fvevn veenr jc vi fher vebfhb fbvhebd dceidbrf uvhfuerh  erhugbcyue yuy hdgydgdf, hfgfyh, lsgtsbd, hgtaplb, bdgtard, ndhdh', '567', null, null, null));
    teams.push(new Team('Projekt z sieci komputerowych', 'fvevn veenr jc vi fher vebfhb fbvhebd dceidbrf uvhfuerh  erhugbcyue yuy hdgydgdf, hfgfyh, lsgtsbd, hgtaplb, bdgtard, ndhdh', '786', null, null, null));
    teams.push(new Team('Projekt zespołowy - CRM', 'fvevn veenr jc vi fher vebfhb fbvhebd dceidbrf uvhfuerh  erhugbcyue yuy hdgydgdf, hfgfyh, lsgtsbd, hgtaplb, bdgtard, ndhdh', '857', null, null, null));
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next({teams, totalCount: 23});
        observer.complete();
      }, 2000);
    });
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
      catchError((error) => {
        // ErrorUtils.checkSessionExpiration(error, this.authService);
        return of([]);
      })
    );
  }
}
