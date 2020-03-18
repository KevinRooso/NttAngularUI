import {Component} from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-participant-preview',
  templateUrl: './participant-preview.component.html',
  styleUrls: ['./participant-preview.component.css']
})
export class ParticipantPreviewComponent {
  dataSource=new BehaviorSubject<any[]>([]);
  tableData:any[]=[];
  dtOptions: DataTables.Settings = {};

  constructor(private service: AuthServiceService) {}
  ngOnInit(){
    this.service.getAllParticipants().subscribe(res=>{
      this.tableData=res.body;
      console.log(this.tableData);
      this.dataSource.next(this.tableData);
    })
  }

}

