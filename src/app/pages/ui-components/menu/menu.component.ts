import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class AppMenuComponent {
  generateTokenForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.generateTokenForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.generateTokenForm.valid) {
      this.userService.generateResetToken(this.generateTokenForm.value).subscribe(
        response => {
          console.log('Reset token generated', response);
          alert(`Reset token for ${this.generateTokenForm.value.email}: ${response.token}`);
        },
        error => {
          console.error('Token generation failed', error);
        }
      );
    }
  }
}
