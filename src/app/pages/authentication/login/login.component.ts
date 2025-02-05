import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../../services/user-service.service";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

/**
 * Componente de inicio de sesión.
 * Permite a los usuarios autenticarse en la aplicación enviando credenciales al servicio de autenticación.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  /**
   * Formulario de inicio de sesión.
   * Contiene los campos de correo electrónico y contraseña con validaciones.
   */
  loginForm: FormGroup;

  /**
   * Constructor del componente.
   * @param fb FormBuilder para la creación del formulario reactivo.
   * @param userService Servicio para manejar la autenticación de usuarios.
   * @param router Router para la navegación después del inicio de sesión exitoso.
   * @param toastr Servicio de notificaciones para mostrar mensajes al usuario.
   */
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      /** Correo electrónico del usuario con validaciones de requerimiento y formato */
      email: ['', [Validators.required, Validators.email]],

      /** Contraseña del usuario, campo obligatorio */
      password: ['', Validators.required]
    });
  }

  /**
   * Maneja el envío del formulario de inicio de sesión.
   * Si las credenciales son correctas, redirige al usuario al dashboard.
   * Si hay un error, muestra un mensaje de error.
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.userService.loginUser(this.loginForm.value).subscribe(
        response => {
          this.toastr.success('Login successful', 'Success');
          // Redirigir al dashboard después de 2 segundos
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000); // 2000 ms = 2 segundos
        },
        error => {
          this.toastr.error('Login failed', 'Error');
          console.error('Login failed', error);
        }
      );
    }
  }
}
