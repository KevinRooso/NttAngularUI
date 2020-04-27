import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private service: AuthServiceService) {}
  userName;
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token != null) {
      this.service.getUserDetail().subscribe((res) => {
        this.userName = res.name;
      });
    }
  }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
