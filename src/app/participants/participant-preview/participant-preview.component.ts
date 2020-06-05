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
  bulkIdArr: any[] = [];
  isActive: boolean;
  currentData: any;
  currentRow: any;
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
    this.queryString.params.subscribe((params) => {
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
          title: 'Select <input style="height:20px;width:20px;margin-left:20%;" type="checkbox" class="selectAll" />',

          defaultContent:
            '<span class="showCheckBox"><input style="height:15px;width:15px;margin-left:20%;"' +
            'type="checkbox" class="bulkCheck"></span>',

          orderable: false,
        },
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
            "style='cursor: pointer;font-size: 10px;' href='#myModal' data-toggle='modal'><i class='fa fa-check' style='font-size:" +
            // tslint:disable-next-line:quotemark
            "1rem;'></i></span>&nbsp;<span   class='btn btn-danger reject' style='cursor: pointer;" +
            // tslint:disable-next-line:quotemark
            "font-size: 10px;' href='#myModal' data-toggle='modal'><i class='fa fa-close' style='font-size: 1rem;'></i></span></div>",
        },
      ],

      headerCallback: (thead: Node, data: any[], _index: number) => {
        const self = this;

        $('.selectAll', thead)
          .off()
          .on('change', () => {
            if ($('.selectAll', thead).is(':checked')) {
              self.someClickHandler4(data, true);
            } else {
              self.someClickHandler4(data, false);
            }
          });
      },
      // tslint:disable-next-line:ban-types
      rowCallback: (row: Node, data: any[] | Object, _index: number) => {
        const self = this;

        $('td:nth-child(4)', row).css('cursor', 'pointer');
        $('td:nth-child(4)', row).bind('click', () => {
          self.someClickHandler1(data);
        });

        if (data['eventName'] == null) {
          $('td:nth-child(2)', row).html(this.eName);
        }

        $('td:nth-child(2) ', row).attr('width', '250px');
        // if (data['approverId'] == null) {
        //   $('td .showIdButton', row).html('Pending');
        //   $('td:nth-child(7) .approve', row).attr('disabled', true);
        // }

        if (data['approverId'] == null) {
          $('td .showIdButton', row).html('Pending');
          $('td:nth-child(8) .approve', row).attr('disabled', true);

          // Object.keys(data).forEach((key,index)=>{
          //   if(key=='email'){
          //     console.log("email");

          //   }
          // })

          // $('td', row).unbind('click');
          $('td:nth-child(8) .approve', row).bind('click', () => {
            this.isActive = true;
            this.currentData = data;
            this.currentRow = row;
            // self.someClickHandler(data, row);
          });
          $('td:nth-child(8) .reject', row).bind('click', () => {
            this.isActive = false;
            this.currentData = data;
            this.currentRow = row;
            // self.someClickHandler2(data, row);
          });
          $('td:nth-child(1) .bulkCheck', row)
            .off()
            .on('change', () => {
              if ($('td:nth-child(1) .bulkCheck', row).is(':checked')) {
                self.someClickHandler3(data, true);
              } else {
                self.someClickHandler3(data, false);
              }
            });
        } else {
          // $('td:nth-child(7) .approve', row).css('cursor','default')
          // $('td:nth-child(7) .reject', row).css('cursor','default')
          $('td .showCheckBox', row).html('-');
          if (data['registrationStatus']) {
            $('td .showIdButton', row).html('Approved');
            $('td:nth-child(8) .mydiv', row).html('Approved');
          }
          if (!data['registrationStatus']) {
            $('td .showIdButton', row).html('Rejected');
            $('td:nth-child(8) .mydiv', row).html('Rejected');
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
        $('td:nth-child(8) .mydiv', row).html('Approved');
        // $('td:nth-child(7) .reject', row).css('cursor','default');
        $('td:nth-child(8) .approve', row).unbind();
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
        $('td:nth-child(8) .mydiv', row).html('Rejected');
        // $('td:nth-child(7) .approve', row).css('cursor','default');
        // $('td:nth-child(7) .reject', row).css('cursor','default');
        $('td:nth-child(8) .reject', row).unbind();

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
  someClickHandler3(data, flag) {
    if (flag) {
      this.bulkIdArr.forEach((item, index, object) => {
        if (item === data.id) {
          object.splice(index, 1);
        }
      });
      this.bulkIdArr.push(data.id);
    } else {
      this.bulkIdArr.forEach((item, index, object) => {
        if (item === data.id) {
          object.splice(index, 1);
        }
      });
    }
  }

  someClickHandler4(data, flag) {
    if (flag) {
      this.bulkIdArr = data.filter((i) => i.approverId == null).map((i) => (i = i.id));
      $(':checkbox.bulkCheck').prop('checked', true);
    } else {
      this.bulkIdArr = [];
      $(':checkbox.bulkCheck').prop('checked', false);
    }
  }

  someClickHandler1(data) {
    this.router.navigate(['/participants/participant-details', data.id, 'xyz']);
  }

  approveBulk() {
    alert('Approved');
  }

  rejectBulk() {
    alert('Rejected');
  }

  changeApprove(isApproved) {
    if (isApproved) {
      this.someClickHandler(this.currentData, this.currentRow);
    } else {
      this.someClickHandler2(this.currentData, this.currentRow);
    }
  }
}
