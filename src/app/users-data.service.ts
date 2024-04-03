import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  constructor(private _HttpClient: HttpClient) {}

  fetchUsers(page: number = 1): Observable<any> {
    //fetch data from api
    const allusers = this._HttpClient.get(
      `https://reqres.in/api/users?page=${page}`
    );
    //caching data
    allusers.subscribe((data) => {
      !localStorage.getItem('users') &&
        localStorage.setItem('users', JSON.stringify(data));
    });

    return allusers;
  }

  userDetails(id: string | null): Observable<any> {
    //fetch data from api
    return this._HttpClient.get(`https://reqres.in/api/users/${id}`);
  }
}
