import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthServiceService } from '../auth-service.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['seq', 'name', 'description', 'categoryGroup', 'createdAt'];
  dataSource: any;
  categoryData: any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.authService.getAllCategoryList().subscribe((res) => {
      res.body.forEach((element, index) => {
        const obj = {
          seq: index + 1,
          name: element.displayName,
          description: element.description,
          categoryGroup: element.categoryGroup,
          createdAt: element.createdAt,
        };
        this.categoryData.push(obj);
      });
      // this.dataSource = new MatTableDataSource(this.categoryData);
      // const catArr = res.body;
      this.dataSource = new MatTableDataSource(this.categoryData);
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
