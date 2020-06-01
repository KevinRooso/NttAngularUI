import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  displayedColumns: string[] = ['seq', 'Name', 'Privileges', 'actionsColumn'];
  dataSource: any;
  resourceType: any[] = [];
  apiData: any[] = [];
  refreshData: any[] = [];
  userTableData: any[] = [];
  cat = 'cat';
  privModal: any;
  roleName: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.authService.getRoleList().subscribe((res) => {
      res.body.forEach((element, index) => {
        const obj = {
          seq: index + 1,
          Name: element.displayName,
          Privileges: element.privileges,
        };
        this.userTableData.push(obj);
      });
      // this.refreshData = res.body;
      // this.dataSource = new MatTableDataSource(this.userTableData);
      // this.dataSource = new MatTableDataSource(res.body);
      // this.userTableData = res.body;
      this.userTableData.sort((a, b) => a.Name.localeCompare(b.Name));
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
  getprivmodel(privileges, Name) {
    this.privModal = privileges;
    this.roleName = Name;
  }
}
