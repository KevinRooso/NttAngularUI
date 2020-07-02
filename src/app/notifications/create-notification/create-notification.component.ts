import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.component.html',
  styleUrls: ['./create-notification.component.css'],
})
export class CreateNotificationComponent implements OnInit {
  createUserForm: FormGroup;
  checkError: any;
  submitted = false;
  userList: any[] = [];
  allData: any[] = [];
  show = false;
  modeList: any[] = [];
  modes: any;
  emailFlag = false;
  mobileFlag = false;
  constructor(
    private frmbuilder: FormBuilder,
    private authService: AuthServiceService,
    private location: Location,
    public snackBar: MatSnackBar,
    private router: Router
  ) {
    this.createUserForm = this.frmbuilder.group({
      displayName: ['', Validators.required],
      visibilityDurationInSec: ['', Validators.required],
      categoryTypeId: ['', Validators.required],
      targetUserTypeId: ['', Validators.required],
      notiTemplate: ['', Validators.required],
      notificationMode: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.createUserForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.createUserForm.controls[controlName].hasError(errorName);
      }
    };
    this.getUserList();
    this.getCategoryDetails();
    this.getChannelList();
  }
  onModeChange(event) {
    if (event.value === 'PUSH_NOTIFICATION') {
      this.mobileFlag = true;
      this.emailFlag = false;
    }
    if (event.value === 'EMAIL') {
      this.emailFlag = true;
      this.mobileFlag = false;
    }
  }
  getUserList() {
    this.authService.getUserList().subscribe((res) => {
      this.userList = res.body;
      if (this.userList != null) {
        this.userList = this.userList.filter((m) => {
          return m.id !== 9;
        });
      }
      if (this.userList != null) {
        this.userList = this.userList.filter((m) => {
          return m.id !== 10;
        });
      }
    });
  }
  getCategoryDetails() {
    this.authService.getCategoryListByGroup('notification').subscribe((res) => {
      this.allData = res.body;
    });
  }
  getChannelList() {
    this.authService.getChannelList().subscribe((res) => {
      this.modeList = res.body;
    });
  }

  createUser() {
    if (this.createUserForm.valid) {
      this.show = true;
      const obj = {
        displayName: this.createUserForm.controls['displayName'].value,
        visibilityDurationInSec: this.createUserForm.controls['visibilityDurationInSec'].value,
        categoryTypeId: this.createUserForm.controls['categoryTypeId'].value,
        targetUserTypeId: this.createUserForm.controls['targetUserTypeId'].value,
        notificationMode: this.createUserForm.controls['notificationMode'].value,
        id: 0,
        template: {
          title: this.createUserForm.controls['displayName'].value,
          template: this.createUserForm.controls['notiTemplate'].value,
          id: 0,
        },
      };
      this.authService.saveNotification(obj).subscribe(
        (_response) => {
          this.snackBar.open('Notification successfully created', 'Close', { duration: 5000 });
          this.submitted = false;
          this.show = false;
          this.router.navigate(['/notification-management/notification']);
        },
        (_error) => {
          this.show = false;
          this.snackBar.open('Oops, Something went wrong', 'Close', {
            duration: 5000,
          });
        }
      );
    } else {
      this.show = false;
      this.snackBar.open('Please fill all mandatory input field', 'Close', { duration: 5000 });
    }
  }
  BackMe() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
