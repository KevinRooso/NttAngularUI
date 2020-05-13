import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-speaker-details',
  templateUrl: './speaker-details.component.html',
  styleUrls: ['./speaker-details.component.css'],
})
export class SpeakerDetailsComponent implements OnInit {
  speakerData: any = [];

  constructor(
    private authService: AuthServiceService,
    private router1: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.router1.params.subscribe((params) => {
      this.getSpeakerData(params.page);
    });
  }

  getSpeakerData(id) {
    this.authService.getSpeakerDetail(id).subscribe((res) => {
      this.speakerData = res.body;
    });
  }
  editSpeaker(id) {
    // alert(id);
    this.router.navigate(['./speaker-update'], { queryParams: { page: id } });
  }
  Back() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
