import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  url = 'https://wuback.herokuapp.com/';

  constructor(private http: HttpClient) { }

  changePassword(password, codeValue) {
    const body = {
      code: codeValue,
      new_password: password
    };
    // @ts-ignore
    return this.http.post<any>(this.url + 'auth/change/', body, {responseType: 'text'});
  }
}
