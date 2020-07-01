import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthServiceService } from 'src/app/auth-service.service';
import { SelectionModel } from '@angular/cdk/collections';

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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private authService: AuthServiceService) {}
  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  notificationsList: any[] = [];
  ngOnInit() {
    this.show = true;
    this.authService.getUserListData().subscribe((res) => {
      this.show = false;
      res.body.forEach((element) => {
        const obj = {
          // seq: index + 1,
          name: element.fullName,
          email: element.email,
          userType: element.userType.displayName,
        };
        this.notificationTableData.push(obj);
      });
      this.dataSource = new MatTableDataSource(this.notificationTableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.getNotificationList();
    // this.authService.getNotificationList().subscribe((res) => {
    //   res.body.forEach(element => {
    //     this.notificationsList = element.displayName;
    //   });
    // });
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
    } else {
      this.flag = false;
    }
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource?.data?.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}
