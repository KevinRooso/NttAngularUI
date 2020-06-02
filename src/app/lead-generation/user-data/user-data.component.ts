import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthServiceService } from 'src/app/auth-service.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserDataComponent implements OnInit {
  columnsToDisplay: string[] = ['S.No.', 'Name', 'Email', 'Contact', 'User Type', 'Status'];
  dataSource: any;
  expandedElement: any;
  userTableData: any = [];
  userData: any = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    this.authService.getUserListData().subscribe((res) => {
      res.body.forEach((element, index) => {
        const arrtype = element.sourceOfCreation;
        let deviceType = '';
        arrtype.forEach((elem) => {
          deviceType = deviceType + elem.deviceType;
        });
        let status = '';
        if (element.active === true) {
          status = 'Active';
        }
        if (element.active === false) {
          status = 'Not Active';
        }
        const obj = {
          'S.No.': index + 1,
          Name: element.fullName,
          Email: element.email,
          Contact: element.phoneNumber,
          'User Type': element.userType.displayName,
          Status: status,
          ID: element.id,
        };
        this.userTableData.push(obj);
      });
      this.dataSource = new MatTableDataSource(this.userTableData);
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
  getID(ID) {
    this.authService.getDeviceList(ID).subscribe((res) => {
      this.userData = res.body;
    });
  }
}
