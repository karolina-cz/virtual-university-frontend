import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EMPTY, empty, Observable, of} from 'rxjs';
import {UserAuthService} from '../services/user-auth.service';
import {catchError, map} from 'rxjs/operators';
import {TeamsService} from '../services/teams.service';

@Injectable({ providedIn: 'root' })
export class TeamsResolver implements Resolve<any> {
  constructor(private service: TeamsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return null;
    // this.service.getTeams().pipe(
    //   map(() => true),
    //   catchError(() => of(false))
    // );
  }
}
