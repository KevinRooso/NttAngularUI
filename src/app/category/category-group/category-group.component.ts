import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthServiceService } from 'src/app/auth-service.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-category-group',
  templateUrl: './category-group.component.html',
  styleUrls: ['./category-group.component.css'],
})
export class CategoryGroupComponent implements OnInit {
  displayedColumns: string[] = ['seq', 'name', 'createdAt', 'active'];
  dataSource: any;
  categoryGrpData: any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.authService.getCategoryGroupList().subscribe((res) => {
      res.body.forEach((element, index) => {
        let status;
        if (element.isActive === true) {
          status = 'Active';
        }
        if (element.isActive === false) {
          status = 'Not Active';
        }
        const obj = {
          seq: index + 1,
          name: element.name,
          displayName: element.displayName,
          createdAt: element.createdAt,
          active: status,
        };
        this.categoryGrpData.push(obj);
      });
      // this.dataSource = new MatTableDataSource(this.categoryGrpData);
      // const catArr = res.body;
      this.categoryGrpData.map((i) => {
        if (i.displayName === '') {
          i.displayName = i.name;
        }
      });
      this.categoryGrpData.sort((a, b) => a.displayName.localeCompare(b.displayName));
      this.dataSource = new MatTableDataSource(this.categoryGrpData);
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
