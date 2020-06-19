import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  showPublish = true;
  showStartEnd = true;
  @ViewChild('menumat') trigger: MatMenuTrigger;

  // @ViewChild('toggleButton') toggleButton: ElementRef;

  fabButtons = [
    {
      icon: 'file_copy',
      tooltip: 'Duplicate Event',
      url: '../../copy-event',
    },
    {
      icon: 'edit',
      tooltip: 'Edit Event',
      url: '../../edit',
    },
  ];
  buttons = [];
  fabTogglerState = 'inactive';
  isPublish = false;
  // isActive = false;
  ngOnInit(): void {
    this.router1.params.subscribe((params) => {
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
      this.eventName = this.getEventDetails.title;

      if (this.getEventDetails.eventStatus === 'Drafted') {
        this.showPublish = false;
      }
      if (this.getEventDetails.eventStatus === 'Expired') {
        this.showPublish = false;
      }
      if (this.getEventDetails.eventSchedule != null) {
        this.getEventDetails.eventSchedule.forEach((m) => {
          arr.push(m);
        });
        const objs = this.getMinMaxDate(arr);
        this.startTime = this.commonService.getDateTime(objs.min);
        this.endTime = this.commonService.getDateTime(objs.max);
      }
      if (this.getEventDetails.eventSchedule.length === 0) {
        this.startTime = this.commonService.getDateTime(this.getEventDetails.eventStartDate);
        this.endTime = this.commonService.getDateTime(this.getEventDetails.eventEndDate);
      }
      if (this.getEventDetails.eventSchedule.length === 0 && this.getEventDetails.eventStartDate === null) {
        this.showStartEnd = false;
      }
      this.isPublish = this.getEventDetails.isPublish;
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
    });

    this.show = false;
  }

  getMinMaxDate(arr) {
    let minAgendaStartTime = null;
    let maxAgendEndTime = null;
    // tslint:disable-next-line:forin
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
    });
    this.show = false;
  }
  getDetails(id) {
    // alert(id);
    this.router.navigate(['/edit'], { queryParams: { page: id } });
  }
  addParticipants() {
    this.router.navigate(['/participants/participant-add', this.eventId, this.eventName]);
  }
  addSpeaker() {
    this.router.navigate(['/create-speaker'], {
      queryParams: { page: this.eventId },
    });
  }
  viewParticipant() {
    this.router.navigate(['/participants', this.eventId, this.eventName]);
  }
  viewSpeakers() {
    this.router.navigate(['/speakers'], {
      queryParams: { page: this.eventId },
    });
  }
  jumpDetail(id) {
    this.router.navigate(['/participants/participant-details', id, 'xyz']);
  }
  copyDetails() {
    this.router.navigate(['/copy-event'], {
      queryParams: { page: this.eventId },
    });
  }
  jumpDetail1(id) {
    this.router.navigate(['/speakers/speaker-details', id]);
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
  duplicateEdit(icon, _id) {
    if (icon === 'file_copy') {
      this.router.navigate(['/copy-event'], {
        queryParams: { page: this.eventId },
      });
    }
    if (icon === 'edit') {
      this.router.navigate(['/edit'], { queryParams: { page: this.eventId } });
    }
  }
  changeStatus() {
    this.authService.savePublish(this.eventId, this.isPublish).subscribe(
      (_res) => {
        this.snackBar.open('SUCCESS!!', 'Close', { duration: 5000 });
      },
      (_error) => {
        this.isPublish = !this.isPublish;
        this.snackBar.open('You do not have the permission to Publish or UnPublish it', 'Close', { duration: 5000 });
      }
    );
  }
  reverseChanges() {
    this.isPublish = !this.isPublish;
  }

  // publishStatusNo(){
  //   this.isPublish =false;
  //   this.authService.savePublish(this.eventId, this.isPublish).subscribe(
  //     (_res) => {
  //       this.snackBar.open('SUCCESS!!', 'Close', { duration: 5000 });
  //     },
  //     (error) => {
  //       console.log("erroorr=",error);
  //       this.isPublish = !this.isPublish;

  //         this.snackBar.open('You do not have the permission to Publish or UnPublish it', 'Close', { duration: 5000 });

  //     }
  //   );
  // }
  // publishStatusYes(){
  //       this.isPublish =true;

  //       this.authService.savePublish(this.eventId, this.isPublish).subscribe(
  //         (_res) => {
  //           this.snackBar.open('SUCCESS!!', 'Close', { duration: 5000 });
  //         },
  //         (error) => {
  //           this.isPublish = !this.isPublish;
  //           if (error.status === '403') {
  //             this.snackBar.open('You do not have the permission to Publish or UnPublish it', 'Close', { duration: 5000 });
  //           }
  //         }
  //       );

  // }
}
