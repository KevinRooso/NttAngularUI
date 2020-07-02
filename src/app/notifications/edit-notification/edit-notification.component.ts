import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-notification',
  templateUrl: './edit-notification.component.html',
  styleUrls: ['./edit-notification.component.css'],
})
export class EditNotificationComponent implements OnInit {
  updateNotificationForm: FormGroup;
  checkError: any;
  submitted = false;
  userList: any[] = [];
  allData: any[] = [];
  notificationData: any = {};
  notiID: any;
  selected3 = '';
  selected4 = '';
  selected5 = '';
  tempId = '';
  modeList: any[] = [];
  modes: any;
  emailFlag = false;
  mobileFlag = false;
  disabled = false;
  constructor(
    private frmbuilder: FormBuilder,
    private authService: AuthServiceService,
    private location: Location,
    public snackBar: MatSnackBar,
    private router: Router,
    private router1: ActivatedRoute
  ) {
    this.updateNotificationForm = this.frmbuilder.group({
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
          return this.updateNotificationForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.updateNotificationForm.controls[controlName].hasError(errorName);
      }
    };

    this.getUserList();
    this.getCategoryDetails();
    this.getChannelList();
    this.router1.params.subscribe((params) => {
      this.notiID = params.page;
      this.getNotificationData(params.page);
    });
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
  getDisabledValue() {
    return true;
  }

  getCategoryDetails() {
    this.authService.getCategoryListByGroup('Notification').subscribe((res) => {
      this.allData = res.body;
    });
  }
  getChannelList() {
    this.authService.getChannelList().subscribe((res) => {
      this.modeList = res.body;
    });
  }
  getNotificationData(id) {
    this.authService.geNotificationDetails(id).subscribe((res) => {
      this.notificationData = res.body;
      this.tempId = res.body.template.id;
      this.selected3 = res.body.targetUserType.id;
      this.selected4 = res.body.categoryTypeId.id;
      if (this.notificationData.categoryTypeId !== null) {
        this.updateNotificationForm.controls['categoryTypeId'].setValue(this.notificationData.categoryTypeId.id);
      }
      this.updateNotificationForm.controls['targetUserTypeId'].setValidators(null);
      this.updateNotificationForm.controls['targetUserTypeId'].updateValueAndValidity();
      this.updateNotificationForm.controls['targetUserTypeId'].setValue(this.notificationData.targetUserType.id);
      this.updateNotificationForm.controls['displayName'].setValue(this.notificationData.displayName);
      this.notificationData.visibilityDurationInSec = this.notificationData.visibilityDurationInSec / 60;
      this.updateNotificationForm.controls['visibilityDurationInSec'].setValue(this.notificationData.visibilityDurationInSec);
      this.updateNotificationForm.controls['notiTemplate'].setValue(this.notificationData.template.template);
      this.updateNotificationForm.controls['notificationMode'].setValidators(null);
      this.updateNotificationForm.controls['notificationMode'].updateValueAndValidity();
      this.updateNotificationForm.controls['notificationMode'].setValue(this.notificationData.notificationMode);
    });
  }
  createUser() {
    if (this.updateNotificationForm.valid) {
      const obj = {
        displayName: this.updateNotificationForm.controls['displayName'].value,
        visibilityDurationInSec: this.updateNotificationForm.controls['visibilityDurationInSec'].value,
        categoryTypeId: this.updateNotificationForm.controls['categoryTypeId'].value,
        targetUserTypeId: this.updateNotificationForm.controls['targetUserTypeId'].value,
        id: this.notiID,
        template: {
          title: this.updateNotificationForm.controls['displayName'].value,
          template: this.updateNotificationForm.controls['notiTemplate'].value,
          id: this.tempId,
        },
      };
      this.authService.saveNotification(obj).subscribe(
        (_response) => {
          this.snackBar.open('Notification successfully updated', 'Close', { duration: 5000 });
          this.submitted = false;
          this.router.navigate(['/notification-management/notification']);
        },
        (_error) => {
          this.snackBar.open('Oops, Something went wrong', 'Close', {
            duration: 5000,
          });
        }
      );
    } else {
      this.snackBar.open('Please fill all mandatory input field', 'Close', { duration: 5000 });
    }
  }

  BackMe() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
