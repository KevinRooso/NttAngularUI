import {Component, ViewChild, ElementRef} from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-participant-preview',
  templateUrl: './participant-preview.component.html',
  styleUrls: ['./participant-preview.component.css']
})
export class ParticipantPreviewComponent {
  dataSource=new BehaviorSubject<any[]>([]);
  dataTable:any;
  tableData:any[]=[];
  dtOptions: DataTables.Settings = {};
  @ViewChild('datatable',{static:true}) table;
  tabled;
  constructor(private service: AuthServiceService,private elementRef:ElementRef,private router:Router) {}
  ngOnInit(){
    // this.service.getAllParticipants().subscribe(res=>{
    //   this.tableData=res.body;
    //   console.log(this.tableData);
    //   this.dataSource.next(this.tableData);
    // })
    this.dtOptions = {
      "ajax":{
        url:"https://ntt-backend-app.herokuapp.com/api/public/participants",
        type:"GET",
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
        dataSrc:"body"
      },
      columns:[{
        title:'Event Name',
        data:'eventId'
      },
      {
        title:'Participants Name',
        data:'name'
      },
      {
        title:'Email Id',
        data:'email'
      },
      {
        title:'Contact No.',
        data:'phoneNumber'
      },
      {
        title:'Org Name',
        data:'phoneNumber'
      },

      {
         defaultContent: "<span  ' class='badge badge-success showIdButton' style='cursor: pointer'>Approved</span>"
        //defaultContent:"<button id='id'  class='showIdButton'>Show User ID</button>"
      }
    ],
    rowCallback: (row: Node, data: any[] | Object, index: number) => {
      console.log("data");
      console.log(data);
      const self = this;
      if(data['approverId']==null){
      $('td span', row).removeClass("badge-success");
        $('td span', row).addClass("badge-warning");
        $('td span', row).html('Pending');
      }
      Object.keys(data).forEach((key,index)=>{
        if(key=='email'){
          console.log("email");
          // var $td = $('<td>').html('<a href="#"></a>');
          // $('td:nth-child(2)', row).append($td);
          //$('td:nth-child(2) ', row).html('<a href="#">Foo</a>');

        }
      })

      // Unbind first in order to avoid any duplicate handler
      // (see https://github.com/l-lin/angular-datatables/issues/87)
      $('td', row).unbind('click');
      $('td span', row).bind('click', () => {
        self.someClickHandler(data);
      });
      $('td:nth-child(3)', row).bind('click', () => {
        self.someClickHandler1(data);
      });
      return row;
    }

    }
    this.dataTable=$(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOptions);

}

someClickHandler(data) {
  let obj={
    id:data.id
  }
  this.service.updateParticipantStatus(data.id).subscribe(res=>{
      console.log("status");
      console.log(res);

    })
}
someClickHandler1(data){
    this.router.navigate(['participant-details'], { queryParams: { id: data.id } });
}
}
