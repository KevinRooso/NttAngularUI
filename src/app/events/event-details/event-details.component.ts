import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  getEventDetails: any;

  constructor(private authService: AuthServiceService, private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      console.log(params.page);
      this.getEventData(params.page);
    });


  }

  getEventData(id){
    this.authService.getEventDetail(id).subscribe(res=>{
      this.getEventDetails = res.body;
      console.log("ID Data", this.getEventDetails);

      //console.log(this.getEventDetails.asset.variants["download-image"]);
    })

  }
}
