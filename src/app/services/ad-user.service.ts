import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AdUser} from '../common/ad-user';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdUserService {

  private baseUrl = 'http://localhost:8080/api/ad-users';

  constructor(private httpClient: HttpClient) { }

  getUserList(): Observable<AdUser[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response.users)
    );
  }
}

interface GetResponse {
  users: AdUser[];
}
