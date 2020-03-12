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


  generateEvent() {
    console.log(this.createEventForm.value);
    // var formData: any = new FormData();
    // formData.append("title", this.createEventForm.get('title').value);
    // formData.append("agenda", this.createEventForm.get('agenda').value);
    // formData.append("details", this.createEventForm.get('details').value);
    // formData.append("category", this.createEventForm.get('category').value);
    // formData.append("tags", this.createEventForm.get('tags').value);
    // formData.append("address", this.createEventForm.get('address').value);
    // formData.append("city", this.createEventForm.get('city').value);
    // formData.append("pincode", this.createEventForm.get('pincode').value);
    // formData.append("totalSeats", this.createEventForm.get('totalSeats').value);
    // formData.append("available", this.createEventForm.get('available').value);
    // formData.append("regClosingDate", this.createEventForm.get('regClosingDate').value);
    // formData.append("speakers", this.createEventForm.get('speakers').value);
    // formData.append("eventStarting", this.createEventForm.get('eventStarting').value);
    // formData.append("shortDetails", this.createEventForm.get('shortDetails').value);
    // formData.append("eventEnding", this.createEventForm.get('eventEnding').value);
    // formData.append("desclaimer", this.createEventForm.get('desclaimer').value);
    // formData.append("cardImage", this.createEventForm.get('cardImage').value);
    // formData.append("bannerImage", this.createEventForm.get('bannerImage').value);

    // this.http.post('http://localhost:4000/api/create-user', formData).subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error)
    // )
    // if (createEventForm.valid) {
    //   //this.router.navigate(['/home']);
    //   alert("Successfully Generated");
    // } else {
    //   alert("Please Fill All field first");
    // }
  }


}
