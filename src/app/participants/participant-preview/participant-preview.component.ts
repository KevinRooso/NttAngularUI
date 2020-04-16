import {Component, ViewChild, ElementRef} from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
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
        url=environment.API_ENDPOINT+"api/public/participants";
      else{
        console.log("eventName=",params);
        this.eName= "Event: "+params.name
        url=environment.API_ENDPOINT+"api/public/participants/event/"+params.page;
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
      data:'eventName'
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
      defaultContent:'-'
    },

    {
      title:'Status',
       defaultContent: "<span  ' class='badge showIdButton' >Approved</span>"
    },

    {
      title:'Action',
        // defaultContent: "<span   class='btn btn-danger approve' style='cursor: pointer;font-size: 10px;' >Approve</span>"
        // +"&nbsp;<span  class='btn btn-danger reject' style='cursor: pointer;font-size: 10px;' >Reject</span>"
        defaultContent: "<span   class='btn btn-success approve' style='cursor: pointer;font-size: 10px;' ><i class='fa fa-check' style='font-size: 1rem;'></i></span>"
        +"&nbsp;<span   class='btn btn-danger reject' style='cursor: pointer;font-size: 10px;' ><i class='fa fa-close' style='font-size: 1rem;'></i></span>"
      }
  ],
  rowCallback: (row: Node, data: any[] | Object, index: number) => {
    console.log("data");
    console.log(data);
    const self = this;
    $('td:nth-child(1) ', row).attr("width", "250px");
    if(data['approverId']==null){
    // $('td .showIdButton', row).removeClass("badge-success");
    //   $('td .showIdButton', row).addClass("badge-warning");
      $('td .showIdButton', row).html('Pending');
      $('td:nth-child(7) .approve', row).attr("disabled", true);
    }
    //console.log("rowdattaa===",row);
    //$('td:nth-child(3)', row).css("color", "red");
    $('td:nth-child(3)', row).bind('click', () => {
     // alert("hi");
      self.someClickHandler1(data);
    });
    // $('td:nth-child(7) .approve', row).bind('click', () => {
    //   self.someClickHandler(data,row);

    //  });
    if(data['approverId']==null){
      // $('td .showIdButton', row).removeClass("badge-success");
      //   $('td .showIdButton', row).addClass("badge-warning");
        $('td .showIdButton', row).html('Pending');
        $('td:nth-child(7) .approve', row).attr("disabled", true);

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
     self.someClickHandler(data,row);

    });
    $('td:nth-child(7) .reject', row).bind('click', () => {
       self.someClickHandler2(data,row);

    });

  }
  else{
    $('td:nth-child(7) .approve', row).css('cursor','default')
    $('td:nth-child(7) .reject', row).css('cursor','default')
    if(data['registrationStatus']){
      $('td .showIdButton', row).html('Approved');

    }
    if(!data['registrationStatus']){
      $('td .showIdButton', row).html('Rejected');

    }
  }
    return row;
  }

  }
  this.dataTable=$(this.table.nativeElement);
  this.dataTable.DataTable(this.dtOptions);
}
someClickHandler(data,row){
  console.log(data.id)
 this.service.updateParticipantStatus(data.id,true).subscribe(res=>{
    $('td .showIdButton', row).html('Approved');
    $('td:nth-child(7) .approve', row).css('cursor','default');
    $('td:nth-child(7) .reject', row).css('cursor','default');
    $('td:nth-child(7) .approve', row).unbind();
    alert("Approved!!");
    },
    (error) => {
      alert("something went wrong");
    })
}
someClickHandler2(data,row){
  console.log(data.id)
   this.service.updateParticipantStatus(data.id,false).subscribe(res=>{
    $('td .showIdButton', row).html('Rejected');
    $('td:nth-child(7) .approve', row).css('cursor','default');
    $('td:nth-child(7) .reject', row).css('cursor','default');
    $('td:nth-child(7) .reject', row).unbind();
    alert("Rejected!!");
    },
    (error) => {
      alert("something went wrong");
    })
}
someClickHandler1(data){
    this.router.navigate(['participant-details'], { queryParams: { id: data.id } });
}
}
