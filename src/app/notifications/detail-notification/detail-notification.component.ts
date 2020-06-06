import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-detail-notification',
  templateUrl: './detail-notification.component.html',
  styleUrls: ['./detail-notification.component.css'],
})
export class DetailNotificationComponent implements OnInit {
  notificationData: any = {};
  id: any;
  constructor(private service: AuthServiceService, private queryString: ActivatedRoute) {}
  event: any = {};
  ngOnInit(): void {
    this.queryString.params.subscribe((params) => {
      this.getNotificationData(params.page);
    });
  }
  getNotificationData(id) {
    this.service.geNotificationDetails(id).subscribe((res) => {
      this.notificationData = res.body;
    });
  }
  reverseChanges() {}
  changeStatus() {}
}
