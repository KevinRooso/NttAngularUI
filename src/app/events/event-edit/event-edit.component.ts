import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  updateEventForm: FormGroup;
  addSpeakerForm: FormGroup;
  addTagForm: FormGroup;

  allData: any[] = [];
  valuesSelectedTag: string[] = [];
  tagsList: string[] = [];
  allPolicy: any[] = [];
  allspeakers: any[] = [];
  valuesSpeakertags: string[] = [];
  categoryName: string[] = [];
  policyFaqs:string[] = [];
  allPolicyFAQ: any[] = [];
  allPolicyTNC: any[] = [];

  speaker = new FormControl();
  tag = new FormControl();

  selected:string;
  getEventDetails: any;
  evntID;

  selected1:string ='Cloud Computing';

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthServiceService, private router1: ActivatedRoute) {
    this.updateEventForm = formBuilder.group({
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
    this.router1.queryParams.subscribe(params => {
      console.log(params.page);
      this.evntID = params.page;
      this.getEventData(params.page);
    });
    this.getPolicyFaQDetails();
    this.getPolicyTnCDetails();
    this.getCategoryDetails();
    this.getSpeakerDetails()
    this.getTagsDetails();
    this.updateEvent();
  }

  getEventData(id) {
    this.authService.getEventDetail(id).subscribe(res => {
      this.getEventDetails = res.body;
      console.log("Get Event data", this.getEventDetails);
      this.updateEventForm.controls['title'].setValue(this.getEventDetails.title);
      this.updateEventForm.controls['detail'].setValue(this.getEventDetails.detail);
      this.updateEventForm.controls['shortDescription'].setValue(this.getEventDetails.shortDescription);
      this.updateEventForm.controls['registrationCloseBeforeSeat'].setValue(this.getEventDetails.registrationCloseBeforeSeat);
      this.updateEventForm.controls['address1'].setValue(this.getEventDetails.address1);
      this.updateEventForm.controls['address2'].setValue(this.getEventDetails.address2);
      this.updateEventForm.controls['city'].setValue(this.getEventDetails.city);
      this.updateEventForm.controls['totalSeat'].setValue(this.getEventDetails.totalSeat);
      this.updateEventForm.controls['registrationStartDate'].setValue(this.getEventDetails.registrationStartDate);
      this.updateEventForm.controls['registrationEndDate'].setValue(this.getEventDetails.registrationEndDate);
      this.updateEventForm.controls['country'].setValue(this.getEventDetails.country);
      this.updateEventForm.controls['pincode'].setValue(this.getEventDetails.pincode);
      this.updateEventForm.controls['noOfSubUsersAllow'].setValue(this.getEventDetails.noOfSubUsersAllow);
      this.updateEventForm.controls['detailImageUrl'].setValue(this.getEventDetails.detailImageUrl);
      this.updateEventForm.controls['thumbnailImageUrl'].setValue(this.getEventDetails.thumbnailImageUrl);
      this.updateEventForm.controls['startTime'].setValue(this.getEventDetails.eventSchedule[0].startTime);
      this.updateEventForm.controls['endTime'].setValue(this.getEventDetails.eventSchedule[0].endTime);
      this.updateEventForm.controls['policyFAQ'].setValue(this.getEventDetails.policyFAQ.displayName);
      this.updateEventForm.controls['policyTnc'].setValue(this.getEventDetails.policyTnc.displayName);
      this.updateEventForm.controls['categoryTypeId'].setValue(this.getEventDetails.categoryTypeId.displayName);

      res.body.tags.forEach(m => {
        this.valuesSelectedTag.push(m.name);
      })
      console.log("Hemant", this.valuesSelectedTag);

      res.body.speakers.forEach(m => {
        this.valuesSpeakertags.push(m.fullName);
      })
      console.log("Hemant Speaker", this.valuesSpeakertags);

    })

  }
  updateEvent() {
    let name: any[] = [];
    this.updateEventForm.controls['fullName'].value.forEach(sname => {
      let speakers = {
        "fullName": sname
      };
      name.push(speakers);
    });

    let tag: any[] = [];
    this.updateEventForm.controls['name'].value.forEach(tname => {
      let tags = {
        "name": tname
      };
      tag.push(tags);
    });

    let schedule: any[] = [];
    let scheduling = {
      "endTime": this.updateEventForm.controls['endTime'].value,
      "startTime": this.updateEventForm.controls['startTime'].value
    };
    schedule.push(scheduling);
    let catId;
    this.allData.forEach(m=>{
      if(m.displayName==this.updateEventForm.controls['categoryTypeId'].value)
        catId=m.id;
    });
    let tncId;
    this.allPolicyTNC.forEach(m=>{
      if(m.displayName==this.updateEventForm.controls['policyTnc'].value)
      tncId=m.id;
    });

    let faqId;
    this.allPolicyFAQ.forEach(m=>{
      if(m.displayName==this.updateEventForm.controls['policyFAQ'].value)
      faqId=m.id;
    });

    let obj = {
      "title": this.updateEventForm.controls['title'].value,
      "detail": this.updateEventForm.controls['detail'].value,
      "shortDescription": this.updateEventForm.controls['shortDescription'].value,
      "address1": this.updateEventForm.controls['address1'].value,
      "address2": this.updateEventForm.controls['address2'].value,
      "city": this.updateEventForm.controls['city'].value,
      "country": this.updateEventForm.controls['country'].value,
      "pincode": this.updateEventForm.controls['pincode'].value,
      "totalSeat": this.updateEventForm.controls['totalSeat'].value,
      "registrationCloseBeforeSeat": this.updateEventForm.controls['registrationCloseBeforeSeat'].value,
      "noOfSubUsersAllow": this.updateEventForm.controls['noOfSubUsersAllow'].value,
      "registrationStartDate": this.updateEventForm.controls['registrationStartDate'].value,
      "registrationEndDate": this.updateEventForm.controls['registrationEndDate'].value,
      "policyFAQ": faqId,
      "policyTnc": tncId,
      "thumbnailImageUrl": this.updateEventForm.controls['thumbnailImageUrl'].value,
      "detailImageUrl": this.updateEventForm.controls['detailImageUrl'].value,
      "categoryTypeId": catId,
      "speakerList": name,
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
      "id": this.evntID
    }

    console.log("Updated Data", obj);

    this.authService.saveEventDetails(obj).subscribe(
      (response) => {
        console.log("responsne", response);
        alert("Successfully Updated");
      },
      (error) => console.log(error)
    )

  }
  createSpeaker() {
    alert("i Called");
    // console.log(this.addSpeakerForm.value.fullName);
    this.allspeakers.push(this.addSpeakerForm.value.fullName);
    // console.log(this.allspeakers);
  }
  createTag() {
    alert("Tag Called");
    // console.log(this.addTagForm.value.name);
    // console.log(this.addTagForm.value.keywords);
    this.tagsList.push(this.addTagForm.value.name);
    // console.log(this.tagsList);
  }
  getTagsDetails() {
    this.authService.getTagsList().subscribe((res) => {
      // console.log("Tag", res.body);
      res.body.forEach(m => {
        this.tagsList.push(m.name);
      })
    })
  }
  getCategoryDetails() {
    this.authService.getCategoryList().subscribe((res) => {
      // console.log("category", res.body);
      this.allData = res.body;
    })
  }
  getPolicyFaQDetails() {
    this.authService.getAllPolicyFaq().subscribe((res) => {
      // console.log("Policies FAQ", res.body);
      this.allPolicyFAQ = res.body;
      // console.log("faqssss===",this.allPolicyFAQ);
      // console.log(this.allPolicyFAQ[0].description==this.selected);
    })
  }
  getPolicyTnCDetails() {
    this.authService.getAllPolicyTnC().subscribe((res) => {
      // console.log("Policies TNC", res.body);
      this.allPolicyTNC = res.body;
    })
  }
  getSpeakerDetails() {
    this.authService.getAllSpeakers().subscribe((res) => {
      // console.log("Speakers", res.body);
      res.body.forEach(m => {
        this.allspeakers.push(m.fullName);

      })
    })
    // console.log("Checking", this.allspeakers);
    // console.log("Checking cate", this.allData);
  }
  customCompare(o1, o2) {
    return o1.id === o2.id;
  }

}
