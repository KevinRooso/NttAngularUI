import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
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

  allData:any[]=[];
  tagsList: string[] = [];
  allPolicyFAQ:any[]=[];
  allPolicyTNC:any[]=[];
  allspeakers:any[]=[];

  speaker = new FormControl();
  tag = new FormControl();

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthServiceService,) {
    this.createEventForm = formBuilder.group({
      title: [''],
      detail: [''],
      shortDescription: [''],
      address1: [''],
      address2: [''],
      city: [''],
      country: [''],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      totalSeat: [''],
      registrationCloseBeforeSeat: [''],
      noOfSubUsersAllow: [''],
      startTime: [''],
      endTime: [''],
      registrationStartDate: [''],
      registrationEndDate: [''],
      policyTnc: [''],
      policyFAQ: [''],
      thumbnailImageUrl: [''],
      detailImageUrl: [''],
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
    this.getCategoryDetails();
    this.getPolicyFaQDetails();
    this.getPolicyTnCDetails();
    this.getSpeakerDetails();
    this.getTagsDetails();
    this.generateEvent();
  }


  generateEvent() {

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
      "thumbnailImageUrl":this.createEventForm.controls['thumbnailImageUrl'].value,
      "detailImageUrl":this.createEventForm.controls['detailImageUrl'].value,
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

    this.authService.updateEventDetails(obj).subscribe(
      (response) => {
        alert("Successfully Created");
        console.log("responsne", response)},
      (error) => console.log(error)
    )
  }
  createSpeaker(){
    alert("i Called");
    // console.log(this.addSpeakerForm.value.fullName);
    this.allspeakers.push(this.addSpeakerForm.value.fullName);
    // console.log(this.allspeakers);
  }
  createTag(){
    alert("Tag Called");
    // console.log(this.addTagForm.value.name);
    // console.log(this.addTagForm.value.keywords);
    this.tagsList.push(this.addTagForm.value.name);
    // console.log(this.tagsList);
  }
  getTagsDetails(){
    this.authService.getTagsList().subscribe((res)=>{
      // console.log("Tag", res.body);
      res.body.forEach(m=>{
        this.tagsList.push(m.name);
      })
    })
  }
  getCategoryDetails(){
    this.authService.getCategoryList().subscribe((res)=>{
      // console.log("category", res.body);
      this.allData = res.body;
    })
  }
  getPolicyFaQDetails(){
    this.authService.getAllPolicyFaq().subscribe((res)=>{
      // console.log("Policies FAQ", res.body);
      this.allPolicyFAQ = res.body;
    })
  }
  getPolicyTnCDetails(){
    this.authService.getAllPolicyTnC().subscribe((res)=>{
      // console.log("Policies TNC", res.body);
      this.allPolicyTNC = res.body;
    })
  }
  getSpeakerDetails(){
    this.authService.getAllSpeakers().subscribe((res)=>{
      // console.log("Speakers", res.body);
      res.body.forEach(m=>{
        this.allspeakers.push(m.fullName);
      })
    })
  }

}
