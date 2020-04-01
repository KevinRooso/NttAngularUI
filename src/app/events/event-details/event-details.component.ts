import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location} from '@angular/common';
import { MatMenuTrigger } from '@angular/material/menu';
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  getEventDetails: any;
  getParticipantDetails: any;
  eventId;
  @ViewChild('menumat') trigger: MatMenuTrigger;
  constructor(private authService: AuthServiceService, private router: Router, private router1: ActivatedRoute, private location: Location) { }

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
    this.router.navigate(['/participant-add'], { queryParams: { page: this.eventId } });
  }
  addSpeaker(){
    this.router.navigate(['/create-speaker'], { queryParams: { page: this.eventId } });
  }
  viewParticipant(){
    this.router.navigate(['/participants'], { queryParams: { page: this.eventId } });
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

}
