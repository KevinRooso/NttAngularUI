import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthServiceService } from 'src/app/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-participants-preview',
  templateUrl: './participants-preview.component.html',
  styleUrls: ['./participants-preview.component.css'],
})
export class ParticipantsPreviewComponent implements OnInit {
  displayedColumns: string[] = ['Select', 'eventName', 'name', 'email', 'phoneNumber', 'actionStatus', 'Action'];
  dataSource: any;
  eName = 'List of all Participants';
  refreshData: any[] = [];
  counter = 0;
  cat = 'cat';
  bulkIdArr: any[] = [];
  isActive: boolean;
  show = false;
  url: any;
  allChecked = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  currentData: any;

  constructor(private authService: AuthServiceService, private queryString: ActivatedRoute, public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.queryString.params.subscribe((params) => {
      $.fn.dataTable.ext.errMode = 'none';
      if (params.page === undefined) {
        this.url = 'all';
      } else {
        this.eName = 'Event: ' + params.name;
        this.url = params.page;
      }

      this.getTableData(this.url);
    });
  }

  getTableData(url) {
    this.counter = 0;
    this.show = true;
    if (url === 'all') {
      this.authService.getAllParticipants().subscribe((res) => {
        this.refreshData = res.body;
        this.refreshData.map((i) => {
          if (i.approverId == null) {
            i.checked = false;
            this.counter++;
          } else {
            i.checked = null;
          }
          if (i.registrationStatus) {
            i.actionStatus = 'Approved';
          } else {
            i.actionStatus = 'Rejected';
          }
        });
        this.dataSource = new MatTableDataSource(this.refreshData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.show = false;
      });
    } else {
      this.authService.getParticipant(url).subscribe((res) => {
        this.refreshData = res.body;
        this.refreshData.map((i) => {
          if (i.approverId == null) {
            i.checked = false;
            this.counter++;
          } else {
            i.checked = null;
          }
          if (i.registrationStatus) {
            i.actionStatus = 'Approved';
          } else {
            i.actionStatus = 'Rejected';
          }
        });
        this.dataSource = new MatTableDataSource(this.refreshData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.show = false;
      });
    }
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

  bulkId(event) {
    if (event.checked) {
      this.bulkIdArr.push(event.source.value);
      if (this.bulkIdArr.length === this.counter) {
        this.allChecked = true;
      }
    } else {
      if (this.bulkIdArr.length === this.counter) {
        this.allChecked = false;
      }
      this.bulkIdArr.forEach((item, index, object) => {
        if (item === event.source.value) {
          object.splice(index, 1);
        }
      });
    }
  }

  toggleActive(flag, id) {
    this.isActive = flag;
    this.currentData = id;
  }

  changeApprove(isApproved) {
    if (isApproved) {
      this.someClickHandler(this.currentData);
    } else {
      this.someClickHandler2(this.currentData);
    }
  }

  someClickHandler(data) {
    this.show = true;
    this.authService.updateParticipantStatus(data, true).subscribe(
      (_res) => {
        this.counter = this.counter - 1;
        this.dataSource.data
          .filter((i) => i.id === data)
          .map((i) => {
            i.approverId = 'done';
            i.registrationStatus = true;
            i.actionStatus = 'Approved';
          });
        // $('td .showIdButton', row).html('Approved');
        // $('td:nth-child(8) .mydiv', row).html('Approved');
        // // $('td:nth-child(7) .reject', row).css('cursor','default');
        // $('td:nth-child(8) .approve', row).unbind();
        this.snackBar.open('Approved!!', 'Close', { duration: 5000 });
        this.show = false;
      },
      (_error) => {
        this.snackBar.open('Oops, Something Went Wrong', 'Close', { duration: 5000 });
        this.show = false;
      }
    );
  }

  someClickHandler2(data) {
    this.show = true;
    this.authService.updateParticipantStatus(data, false).subscribe(
      (_res) => {
        this.counter = this.counter - 1;
        this.dataSource.data
          .filter((i) => i.id === data)
          .map((i) => {
            i.approverId = 'done';
            i.registrationStatus = false;
            i.actionStatus = 'Rejected';
          });
        // $('td .showIdButton', row).html('Rejected');
        // $('td:nth-child(8) .mydiv', row).html('Rejected');
        // // $('td:nth-child(7) .approve', row).css('cursor','default');
        // // $('td:nth-child(7) .reject', row).css('cursor','default');
        // $('td:nth-child(8) .reject', row).unbind();

        this.snackBar.open('Rejected!!', 'Close', { duration: 5000 });
        this.show = false;
      },
      (_error) => {
        this.snackBar.open('Oops, Something Went Wrong', 'Close', { duration: 5000 });
        this.show = false;
        // alert("something went wrong");
      }
    );
  }

  selectAll(event) {
    if (event.checked) {
      this.dataSource.data.map((i) => (i.checked = true));
      this.bulkIdArr = this.refreshData.filter((i) => i.approverId == null).map((i) => (i = i.id));
    } else {
      this.dataSource.data.map((i) => (i.checked = false));
      this.bulkIdArr = [];
    }
  }

  approveBulk(flag) {
    this.isActive = flag;
  }

  bulkApprove(flag) {
    if (flag) {
      this.show = true;
      this.authService.bulkApproveParticipant(this.bulkIdArr, true).subscribe(
        (_res) => {
          this.counter = this.counter - this.bulkIdArr.length;
          this.allChecked = false;
          if (this.bulkIdArr.length === 1) {
            this.snackBar.open('Approved!!', 'Close', { duration: 5000 });
          } else {
            this.snackBar.open('All Approved!!', 'Close', { duration: 5000 });
          }
          this.getTableData(this.url);
          this.bulkIdArr = [];
        },
        (_error) => {
          this.snackBar.open('Oops, Something Went Wrong', 'Close', { duration: 5000 });
          this.show = false;
          // alert("something went wrong");
        }
      );
    } else {
      this.show = true;
      this.authService.bulkApproveParticipant(this.bulkIdArr, false).subscribe(
        (_res) => {
          this.counter = this.counter - this.bulkIdArr.length;
          this.allChecked = false;
          this.snackBar.open('Rejected!!', 'Close', { duration: 5000 });
          this.getTableData(this.url);
          this.bulkIdArr = [];
        },
        (_error) => {
          this.snackBar.open('Oops, Something Went Wrong', 'Close', { duration: 5000 });
          this.show = false;
          // alert("something went wrong");
        }
      );
    }
  }
}
