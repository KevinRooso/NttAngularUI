import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthServiceService } from '../auth-service.service';
import cronstrue from 'cronstrue';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  displayedColumns: string[] = ['seq', 'name', 'schedule', 'action'];
  dataSource: any;
  jobsData: any[] = [];
  show = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private service: AuthServiceService) {}

  ngOnInit(): void {
    this.show = true;
    this.service.getJobsList().subscribe((res) => {
      this.show = false;
      res.body.forEach((element, index) => {
        element.schedulerName = element.schedulerName.replace(/_/g, ' ');
        const displayName = element.schedulerName.charAt(0).toUpperCase() + element.schedulerName.slice(1);
        const obj = {
          id: element.id,
          seq: index + 1,
          name: displayName,
          schedule: cronstrue.toString(element.scheduleTime),
        };
        this.jobsData.push(obj);
      });
      this.dataSource = new MatTableDataSource(this.jobsData);
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
