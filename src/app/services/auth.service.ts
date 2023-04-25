import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginCredentail } from '../models/credentail';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  public logIn(credential: LoginCredentail): Observable<any> {
    return this.http.post(environment.api_prefix + 'auth/login', credential);
  }
}
