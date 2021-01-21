import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Team} from '../models/team/team.model';
import {User} from '../models/user.model';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  getTeamInfo() {
  }

  getTeams() {
  }

  getUsersByPattern(pattern) {
    const body = {
      pattern
    };
    return this.httpClient.post<any>(this.baseUrl + 'collab/getMatchingNames/', body, { withCredentials: true}).pipe(
      map((data) => {
        const users = [];
        for (const item of data.users) {
          users.push(new User(item.username, item.firstname, item.lastname, item.isStudent));
        }
        return users;
      }),
      catchError(() => of([]))
    );
  }
}
