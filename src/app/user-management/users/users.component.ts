import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthServiceService } from 'src/app/auth-service.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['seq', 'Name', 'Email', 'roles', 'Status', 'actionsColumn'];
  dataSource: any;
  userTableData: any = [];
  roleData: any = [];
  uniqueData: any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    this.authService.getEmployeeUserList().subscribe((res) => {
      res.body.forEach((element, index) => {
        let status = '';
        if (element.isActive === true) {
          status = 'Active';
        }
        if (element.isActive === false) {
          status = 'Not Active';
        }
        if (element.isActive === null) {
          status = 'Not Active';
        }
        const obj = {
          seq: index + 1,
          Name: element.fullName,
          Email: element.email,
          Status: status,
          id: element.id,
          roles: element.roles,
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
}
