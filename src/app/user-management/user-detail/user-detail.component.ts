import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  panelOpenState = false;
  roleData: any[] = [];
  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.authService.getRolesList().subscribe((res) => {
      this.roleData = res.body;
    });
  }
}
