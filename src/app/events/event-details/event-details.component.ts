import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatMenuTrigger } from '@angular/material/menu';
import { speedDialFabAnimations } from 'src/app/fab-animation';
import { CommonServiceService } from 'src/app/common-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  animations: speedDialFabAnimations,
})
export class EventDetailsComponent implements OnInit {
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private router1: ActivatedRoute,
    private location: Location,
    private commonService: CommonServiceService,
    public snackBar: MatSnackBar
  ) {}
  getEventDetails: any = [];
  // htmlString = '<h1>Dheeraj Kishore<h1>';
  getParticipantDetails: any = [];
  eventId;
  eventName;
  startTime = '';
  endTime = '';
  show = false;
  speakers: any[] = [];
  speakerList: any[] = [];
  getEventStatusdata: any;
  @ViewChild('menumat') trigger: MatMenuTrigger;
  fabButtons = [
    {
      icon: 'file_copy',
      tooltip: 'Duplicate Event',
    },
    {
      icon: 'edit',
      tooltip: 'Edit Event',
    },
  ];
  buttons = [];
  fabTogglerState = 'inactive';
  isPublish = false;
  // isActive = false;

  ngOnInit(): void {
    this.router1.queryParams.subscribe((params) => {
      console.log(params.page);
      this.eventId = params.page;
      this.getEventData(params.page);
      this.getEventParticipant(params.page);
      // this.getEventStatus();
    });
  }
  openMenu() {
    this.trigger.openMenu();
  }
  getEventData(id) {
    const arr: any[] = [];
    this.show = true;
    this.authService.getEventDetail(id).subscribe((res) => {
      this.getEventDetails = res.body.events;
      console.log('ID Data', this.getEventDetails);
      this.eventName = this.getEventDetails.title;
      if (this.getEventDetails.eventSchedule != null) {
        this.getEventDetails.eventSchedule.forEach((m) => {
          arr.push(m);
        });
        console.log('arr=', arr);

        const objs = this.getMinMaxDate(arr);
        this.startTime = this.commonService.getDateTime(objs.min);
        this.endTime = this.commonService.getDateTime(objs.max);
      }
      this.isPublish = this.getEventDetails.isPublish;
      // this.isActive = this.getEventDetails.isActive;
      console.log('eventschedule==', this.getEventDetails);
      if (this.getEventDetails.eventSchedule != null) {
        this.getEventDetails.eventSchedule.forEach((m) => {
          m.speakers.forEach((n) => {
            this.speakerList.push(n);
          });
        });
      }

      this.speakers = this.speakerList
        .map((e) => e['id'])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter((e) => this.speakerList[e])
        .map((e) => this.speakerList[e]);
      console.log('speakers=====', this.speakers);
    });

    this.show = false;
  }

  getMinMaxDate(arr) {
    let minAgendaStartTime = null;
    let maxAgendEndTime = null;
    for (const index in arr) {
      const agenda = arr[index];
      if (index === '0') {
        minAgendaStartTime = agenda.startDate;
        maxAgendEndTime = agenda.endDate;
      }
      if (minAgendaStartTime > agenda.startDate) {
        minAgendaStartTime = agenda.startDate;
      }

      if (maxAgendEndTime < agenda.endDate) {
        maxAgendEndTime = agenda.endDate;
      }
    }
    const obj = {
      min: minAgendaStartTime,
      max: maxAgendEndTime,
    };
    return obj;
  }

  getEventParticipant(id) {
    this.show = true;
    this.authService.getParticipant(id).subscribe((res) => {
      this.getParticipantDetails = res.body;
      console.log('Participants Data', this.getParticipantDetails);
    });
    this.show = false;
  }
  getDetails(id) {
    // alert(id);
    this.router.navigate(['/edit'], { queryParams: { page: id } });
  }
  addParticipants() {
    this.router.navigate(['/participant-add'], {
      queryParams: { page: this.eventId, name: this.eventName },
    });
  }
  addSpeaker() {
    this.router.navigate(['/create-speaker'], {
      queryParams: { page: this.eventId },
    });
  }
  viewParticipant() {
    this.router.navigate(['/participants'], {
      queryParams: { page: this.eventId, name: this.eventName },
    });
  }
  viewSpeakers() {
    this.router.navigate(['/speakers'], {
      queryParams: { page: this.eventId },
    });
  }
  jumpDetail(id) {
    this.router.navigate(['participant-details'], { queryParams: { id } });
  }
  copyDetails(id) {
    this.router.navigate(['/copy-event'], {
      queryParams: { page: this.eventId },
    });
  }
  jumpDetail1(id) {
    this.router.navigate(['speaker-details'], { queryParams: { page: id } });
  }
  Back() {
    this.router.navigate(['events']);
  }
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
  duplicateEdit(icon, id) {
    if (icon == 'file_copy') {
      this.router.navigate(['/copy-event'], {
        queryParams: { page: this.eventId },
      });
    }
    if (icon == 'edit') {
      this.router.navigate(['/edit'], { queryParams: { page: this.eventId } });
    }
  }
  publishChanges() {
    this.authService.savePublish(this.eventId, this.isPublish).subscribe(
      (res) => {
        this.snackBar.open('SUCCESS!!', 'Close', { duration: 5000 });
      },
      (error) => {
        this.isPublish = !this.isPublish;
        console.log(error);
        if (error.status == '403') {
          this.snackBar.open('You do not have the permission to Publish or UnPublish it', 'Close', { duration: 5000 });
        }
      }
    );
  }
}
