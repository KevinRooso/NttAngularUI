import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  model: any;

  updateEventForm: FormGroup;
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
  fromDate: any;
  toDate: any;

  // public imagePath;
  // imgURL: any;
  // public message: string;

  // hoveredDate: NgbDate;
  // fromDate: NgbDate;
  // toDate: NgbDate;

  // preview(files) {
  //   if (files.length === 0)
  //     return;

  //   var mimeType = files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.message = "Only images are supported.";
  //     return;
  //   }

  //   var reader = new FileReader();
  //   this.imagePath = files;
  //   reader.readAsDataURL(files[0]);
  //   reader.onload = (_event) => {
  //     this.imgURL = reader.result;
  //   }
  // }

  constructor(private formBuilder: FormBuilder, private router: Router, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.updateEventForm = formBuilder.group({
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
      desclaimer: ['']
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


  updateEvent(updateEventForm) {
    console.log(this.updateEventForm.value);
    // if (createEventForm.valid) {
    //   //this.router.navigate(['/home']);
    //   alert("Successfully Generated");
    // } else {
    //   alert("Please Fill All field first");
    // }
  }


}

