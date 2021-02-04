import {Constants} from '../constants';

export class ErrorUtils {

  static isSessionExpired(error, authService, router): boolean{
    if (error.status === Constants.LOGOUT_STATUS_CODE && error.error === Constants.LOGOUT_MESSAGE){
      authService.logout();
      router.navigate(['/login'], {queryParams: {sessionExpired: true}});
      return true;
    }
    return false;
  }
}
