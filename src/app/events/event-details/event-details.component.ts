import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location} from '@angular/common';
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  getEventDetails: any;
  getParticipantDetails: any;
  eventId;

  constructor(private authService: AuthServiceService, private router: Router, private router1: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.router1.queryParams.subscribe(params => {
      console.log(params.page);
      this.eventId=params.page;
      this.getEventData(params.page);
      this.getEventParticipant(params.page);
    });


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
  Back() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
