import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-invitees-data',
  templateUrl: './invitees-data.component.html',
  styleUrls: ['./invitees-data.component.css'],
})
export class InviteesDataComponent implements OnInit {
  displayedColumns: string[] = ['seq', 'title', 'name', 'email', 'contact', 'joiningDate'];
  dataSource: any;
  inviteeData: any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private authService: AuthServiceService) {}
  ngOnInit() {
    this.authService.getInviteesData().subscribe((res) => {
      res.body.forEach((element, index) => {
        const obj = {
          seq: index + 1,
          title: element.title,
          name: element.fullName,
          email: element.email,
          contact: element.phone,
          joiningDate: element.createdAt,
        };
        this.inviteeData.push(obj);
      });
      this.dataSource = new MatTableDataSource(this.inviteeData);
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
