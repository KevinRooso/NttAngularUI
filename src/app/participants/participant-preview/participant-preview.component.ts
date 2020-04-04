import {Component, ViewChild, ElementRef} from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
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
  eName="List of all Participants";
  dtOptions: DataTables.Settings = {};
  @ViewChild('datatable',{static:true}) table;
  tabled;
  constructor(private service: AuthServiceService,
    private elementRef:ElementRef,private router:Router
    ,private queryString:ActivatedRoute) {}
  ngOnInit(){
    // this.service.getAllParticipants().subscribe(res=>{
    //   this.tableData=res.body;
    //   console.log(this.tableData);
    //   this.dataSource.next(this.tableData);
    // })
    this.queryString.queryParams.subscribe(params => {
      $.fn.dataTable.ext.errMode = 'none';
     let url;
      if(params.page==undefined)
        url="https://ntt-backend-app.herokuapp.com/api/public/participants";
      else{
        console.log("eventName=",params);
        this.eName= "Event: "+params.name
        url="https://ntt-backend-app.herokuapp.com/api/public/participants/event/"+params.page;
      }

      this.getTableData(url);

    });


}
getTableData(url){
  this.dtOptions = {
        "order": [],
    "ajax":{
      url:url,
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
      data:'name'
    },

    {
      title:'Status',
       defaultContent: "<span  ' class='badge showIdButton' >Approved</span>"
    },

    {
      title:'Action',
        defaultContent: "<span  ' class='btn btn-success approve' style='cursor: pointer;font-size: 10px;' >Approve</span>"
        +"&nbsp;<span  ' class='btn btn-danger ' style='cursor: pointer;font-size: 10px;' >Reject</span>"
    }
  ],
  rowCallback: (row: Node, data: any[] | Object, index: number) => {
    console.log("data");
    console.log(data);
    const self = this;
    if(data['approverId']==null){
    // $('td .showIdButton', row).removeClass("badge-success");
    //   $('td .showIdButton', row).addClass("badge-warning");
      $('td .showIdButton', row).html('Pending');
      $('td:nth-child(7) .approve', row).attr("disabled", true);
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
    $('td:nth-child(7) .approve', row).bind('click', () => {
      alert("niceee");
      if($('td:nth-child(7) .approve', row).html()!='-'){
     self.someClickHandler(data,row);
      }
    });
    $('td:nth-child(3) ', row).bind('click', () => {
      self.someClickHandler1(data);
    });
    return row;
  }

  }
  this.dataTable=$(this.table.nativeElement);
  this.dataTable.DataTable(this.dtOptions);
}
someClickHandler(data,row){
  console.log(data.id)
  this.service.updateParticipantStatus(data.id).subscribe(res=>{
    $('td .showIdButton', row).html('Approved');
    $('td:nth-child(7) .approve', row).html('-');
    },
    (error) => {
      alert("something went wrong");
    })
}
someClickHandler1(data){
    this.router.navigate(['participant-details'], { queryParams: { id: data.id } });
}
}
