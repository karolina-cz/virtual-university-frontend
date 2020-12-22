import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }
  getTeamInfo(){}
  getTeams(){}
}
