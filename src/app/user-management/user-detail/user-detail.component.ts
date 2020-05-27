import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  panelOpenState = false;
  roleData: any[] = [];
  value: any;
  rolesArray: any[] = [];
  usrId: any;
  show = false;
  isActive = false;
  userData: any = [];
  constructor(
    private authService: AuthServiceService,
    private router1: ActivatedRoute,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router1.params.subscribe((params) => {
      this.usrId = params.page;
    });
    this.authService.getRoleList().subscribe((res) => {
      this.roleData = res.body;
    });
    this.getDetails(this.usrId);
  }
  onCheckChange(event) {
    if (event.checked) {
      // Add a new control in the arrayForm
      this.rolesArray.push(event.source.value);
    } else {
      this.rolesArray.forEach((item, index, object) => {
        if (item === event.source.value) {
          object.splice(index, 1);
        }
      });
    }
  }
  assignRoles() {
    this.show = true;
    const obj = {
      roleList: this.rolesArray,
      userId: this.usrId,
    };
    this.authService.assignRoles(obj).subscribe(
      (_response) => {
        this.show = false;
        this.snackBar.open('Role successfully assigned', 'Close', {
          duration: 2000,
        });
        this.router.navigate(['user']);
      },
      (_error) => {
        this.show = false;
        this.snackBar.open('Oops, Something went wrong', 'Close', {
          duration: 5000,
        });
      }
    );
  }
  reverseChanges() {
    this.isActive = !this.isActive;
  }
  getDetails(usrId: any) {
    this.authService.getUserDetails(usrId).subscribe((res) => {
      this.userData = res.body;
    });
  }
  changeStatus() {
    this.authService.updateUserStatus(this.usrId, this.isActive).subscribe(
      (_res) => {
        this.snackBar.open('SUCCESS!!', 'Close', { duration: 5000 });
      },
      (_error) => {
        this.isActive = !this.isActive;
        this.snackBar.open('You do not have the permission to Publish or UnPublish it', 'Close', { duration: 5000 });
      }
    );
  }
}
