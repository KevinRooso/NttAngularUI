import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail-notification',
  templateUrl: './detail-notification.component.html',
  styleUrls: ['./detail-notification.component.css'],
})
export class DetailNotificationComponent implements OnInit {
  notificationData: any = {};
  id: any;
  isActive = false;
  usrId: any;
  status: any;
  flag: any;
  constructor(private service: AuthServiceService, private queryString: ActivatedRoute, public snackBar: MatSnackBar) {}
  event: any = {};
  ngOnInit(): void {
    this.queryString.params.subscribe((params) => {
      this.usrId = params.page;
      this.getNotificationData(params.page);
    });
  }
  getNotificationData(id) {
    this.service.geNotificationDetails(id).subscribe((res) => {
      this.notificationData = res.body;
      if (this.notificationData.approverId === 0) {
        this.status = false;
      } else {
        this.status = true;
      }
      if (this.notificationData.internal === false) {
        this.flag = false;
      }
      if (this.notificationData.internal === true) {
        this.flag = true;
      }
    });
  }
  reverseChanges() {}
  changeStatus() {
    this.service.approveNotifications(this.usrId, this.status).subscribe(
      (_res) => {
        this.snackBar.open('SUCCESS!!', 'Close', { duration: 5000 });
      },
      (_error) => {
        this.isActive = !this.isActive;
        this.snackBar.open('Oops something went wrong', 'Close', { duration: 5000 });
      }
    );
  }
}
