import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Team} from '../models/team/team.model';
import {User} from '../models/user.model';
import {Observable, of} from 'rxjs';

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

  getUsersByPattern() {
    const data = {
      users: [{
        username: 'deadbef731',
        firstname: 'Juliusz',
        lastname: 'Cezar',
        isStudent: true
      },
      {
        username: 'deadbef732',
        firstname: 'Julia',
        lastname: 'Szpak',
        isStudent: true
      },
      {
        username: 'deadbef733',
        firstname: 'Julia',
        lastname: 'Dąbrowska',
        isStudent: true
      },
      {
        username: 'deadbef734',
        firstname: 'Janina',
        lastname: 'Kot',
        isStudent: true
      },
      {
        username: 'deadbef735',
        firstname: 'Janusz',
        lastname: 'Kot',
        isStudent: true
      }
      ]
    };
    const users = [];
    for (const item of data.users) {
      users.push(new User(item.username, item.firstname, item.lastname, item.isStudent));
    }
    return users;
  }
}
