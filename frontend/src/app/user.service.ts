import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseUrl} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedIn: EventEmitter<any> = new EventEmitter();
  url = baseUrl

  public get user(): any {
   return JSON.parse(window.localStorage.getItem('user'))
  }

  public set user(value: any) {
    window.localStorage.setItem('user', JSON.stringify(value))
  }

  constructor(private http: HttpClient) { }

  login(obj: {email: string, password: string}): Observable<any> {
    return this.http.post(`${this.url}/users/login`, obj);
  }

  register(obj: {name: string, email: string, password: string}): Observable<any> {
    return this.http.post(`${this.url}/users`, obj);
  }

  logout() {
    return this.http.post(`${this.url}/users/me/logout`, {}, {
      headers: {
        Authorization: 'Bearer ' + this.user.token
      }
    });
  }
}
