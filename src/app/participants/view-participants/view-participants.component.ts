import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-view-participants',
  templateUrl: './view-participants.component.html',
  styleUrls: ['./view-participants.component.css']
})
export class ViewParticipantsComponent implements OnInit {
  participant:any={};
  constructor(private service:AuthServiceService, private queryString:ActivatedRoute) { }
  event:any={};
  ngOnInit(): void {
    this.queryString.queryParams.subscribe(params => {
      this.getParticipantData(params.id);

    });
  }
  getParticipantData(id){

    this.service.getParticipantById(id).subscribe(res=>{
      this.participant=res.body;
      this.getEventName();

    })
  }
  getEventName(){

    this.service.getEventDetail(this.participant.eventId).subscribe(res=>{
      console.log("events==",res);
    this.event=res;
    })
  }
}
