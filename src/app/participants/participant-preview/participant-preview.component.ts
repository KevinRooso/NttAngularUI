import { Component, ViewChild } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var $;
@Component({
  selector: 'app-participant-preview',
  templateUrl: './participant-preview.component.html',
  styleUrls: ['./participant-preview.component.css'],
})
export class ParticipantPreviewComponent {
  dataSource = new BehaviorSubject<any[]>([]);
  dataTable: any;
  tableData: any[] = [];
  eName = 'List of all Participants';
  dtOptions: DataTables.Settings = {};
  @ViewChild('datatable', { static: true }) table;
  tabled;
  show = false;
  constructor(
    private service: AuthServiceService,
    private router: Router,
    private queryString: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {}
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    // this.service.getAllParticipants().subscribe(res=>{
    //   this.tableData=res.body;
    //   console.log(this.tableData);
    //   this.dataSource.next(this.tableData);
    // })
    this.queryString.queryParams.subscribe((params) => {
      $.fn.dataTable.ext.errMode = 'none';
      let url;
      if (params.page === undefined) {
        url = environment.API_ENDPOINT + 'api/public/participants';
      } else {
        this.eName = 'Event: ' + params.name;
        url = environment.API_ENDPOINT + 'api/public/participants/event/' + params.page;
      }

      this.getTableData(url);
    });
  }
  getTableData(url) {
    this.dtOptions = {
      order: [],
      ajax: {
        url,
        type: 'GET',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        dataSrc: 'body',
      },
      columns: [
        {
          title: 'Event Name',
          data: 'eventName',
        },
        {
          title: 'Participants Name',
          data: 'name',
        },
        {
          title: 'Email Id',
          data: 'email',
        },
        {
          title: 'Contact No.',
          data: 'phoneNumber',
        },
        {
          title: 'Org Name',
          defaultContent: '-',
        },

        {
          title: 'Status',
          // tslint:disable-next-line:quotemark
          defaultContent: "<span  ' class='badge showIdButton' >Approved</span>",
        },

        {
          title: 'Action',

          // tslint:disable-next-line:max-line-length
          defaultContent:
            // tslint:disable-next-line:quotemark
            "<div class='mydiv' style='width: 85px'><span   class='btn btn-success approve'" +
            // tslint:disable-next-line:quotemark
            "style='cursor: pointer;font-size: 10px;' ><i class='fa fa-check' style='font-size:" +
            // tslint:disable-next-line:quotemark
            "1rem;'></i></span>&nbsp;<span   class='btn btn-danger reject' style='cursor: pointer;" +
            // tslint:disable-next-line:quotemark
            "font-size: 10px;' ><i class='fa fa-close' style='font-size: 1rem;'></i></span></div>",
        },
      ],
      // tslint:disable-next-line:ban-types
      rowCallback: (row: Node, data: any[] | Object, _index: number) => {
        const self = this;

        $('td:nth-child(3)', row).css('cursor', 'pointer');
        $('td:nth-child(3)', row).bind('click', () => {
          self.someClickHandler1(data);
        });

        if (data['eventName'] == null) {
          $('td:nth-child(1)', row).html(this.eName);
        }

        $('td:nth-child(1) ', row).attr('width', '250px');
        if (data['approverId'] == null) {
          $('td .showIdButton', row).html('Pending');
          $('td:nth-child(7) .approve', row).attr('disabled', true);
        }

        if (data['approverId'] == null) {
          $('td .showIdButton', row).html('Pending');
          $('td:nth-child(7) .approve', row).attr('disabled', true);

          // Object.keys(data).forEach((key,index)=>{
          //   if(key=='email'){
          //     console.log("email");

          //   }
          // })

          // $('td', row).unbind('click');
          $('td:nth-child(7) .approve', row).bind('click', () => {
            self.someClickHandler(data, row);
          });
          $('td:nth-child(7) .reject', row).bind('click', () => {
            self.someClickHandler2(data, row);
          });
        } else {
          // $('td:nth-child(7) .approve', row).css('cursor','default')
          // $('td:nth-child(7) .reject', row).css('cursor','default')
          if (data['registrationStatus']) {
            $('td .showIdButton', row).html('Approved');
            $('td:nth-child(7) .mydiv', row).html('Approved');
          }
          if (!data['registrationStatus']) {
            $('td .showIdButton', row).html('Rejected');
            $('td:nth-child(7) .mydiv', row).html('Rejected');
          }
        }
        return row;
      },
    };
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOptions);
  }
  someClickHandler(data, row) {
    this.show = true;
    this.service.updateParticipantStatus(data.id, true).subscribe(
      (_res) => {
        $('td .showIdButton', row).html('Approved');
        $('td:nth-child(7) .mydiv', row).html('Approved');
        // $('td:nth-child(7) .reject', row).css('cursor','default');
        $('td:nth-child(7) .approve', row).unbind();
        this.snackBar.open('Approved!!', 'Close', { duration: 5000 });
        this.show = false;
      },
      (_error) => {
        this.snackBar.open('Oops, Something Went Wrong', 'Close', { duration: 5000 });
        this.show = false;
      }
    );
  }
  someClickHandler2(data, row) {
    this.show = true;
    this.service.updateParticipantStatus(data.id, false).subscribe(
      (_res) => {
        $('td .showIdButton', row).html('Rejected');
        $('td:nth-child(7) .mydiv', row).html('Rejected');
        // $('td:nth-child(7) .approve', row).css('cursor','default');
        // $('td:nth-child(7) .reject', row).css('cursor','default');
        $('td:nth-child(7) .reject', row).unbind();

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
  someClickHandler1(data) {
    this.router.navigate(['/participants/participant-details',data.id]);
  }
}
