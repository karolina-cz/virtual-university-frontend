import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EMPTY, empty, Observable, of} from 'rxjs';
import {UserAuthService} from '../services/user-auth.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ChangePasswordResolver implements Resolve<any> {
  constructor(private service: UserAuthService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.service.isPasswordChangeCodeValid(route.queryParamMap.get('code')).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
