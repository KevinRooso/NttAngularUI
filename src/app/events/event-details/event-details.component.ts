import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location} from '@angular/common';
import { MatMenuTrigger } from '@angular/material/menu';
import { speedDialFabAnimations } from 'src/app/fab-animation';
import { CommonServiceService } from 'src/app/common-service.service';
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  animations: speedDialFabAnimations
})
export class EventDetailsComponent implements OnInit {
  getEventDetails: any;
  getParticipantDetails: any;
  eventId;
  eventName;
  startTime="";
  endTime="";
  @ViewChild('menumat') trigger: MatMenuTrigger;
  constructor(private authService: AuthServiceService,
     private router: Router,
     private router1: ActivatedRoute,
     private location: Location,
     private commonService:CommonServiceService) { }

  ngOnInit(): void {
    this.router1.queryParams.subscribe(params => {
      console.log(params.page);
      this.eventId=params.page;
      this.getEventData(params.page);
      this.getEventParticipant(params.page);
    });


  }
  openMenu(){
    this.trigger.openMenu();
  }
  getEventData(id) {
    this.authService.getEventDetail(id).subscribe(res => {
      this.getEventDetails = res.body;
        this.eventName=this.getEventDetails.title;
        if(this.getEventDetails.eventSchedule[0].startDate!=null){
        this.startTime=this.commonService.getDateTime(this.getEventDetails.eventSchedule[0].startDate);
        this.endTime=this.commonService.getDateTime(this.getEventDetails.eventSchedule[0].endDate);
        }
      console.log("ID Data", this.getEventDetails);
    })
  }

  getEventParticipant(id) {
    this.authService.getParticipant(id).subscribe(res => {
      this.getParticipantDetails = res.body;
      console.log("Participants Data", this.getParticipantDetails);
    })
  }
  getDetails(id) {
    // alert(id);
    this.router.navigate(['/edit'], { queryParams: { page: id } });
  }
  addParticipants(){
    this.router.navigate(['/participant-add'], { queryParams: { page: this.eventId,name:this.eventName } });
  }
  addSpeaker(){
    this.router.navigate(['/create-speaker'], { queryParams: { page: this.eventId } });
  }
  viewParticipant(){
    this.router.navigate(['/participants'], { queryParams: { page: this.eventId,name:this.eventName } });
  }
  viewSpeakers(){
    this.router.navigate(['/speakers'], { queryParams: { page: this.eventId } });
  }
  jumpDetail(id){
    this.router.navigate(['participant-details'], { queryParams: { id: id } });
  }
  copyDetails(id){
    this.router.navigate(['/copy-event'], { queryParams: { page: this.eventId } });
  }
  jumpDetail1(id){
    this.router.navigate(['speaker-details'], { queryParams: { page: id } });
  }
  Back() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  fabButtons = [
    {
      icon: 'file_copy'
    },
    {
      icon: 'edit'
    }
  ];
  buttons = [];
  fabTogglerState = 'inactive';
  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }
  duplicateEdit(icon,id){
      if(icon=='file_copy')
        this.router.navigate(['/copy-event'], { queryParams: { page: this.eventId } });
      if(icon=='edit')
      this.router.navigate(['/edit'], { queryParams: { page: this.eventId } });
  }
}
