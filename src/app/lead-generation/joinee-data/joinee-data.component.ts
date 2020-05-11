import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-joinee-data',
  templateUrl: './joinee-data.component.html',
  styleUrls: ['./joinee-data.component.css'],
})
export class JoineeDataComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phoneNumber', 'eventId', 'userId'];
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    this.authService.getJoineeData().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.body);
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
