import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../../../model/DTO/login-dto';
import { LoginResponseDto } from '../../../model/DTO/login-response-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = '/api'; 

  constructor(private http: HttpClient) {}

  login(login: LoginDto) {
    return this.http.post<LoginResponseDto>(
      `${this.baseUrl}/auth/login`,
      {
        email: login.email,
        password: login.password
      }
    )
  }
}
