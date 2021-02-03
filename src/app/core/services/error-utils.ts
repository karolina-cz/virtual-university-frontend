import {Constants} from '../constants';

export class ErrorUtils {

  static checkSessionExpiration(error, authService){
    // && error.message === Constants.LOGOUT_MESSAGE
    if (error.status === Constants.LOGOUT_STATUS_CODE){
      authService.logout();
      console.log('logout');
    }
  }
}
