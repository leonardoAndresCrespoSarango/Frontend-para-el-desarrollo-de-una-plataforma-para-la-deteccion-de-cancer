import { Component, OnInit } from '@angular/core';
import {MedicalReportService} from "../../../services/medical-resport-service.service";
import {UserService} from "../../../services/user-service.service";

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.components.scss'],

})
export class AppBadgeComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

}
