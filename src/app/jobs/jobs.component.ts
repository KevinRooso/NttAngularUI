import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthServiceService } from '../auth-service.service';
import cronstrue from 'cronstrue';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  displayedColumns: string[] = ['seq', 'displayName', 'schedule', 'action'];
  dataSource: any;
  jobId: any;
  jobName: any;
  jobsData: any[] = [];
  schedules = [
    {
      name: cronstrue.toString('0 */1 * ? * *'),
      cron: '0 */1 * ? * *',
    },
    {
      name: cronstrue.toString('0 * * * *'),
      cron: '0 * * * *',
    },
    {
      name: cronstrue.toString('0 0 0 * * ?'),
      cron: '0 0 0 * * ?',
    },
    {
      name: cronstrue.toString('0 0 * * 6,0'),
      cron: '0 0 * * 6,0',
    },
    {
      name: cronstrue.toString('0 0 * * 1-5'),
      cron: '0 0 * * 1-5',
    },
    {
      name: cronstrue.toString('0 0 1 * *'),
      cron: '0 0 1 * *',
    },
    {
      name: cronstrue.toString('0 0 31 3 *'),
      cron: '0 0 31 3 *',
    },
  ];
  show = false;
  chosenSchedule: any;
  editCronForm: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('closeModel', { static: true }) closeModel;

  constructor(private service: AuthServiceService, private frmbuilder: FormBuilder) {}

  ngOnInit(): void {
    this.show = true;
    this.editCronForm = this.frmbuilder.group({
      cron: ['', Validators.required],
    });
    this.getJobsData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getJobsData() {
    this.jobsData = [];
    this.service.getJobsList().subscribe((res) => {
      res.body.forEach((element, index) => {
        let dName = element.schedulerName.replace(/_/g, ' ');
        dName = dName.charAt(0).toUpperCase() + dName.slice(1);
        const obj = {
          id: element.id,
          seq: index + 1,
          name: element.schedulerName,
          displayName: dName,
          schedule: cronstrue.toString(element.scheduleTime),
        };
        this.jobsData.push(obj);
      });
      this.dataSource = new MatTableDataSource(this.jobsData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.show = false;
    });
  }

  getJobId(id: any, name: any) {
    this.jobId = id;
    this.jobName = name;
  }

  changeSchedule() {
    const obj = {
      id: this.jobId,
      scheduleTime: this.editCronForm.controls['cron'].value,
      schedulerName: this.jobName,
    };

    this.service.editCronJob(obj).subscribe((_res) => {
      this.show = true;
      this.closeModel.nativeElement.click();
      this.getJobsData();
    });
  }
}
