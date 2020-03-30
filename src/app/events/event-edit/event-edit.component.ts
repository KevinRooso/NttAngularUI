import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location} from '@angular/common';

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
  tagData:any[]=[];
  speaker = new FormControl();
  tag = new FormControl();

  selected:string;
  getEventDetails: any;
  evntID;

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  articleImage: any;
  attachUrl: any = null;
  attachFile: any;
  selected4:string[]=[];
  selected1:string ='Cloud Computing';
  @ViewChild('closeModel',{static:true}) closeModel;
  constructor(private formBuilder: FormBuilder, private location: Location, private router: Router, private authService: AuthServiceService, private router1: ActivatedRoute) {
    this.updateEventForm = formBuilder.group({
      title: ['',Validators.required],
      detail: ['',Validators.required],
      shortDescription: [''],
      address1: ['',Validators.required],
      address2: [''],
      city: [''],
      tagList:[''],
      country: [''],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      totalSeat: ['',Validators.required],
      registrationCloseBeforeSeat: [''],
      noOfSubUsersAllow: [''],
      startTime: [''],
      endTime: [''],
      registrationStartDate: [''],
      registrationEndDate: [''],
      policyTnc: ['',Validators.required],
      policyFAQ: ['',Validators.required],
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
      name:['',Validators.required],
      keywords: ['',Validators.required]
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
  }

  getEventData(id) {
    this.authService.getEventDetail(id).subscribe(res => {
      this.getEventDetails = res.body;
       for(let i=0;i<res.body.tags.length;i++)
        this.selected4.push(res.body.tags[i].id);
        console.log("tags=",this.selected4);

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
      this.attachUrl =this.getEventDetails.detailImageUrl;
      this.previewUrl=this.getEventDetails.thumbnailImageUrl;

      this.articleImage= this.getEventDetails.thumbnailImageUrl
      this.attachFile= this.getEventDetails.detailImageUrl

      // this.updateEventForm.controls['detailImageUrl'].setValue();
      // this.updateEventForm.controls['thumbnailImageUrl'].setValue(this.getEventDetails.thumbnailImageUrl);
      this.updateEventForm.controls['startTime'].setValue(this.getEventDetails.eventSchedule[0].startTime);
      this.updateEventForm.controls['endTime'].setValue(this.getEventDetails.eventSchedule[0].endTime);
      this.updateEventForm.controls['policyFAQ'].setValue(this.getEventDetails.policyFAQ.displayName);
      this.updateEventForm.controls['policyTnc'].setValue(this.getEventDetails.policyTnc.displayName);
      this.updateEventForm.controls['categoryTypeId'].setValue(this.getEventDetails.categoryTypeId.displayName);

      res.body.tags.forEach(m => {
        this.valuesSelectedTag.push(m.name);
      })
      res.body.speakers.forEach(m => {
        this.valuesSpeakertags.push(m.fullName);
      })
    })
  }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }
  fileProgress2(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview2();
  }
  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }
  preview2() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.attachUrl = reader.result;
    }
  }
  uploadImage() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.authService.uploadFile(formData)
      .subscribe(res => {
        console.log("Image", res);
        this.articleImage = res.fileDownloadUri;
        console.log("Image", this.articleImage);
        alert('SUCCESS !!');
      })
  }
  uploadAttachment() {
    const formData1 = new FormData();
    formData1.append('file', this.fileData);
    this.authService.uploadFile(formData1)
      .subscribe(res => {
        console.log("Image", res);
        this.attachFile = res.fileDownloadUri;
        console.log("File", this.attachFile);
        alert('SUCCESS !!');
      })
  }

  updateEvent() {
     if(this.updateEventForm.valid){

    let name: any[] = [];
    this.updateEventForm.controls['fullName'].value.forEach(sname => {
      let speakers = {
        "fullName": sname
      };
      name.push(speakers);
    });

    let tags:any[]=[];
    console.log("eventform==",this.updateEventForm.value);

    this.tagData.forEach(m=>{
      this.updateEventForm.value.tagList.forEach(n=>{
          if(n==m.id){
            let tag={
              "id":m.id,
            "keywords": m.keywords,
            "name": m.name
            }
            tags.push(tag);
          }
      });
    })

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
    console.log("Thumb", this.articleImage);
    console.log("dateil Banner",this.attachFile);

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
      "thumbnailImageUrl": this.articleImage,
      "detailImageUrl": this.attachFile,
      "categoryTypeId": catId,
      "speakerList": name,
      "tagList": tags,
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

  }
  createSpeaker() {
    // alert("i Called");
    // console.log(this.addSpeakerForm.value.fullName);
    this.allspeakers.unshift(this.addSpeakerForm.value.fullName);
    // console.log(this.allspeakers);
  }
  createTag(){
    if(this.addTagForm.valid){
          let flag=true;
    this.tagData.forEach(m=>{
      if(m.keywords==this.addTagForm.get(['keywords']).value)
      flag=false;
    })
    let obj=this.addTagForm.value;
    if(flag){
      obj['id']=0;
    this.tagData.unshift(obj);
    this.closeModel.nativeElement.click();
  }
  else
  alert("Tag Already EXist");
  }
}
  getTagsDetails() {
    this.authService.getTagsList().subscribe((res) => {
      console.log("Tags==", res.body);
      this.tagData=res.body;
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
  Back() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
