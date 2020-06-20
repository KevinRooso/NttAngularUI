import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  show = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.show = true;
    this.authService.getAllCategoryList().subscribe((res) => {
      this.show = false;
      res.body.forEach((element, index) => {
        const obj = {
          seq: index + 1,
          name: element.displayName,
          description: element.description,
          categoryGroup: element.categoryGroup.name.toLowerCase(),
          createdAt: element.createdAt,
        };
        this.categoryData.push(obj);
      });
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
