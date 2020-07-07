import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthServiceService } from 'src/app/auth-service.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css'],
})
export class CampaignComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'userType', 'email'];
  selection = new SelectionModel(true, []);
  dataSource: any;
  notificationTableData: any = [];
  roleData: any = [];
  uniqueData: any[] = [];
  show = false;
  allData: any;
  row: any;
  checked = false;
  flag = false;
  notid: any;
  ids: any[] = [];
  roleIdArray = [];
  checked1: boolean;
  checked2: boolean;
  notificationsList: any[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private authService: AuthServiceService, public snackBar: MatSnackBar, private router: Router) {}
  ngOnInit() {
    this.show = true;
    this.authService.getUserListData().subscribe((res) => {
      this.show = false;
      res.body.forEach((element) => {
        const obj = {
          name: element.fullName,
          email: element.email,
          userType: element.userType.displayName,
          id: element.id,
        };
        this.notificationTableData.push(obj);
      });
      this.dataSource = new MatTableDataSource(this.notificationTableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.getNotificationList();
  }
  getNotificationList() {
    this.authService.getNotificationList().subscribe((res) => {
      this.allData = res.body;
      this.allData = this.allData.reverse();
      this.allData.map((i) => {
        if (i.displayName === '') {
          i.displayName = i.name;
        }
      });
    });
  }

  onChange() {
    if (this.checked === true) {
      this.flag = true;
      this.checked1 = false;
      this.checked2 = false;
    } else {
      this.flag = false;
      this.checked1 = false;
      this.checked2 = false;
    }
  }

  onCheckChange(event) {
    if (event.checked) {
      // Add a new control in the arrayForm
      this.ids.push(event.source.value);
    } else {
      this.ids.forEach((item, index, object) => {
        if (item === event.source.value) {
          object.splice(index, 1);
        }
      });
    }
  }

  onSubmit() {
    if (this.checked1 === true) {
      this.ids = [];
      this.ids.push(7);
    }
    if (this.checked2 === true) {
      this.ids.push(8);
    }
    this.authService.sendNotification(this.notid, this.ids).subscribe(
      (_res) => {
        this.snackBar.open('Notification successfully sent', 'Close', { duration: 5000 });
        this.router.navigate(['/notification-management/notification']);
      },
      (_error) => {
        this.snackBar.open('Oops, Something went wrong', 'Close', {
          duration: 5000,
        });
      }
    );
  }
}
