import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  userRoles: any;
  flag = false;
  userType: any;
  constructor(private service: AuthServiceService) {}

  ngOnInit(): void {
    this.service.getUserDetail().subscribe((res) => {
      this.userRoles = res.roles;
      this.userType = res.userType;
      this.userRoles.forEach((i) => {
        if (i.name === 'ADMIN_EMPLOYEE_USER') {
          this.flag = true;
        }
      });
      if (this.userType.id === 10) {
        this.flag = true;
      }
    });
  }
}
