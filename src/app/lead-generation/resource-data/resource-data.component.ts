import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-resource-data',
  templateUrl: './resource-data.component.html',
  styleUrls: ['./resource-data.component.css'],
})
export class ResourceDataComponent implements OnInit {
  displayedColumns: string[] = ['seq', 'fullName', 'email', 'title', 'type', 'createdAt'];
  dataSource: any;
  resourceType: any[] = [];
  uniqueData: any[] = [];
  refreshData: any[] = [];
  resourceData: any[] = [];
  cat = 'cat';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    this.authService.getResourceData().subscribe((res) => {
      this.refreshData = res.body;
      res.body.forEach((element) => {
        this.resourceType.push(element.type);
      });
      res.body.forEach((element, index) => {
        const obj = {
          seq: index + 1,
          fullName: element.fullName,
          email: element.email,
          title: element.title,
          type: element.type,
          createdAt: element.createdAt,
        };
        this.resourceData.push(obj);
      });
      this.uniqueData = [...new Set(this.resourceType)];
      this.dataSource = new MatTableDataSource(this.resourceData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue === 'resource') {
      this.dataSource = new MatTableDataSource(this.refreshData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      return true;
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
