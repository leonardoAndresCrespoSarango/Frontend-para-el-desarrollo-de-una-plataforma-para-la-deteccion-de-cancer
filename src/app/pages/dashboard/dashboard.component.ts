import {Component, ViewEncapsulation, ViewChild, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {UserService} from "../../services/user-service.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent implements OnInit{
  loggedInUser: any;

  constructor(private userService: UserService,private router: Router) {}

  ngOnInit(): void {
    this.userService.getLoggedInUser().subscribe(user => {
      this.loggedInUser = user;
    });
  }
  onLogout(): void {
    // Lógica de cierre de sesión aquí
    // Por ejemplo, puedes llamar a un método de UserService para cerrar sesión y limpiar la sesión
    this.userService.logout().subscribe(() => {
      this.router.navigate(['authentication/login']);
    });
  }
}
