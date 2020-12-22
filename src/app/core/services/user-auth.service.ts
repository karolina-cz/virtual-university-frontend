import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  url = 'https://wuback.herokuapp.com/';
  private currentUser; // tutaj bedzi etype user

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  isPasswordChangeCodeValid(code) {
    // @ts-ignore
    return this.http.get<any>(this.url + 'auth/valid/' + code, {responseType: 'text'});
  }

  get currentUserValue(): User {
    return this.currentUser;
  }

  isAuthenticated(): boolean{
    return this.currentUser != null;
  }

  changePassword(password, codeValue) {
    const body = {
      code: codeValue,
      new_password: password
    };
    // @ts-ignore
    return this.http.post<any>(this.url + 'auth/change/', body, {responseType: 'text'});
  }

  login(username, password) {
    const body = {
      username,
      password
    };
    // @ts-ignore
    return this.http.post<any>(this.url + 'auth/login/', body, {responseType: 'text', withCredentials: true}).pipe(
      map((data) => {
        this.currentUser = new User('czachork', 'Karolina', 'Czachorska', 'student');
        localStorage.setItem('user', JSON.stringify(new User('czachork', 'Karolina', 'Czachorska', 'student')));
        return data;
        // tutaj bedzie ustawienie danych usera
      }),
      catchError(() => throwError('Invalid login credentials'))
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser = null;
    // tutaj bedzie request do zmiany ciasteczka na expiration time w przeszłości
  }
}
