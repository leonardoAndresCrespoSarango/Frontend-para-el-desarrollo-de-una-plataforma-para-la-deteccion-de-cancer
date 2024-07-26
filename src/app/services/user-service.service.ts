import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, finalize, Observable, tap} from 'rxjs';
import {LoaderService} from "./loader.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000';
  private loggedInUserSubject = new BehaviorSubject<any>(null);
  public loggedInUser$ = this.loggedInUserSubject.asObservable();
  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  registerUser(userData: any): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/register`, userData, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  loginUser(data: any): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/login`, data, { withCredentials: true }).pipe(
      tap(user => {
        this.loggedInUserSubject.next(user);
      }),
      finalize(() => this.loaderService.hide())
    );
  }

  getLoggedInUser(): Observable<any> {
    return this.loggedInUser$;
  }

  getUsers(): Observable<any> {
    this.loaderService.show();
    return this.http.get<any>(`${this.apiUrl}/users`, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  forgotPassword(data: any): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, data, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  resetPassword(token: string, data: any): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/reset-password/${token}`, data, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  generateResetToken(data: any): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/generate-reset-token`, data, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  logout(): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.loggedInUserSubject.next(null);
      }),
      finalize(() => this.loaderService.hide())
    );
  }
}
