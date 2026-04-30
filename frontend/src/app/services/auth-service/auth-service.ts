import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../../../model/DTO/login-dto';
import { LoginResponseDto } from '../../../model/DTO/login-response-dto';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = '/api'; 
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  setToken(token: string){
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string|null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  login(login: LoginDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(
      `${this.baseUrl}/auth/login`,
      {
        email: login.email,
        password: login.password
      }
    ).pipe(
      tap(loginResponse => {
        this.setToken(loginResponse.access_token);
      })
    );
  }
}
