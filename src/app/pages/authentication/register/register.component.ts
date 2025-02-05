import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from "../../../services/user-service.service";
import { ToastrService } from 'ngx-toastr';

/**
 * Componente de registro de usuarios.
 * Permite a los usuarios crear una cuenta enviando sus datos al servicio de autenticación.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  /**
   * Formulario de registro de usuario.
   * Contiene los campos de nombre, correo electrónico y contraseña con validaciones.
   */
  registerForm: FormGroup;

  /**
   * Constructor del componente.
   * @param fb FormBuilder para la creación del formulario reactivo.
   * @param userService Servicio para manejar el registro de usuarios.
   * @param router Router para la navegación después del registro exitoso.
   * @param toastr Servicio de notificaciones para mostrar mensajes al usuario.
   */
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      /** Nombre del usuario, campo obligatorio */
      name: ['', Validators.required],

      /** Correo electrónico del usuario con validaciones de requerimiento y formato */
      email: ['', [Validators.required, Validators.email]],

      /** Contraseña del usuario, campo obligatorio */
      password: ['', Validators.required]
    });
  }

  /**
   * Maneja el envío del formulario de registro.
   * Si el registro es exitoso, redirige al usuario a la pantalla de inicio de sesión.
   * Si hay un error, muestra un mensaje de error.
   */
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.userService.registerUser(this.registerForm.value).subscribe(
        response => {
          this.toastr.success('User registered successfully', 'Success');
          // Redirigir al login después de 2 segundos
          setTimeout(() => {
            this.router.navigate(['authentication/login']);
          }, 2000); // 2000 ms = 2 segundos
        },
        error => {
          this.toastr.error('Error registering user', 'Error');
          console.error('Error registering user', error);
        }
      );
    }
  }
}
