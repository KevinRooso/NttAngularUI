import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { threadId } from 'worker_threads';
// import * as $ from 'jquery'

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  createEventForm: FormGroup;
  addSpeakerForm: FormGroup;
  addTagForm: FormGroup;

  categories = [
    {value: '0', viewValue: 'Sports'},
    {value: '1', viewValue: 'Cloud'},
    {value: '2', viewValue: 'Movies'}
  ];
  allData:any[]=[];
  speaker = new FormControl();
  speakerList: string[] = ['speaker 1', 'speaker 2', 'speaker 3', 'speaker 4', 'speaker 5', 'speaker 6'];

  tag = new FormControl();
  tagsList: string[] = [];


  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthServiceService,) {
    this.createEventForm = formBuilder.group({
      title: [''],
      detail: [''],
      shortDescription: [''],
      address1: [''],
      address2: [''],
      city: [''],
      country: [''],
      pincode: [''],
      totalSeat: [''],
      registrationCloseBeforeSeat: [''],
      noOfSubUsersAllow: [''],
      startTime: [''],
      endTime: [''],
      registrationStartDate: [''],
      registrationEndDate: [''],
      policyTnc: [''],
      policyFAQ: [''],
      thumbnailUrl: [''],
      imageUrl: [''],
      fullName: [''],
      name: [''],
      categoryTypeId: ['']

    })
    this.addSpeakerForm = formBuilder.group({
      fullName:['']
    })
    this.addTagForm = formBuilder.group({
      name:[''],
      keywords: ['']
    })
  }

  ngOnInit(): void {
    this.getCategoryDetails()
    this.getTagsDetails();
    this.generateEvent();
  }


  generateEvent() {
    console.log("new Data", this.createEventForm.controls['fullName'].value);

    let name:any[]=[];
    this.createEventForm.controls['fullName'].value.forEach(sname=>{
      let speakers={
        "fullName":sname
      };
      name.push(speakers);
    });

    let tag:any[]=[];
      this.createEventForm.controls['name'].value.forEach(tname=>{
      let tags={
        "name":tname
      };
      tag.push(tags);
    });

    let schedule:any[]=[];
      let scheduling={
        "endTime":this.createEventForm.controls['endTime'].value,
        "startTime":this.createEventForm.controls['startTime'].value
      };
      schedule.push(scheduling);

    let obj={
      "title":this.createEventForm.controls['title'].value,
      "detail":this.createEventForm.controls['detail'].value,
      "shortDescription":this.createEventForm.controls['shortDescription'].value,
      "address1":this.createEventForm.controls['address1'].value,
      "address2":this.createEventForm.controls['address2'].value,
      "city":this.createEventForm.controls['city'].value,
      "country":this.createEventForm.controls['country'].value,
      "pincode":this.createEventForm.controls['pincode'].value,
      "totalSeat":this.createEventForm.controls['totalSeat'].value,
      "registrationCloseBeforeSeat":this.createEventForm.controls['registrationCloseBeforeSeat'].value,
      "noOfSubUsersAllow":this.createEventForm.controls['noOfSubUsersAllow'].value,
      "registrationStartDate":this.createEventForm.controls['registrationStartDate'].value,
      "registrationEndDate":this.createEventForm.controls['registrationEndDate'].value,
      "policyFAQ":this.createEventForm.controls['policyFAQ'].value,
      "policyTnc":this.createEventForm.controls['policyTnc'].value,
      "thumbnailUrl":this.createEventForm.controls['thumbnailUrl'].value,
      "imageUrl":this.createEventForm.controls['imageUrl'].value,
      "categoryTypeId":this.createEventForm.controls['categoryTypeId'].value,
      "speakerList":name,
      "tagList": tag,
      "eventSchedule": schedule,
      "autoApproveParticipant": false,
      "isbreak": false,
      "status": false,
      "isActive": false,
      "isDraft": false,
      "isPublish": false,
      "isRegOpen": false,
      "publishStatus": false,
      "id":0
    }

    console.log("Post Data",obj);

    this.authService.saveEventDetails(obj).subscribe(
      (response) => console.log("responsne", response),
      (error) => console.log(error)
    )
    // if (createEventForm.valid) {
    //   //this.router.navigate(['/home']);
    //   alert("Successfully Generated");
    // } else {
    //   alert("Please Fill All field first");
    // }
  }
  createSpeaker(data: any){
    alert("i Called");
    console.log(this.addSpeakerForm.value.fullName);
    this.speakerList.push(this.addSpeakerForm.value.fullName);
    console.log(this.speakerList);
  }
  createTag(){
    alert("Tag Called");
    console.log(this.addTagForm.value.name);
    console.log(this.addTagForm.value.keywords);
    this.tagsList.push(this.addTagForm.value.name);
    console.log(this.tagsList);
  }
  getTagsDetails(){
    this.authService.getTagsList().subscribe((res)=>{
      console.log("Tag", res.body);
      res.body.forEach(m=>{
        this.tagsList.push(m.name);
      })
    })
  }
  getCategoryDetails(){
    this.authService.getCategoryList().subscribe((res)=>{
      console.log("category", res.body);
      this.allData = res.body;
    })
  }


}
