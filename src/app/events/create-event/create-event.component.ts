import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  startTime = {hour: 13, minute: 30};
  endTime = {hour: 13, minute: 30};

  model: any;
  createEventForm: FormGroup;
  title: string;
  agenda: string;
  speakers: string;
  participants: string;
  category: string;
  tags: string;
  venueAddress1: string;
  venueAddress2: string;
  venueAddress3: string;
  totalSubscribers: string;
  venueDate1: string;
  venueDate2: string;
  venueDate3: string;
  venueTime1:string;
  venueTime2:string;
  venueTime3:string;

  public imagePath;
  imgURL: any;
  public message: string;

  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  constructor(private formbuilder: FormBuilder, private router: Router, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter ) {
    this.createEventForm=formbuilder.group({
      title: new FormControl('', Validators.required),
      //agenda: new FormControl('', Validators.required),
      //category: new FormControl('', Validators.required),
      //tags: new FormControl('', Validators.required),
      //venue: new FormControl('', Validators.required),
     // participants: new FormControl('', Validators.required),
      //speakers: new FormControl('', Validators.required)
      // image: new FormControl('', Validators.required)
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
  generateEvent(createEventForm){
    if (createEventForm.valid){
      this.router.navigate(['/home']);
    }else{
      alert("Please Enter Required field first");
    }
  }


}
