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
  displayedColumns: string[] = ['position', 'name', 'createdAt', 'active'];
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.authService.getCategoryGroupList().subscribe((res) => {
      const catArr = res.body;
      catArr.map((i) => {
        if (i.displayName === '') {
          i.displayName = i.name;
        }
      });
      catArr.sort((a, b) => a.displayName.localeCompare(b.displayName));
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
