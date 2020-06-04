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
  displayedColumns: string[] = [
    'seq',
    'Name',
    'Duration',
    'categoryType',
    'userType',
    'templateName',
    'template',
    'isPublish',
    'actionsColumn',
  ];
  dataSource: any;
  notificationTableData: any = [];
  roleData: any = [];
  uniqueData: any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    this.authService.getNotificationList().subscribe((res) => {
      res.body.forEach((element, index) => {
        const obj = {
          seq: index + 1,
          Name: element.displayName,
          Duration: element.visibilityDurationInSec,
          categoryType: element.categoryTypeId.name,
          userType: element.targetUserType.name,
          templateName: element.template.name,
          template: element.template.template,
          isPublish: element.template.publish,
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
