import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user-service.service";

@Component({
  selector: 'app-tooltips',
  templateUrl: './tooltips.component.html',
})
export class AppTooltipsComponent implements OnInit{
  resetPasswordForm: FormGroup;
  token: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.token = ''; // Inicialización de la propiedad
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const formData = { password: this.resetPasswordForm.value.password };
      this.userService.resetPassword(this.token, formData).subscribe(
        response => {
          console.log('Password reset successful', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Password reset failed', error);
        }
      );
    }
  }
}
