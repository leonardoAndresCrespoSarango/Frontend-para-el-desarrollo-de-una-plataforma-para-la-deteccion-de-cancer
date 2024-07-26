import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from "../../../services/user-service.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

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
