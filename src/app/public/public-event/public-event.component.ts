import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonServiceService } from 'src/app/common-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-public-event',
  templateUrl: './public-event.component.html',
  styleUrls: ['./public-event.component.css'],
})
export class PublicEventComponent implements OnInit {
  token: any;
  eventObj: any;
  constructor(private router1: ActivatedRoute, private commonService: CommonServiceService, public snackBar: MatSnackBar) {}
  getEventDetails: any = [];
  // htmlString = '<h1>Dheeraj Kishore<h1>';
  eventName;
  startTime = '';
  endTime = '';
  show = false;
  speakers: any[] = [];
  speakerList: any[] = [];
  getEventStatusdata: any;
  @ViewChild('menumat') trigger: MatMenuTrigger;

  // @ViewChild('toggleButton') toggleButton: ElementRef;
  buttons = [];
  fabTogglerState = 'inactive';
  // isActive = false;
  ngOnInit(): void {
    this.router1.queryParams.subscribe((params) => {
      const eventURL = decodeURIComponent(params.eventJson);
      this.eventObj = JSON.parse(eventURL);
      this.getEventData();
      // this.getEventStatus();
    });
  }
  openMenu() {
    this.trigger.openMenu();
  }
  getEventData() {
    const arr: any[] = [];
    this.getEventDetails = this.eventObj;
    this.eventName = this.getEventDetails.title;

    if (this.getEventDetails.eventSchedule != null) {
      this.getEventDetails.eventSchedule.forEach((m) => {
        arr.push(m);
      });
      const objs = this.getMinMaxDate(arr);
      this.startTime = this.commonService.getDateTime(objs.min);
      this.endTime = this.commonService.getDateTime(objs.max);
    }
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
}
