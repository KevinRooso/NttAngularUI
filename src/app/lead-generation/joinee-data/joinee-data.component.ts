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
  displayedColumns: string[] = ['Seq', 'eventTitle', 'name', 'email', 'contact', 'eventType', 'joiningDate', 'registrationID'];
  dataSource: any;
  joineeTableData: any = [];
  show = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    this.show = true;
    this.authService.getJoineeData().subscribe((res) => {
      this.show = false;
      res.body.forEach((element, index) => {
        let eventTypeDesc = '';
        if (element.event.webinar && !element.event.onPremise) {
          eventTypeDesc = 'Webinar';
        }
        if (element.event.onPremise && !element.event.webinar) {
          eventTypeDesc = 'On Premises';
        }
        if (element.event.webinar && element.event.onPremise) {
          eventTypeDesc = 'Both';
        }
        const obj = {
          Seq: index + 1,
          eventTitle: element.event.title,
          name: element.name,
          email: element.email,
          contact: element.phoneNumber,
          eventType: eventTypeDesc,
          joiningDate: element.createdAt,
          registrationID: element.registrationUuid,
          Status: element.event,
        };
        this.joineeTableData.push(obj);
      });
      this.dataSource = new MatTableDataSource(this.joineeTableData);
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
