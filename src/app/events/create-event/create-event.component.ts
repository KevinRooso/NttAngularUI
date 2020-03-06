import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  model: any;

  createEventForm: FormGroup;
  title: string;
  agenda: string;
  details: string;
  category: string;
  tags: string;
  address: string;
  city: string;
  pincode: string;
  totalSeats: string;
  available: string;
  regClosingDate: string;
  speakers: string;
  eventStarting: string;
  shortDetails: string;
  eventEnding: string;
  desclaimer: string;


  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;


  constructor(private formBuilder: FormBuilder, private router: Router, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.createEventForm = formBuilder.group({
      title: [''],
      agenda: [''],
      details: [''],
      category: [''],
      tags: [''],
      address: [''],
      city: [''],
      pincode: [''],
      totalSeats: [''],
      available: [''],
      regClosingDate: [''],
      speakers: [''],
      eventStarting: [''],
      shortDetails: [''],
      eventEnding: [''],
      desclaimer: [''],
      bannerImage: [''],
      cardImage: ['']

    })
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    $('#startdatetimepicker').datetimepicker({
      defaultDate: new Date(),
      format: 'YYYY-MM-DD hh:mm:ss A'
    });
    $('#enddatetimepicker').datetimepicker({
      defaultDate: new Date(),
      format: 'YYYY-MM-DD hh:mm:ss A'
    });
  }


  generateEvent(createEventForm) {
    console.log(this.createEventForm.controls['eventEnding'].value);
    // if (createEventForm.valid) {
    //   //this.router.navigate(['/home']);
    //   alert("Successfully Generated");
    // } else {
    //   alert("Please Fill All field first");
    // }
  }


}
