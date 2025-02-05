import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';
import { LoaderService } from "./loader.service";

/**
 * Servicio para la gestión de usuarios.
 * Maneja el registro, autenticación, recuperación de contraseñas y gestión del estado de sesión.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  /** URL base de la API */
  private apiUrl = 'http://localhost:5000';

  /** Estado del usuario autenticado */
  private loggedInUserSubject = new BehaviorSubject<any>(null);

  /** Observable que emite cambios en el estado del usuario autenticado */
  public loggedInUser$ = this.loggedInUserSubject.asObservable();

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar peticiones al backend.
   * @param loaderService Servicio para manejar el estado de carga en la interfaz.
   */
  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  /**
   * Registra un nuevo usuario en la plataforma.
   * @param userData Datos del usuario a registrar.
   * @returns Observable con la respuesta del servidor.
   */
  registerUser(userData: any): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/register`, userData, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Inicia sesión de un usuario.
   * @param data Credenciales del usuario (email y contraseña).
   * @returns Observable con la respuesta del servidor.
   */
  loginUser(data: any): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/login`, data, { withCredentials: true }).pipe(
      tap(user => {
        this.loggedInUserSubject.next(user);
      }),
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Obtiene el usuario actualmente autenticado.
   * @returns Observable con la información del usuario autenticado.
   */
  getLoggedInUser(): Observable<any> {
    return this.loggedInUser$;
  }

  /**
   * Obtiene la lista de usuarios registrados en la plataforma.
   * @returns Observable con la lista de usuarios.
   */
  getUsers(): Observable<any> {
    this.loaderService.show();
    return this.http.get<any>(`${this.apiUrl}/users`, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Solicita un enlace para restablecer la contraseña del usuario.
   * @param data Datos del usuario para solicitar el enlace de recuperación.
   * @returns Observable con la respuesta del servidor.
   */
  forgotPassword(data: any): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, data, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Restablece la contraseña del usuario utilizando un token de recuperación.
   * @param token Token de recuperación enviado al usuario.
   * @param data Nueva contraseña.
   * @returns Observable con la respuesta del servidor.
   */
  resetPassword(token: string, data: any): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/reset-password/${token}`, data, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Genera un token de restablecimiento de contraseña.
   * @param data Datos del usuario que solicita el token.
   * @returns Observable con la respuesta del servidor.
   */
  generateResetToken(data: any): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/generate-reset-token`, data, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Cierra la sesión del usuario.
   * @returns Observable con la respuesta del servidor.
   */
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
