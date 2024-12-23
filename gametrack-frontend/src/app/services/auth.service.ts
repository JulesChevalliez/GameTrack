import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.API_URL+"auth";

  constructor(private http: HttpClient) {}

  httpOptions = {
    withCredentials: true
  };

  register(pseudo: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { pseudo, password, email }, { withCredentials: true});
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }, { withCredentials: true});
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true});
  }

  isLoggedIn(): Observable<any>{
    return this.http.post(`${this.apiUrl}/isLoggedIn`, null, { withCredentials: true});
  }
}