import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  displayedColumns: string[] = ['seq', 'Name', 'Duration', 'userType', 'internal', 'isPublish', 'notificationMode', 'actionsColumn'];
  dataSource: any;
  notificationTableData: any = [];
  roleData: any = [];
  uniqueData: any[] = [];
  show = false;
  // text:any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    this.show = true;
    this.authService.getNotificationList().subscribe((res) => {
      this.show = false;
      res.body.forEach((element, index) => {
        let status;
        let internals;
        if (element.template.publish === true) {
          status = 'Yes';
        }
        if (element.template.publish === false) {
          status = 'No';
        }
        if (element.template.publish === null) {
          status = 'No';
        }
        if (element.internal === true) {
          internals = 'Yes';
        }
        if (element.internal === false) {
          internals = 'No';
        }
        if (element.internal === null) {
          internals = 'No';
        }
        let text;
        if (element.notificationMode === 'push_notification') {
          text = 'Mobile';
        } else {
          text = 'Email';
        }

        const obj = {
          seq: index + 1,
          Name: element.displayName,
          Duration: element.visibilityDurationInSec,
          userType: element.targetUserType.displayName,
          isPublish: status,
          internal: internals,
          notificationMode: text,
          id: element.id,
        };
        this.notificationTableData.push(obj);
      });
      this.dataSource = new MatTableDataSource(this.notificationTableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
