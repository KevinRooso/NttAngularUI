import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location} from '@angular/common';
import { MatMenuTrigger } from '@angular/material/menu';
import { speedDialFabAnimations } from 'src/app/fab-animation';
import { CommonServiceService } from 'src/app/common-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  animations: speedDialFabAnimations
})
export class EventDetailsComponent implements OnInit {
  getEventDetails: any;
 // htmlString = '<h1>Dheeraj Kishore<h1>';
  getParticipantDetails: any;
  eventId;
  eventName;
  startTime="";
  endTime="";
  show=false;
  speakers:any[]=[];
  speakerList:any[]=[];
  @ViewChild('menumat') trigger: MatMenuTrigger;
  constructor(private authService: AuthServiceService,
     private router: Router,
     private router1: ActivatedRoute,
     private location: Location,
     private commonService:CommonServiceService,
     public snackBar: MatSnackBar) { }

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
    this.show=true;
    this.authService.getEventDetail(id).subscribe(res => {
      this.getEventDetails = res.body.events;
      console.log("ID Data", this.getEventDetails);
        this.eventName=this.getEventDetails.title;
        if(this.getEventDetails.eventSchedule[0].startDate!=null){
        this.startTime=this.commonService.getDateTime(this.getEventDetails.eventSchedule[0].startDate);
        this.endTime=this.commonService.getDateTime(this.getEventDetails.eventSchedule[0].endDate);
        }
        this.isPublish=this.getEventDetails.isPublish;
        this.isActive=this.getEventDetails.isActive;
        console.log("eventschedule==",this.getEventDetails);
        if(this.getEventDetails.eventSchedule!=null)
          this.getEventDetails.eventSchedule.forEach(m=>{
            m.speakers.forEach(n=>{
                this.speakerList.push(n);
            })
          })



          this.speakers = this.speakerList.map(e => e['id'])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => this.speakerList[e]).map(e => this.speakerList[e]);
          console.log("speakers=====",this.speakers);

    })

    this.show=false;
  }

  getEventParticipant(id) {
    this.show=true;
    this.authService.getParticipant(id).subscribe(res => {
      this.getParticipantDetails = res.body;
      console.log("Participants Data", this.getParticipantDetails);

    })
    this.show=false;
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
    this.router.navigate(['events']);
  }
  fabButtons = [
    {
      icon: 'file_copy',
      tooltip: 'Duplicate Event'
    },
    {
      icon: 'edit',
      tooltip: 'Edit Event'
    }
  ];
  buttons = [];
  fabTogglerState = 'inactive';
  isPublish:boolean=false;
  isActive:boolean=false;
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
  publishChanges(){
    this.authService.savePublish(this.eventId,this.isPublish).subscribe(res=>{
      this.snackBar.open('SUCCESS!!', 'Close', {duration: 5000});
    },
    (error)=>{
      this.isPublish=!this.isPublish;
      console.log(error);
      if(error.status=='403')
      this.snackBar.open('You do not have the permission to Publish or UnPublish it', 'Close', {duration: 5000});
    })
  }
  activeChange(){
    this.authService.saveActive(this.eventId,this.isActive).subscribe(res=>{
      this.snackBar.open('SUCCESS!!', 'Close', {duration: 5000});
    },
    (error)=>{
      console.log(error);
      this.isActive=!this.isActive
      if(error.status=='403')
      this.snackBar.open('You do not have the permission to Active or DeActive it', 'Close', {duration: 5000});
    })
  }
}
