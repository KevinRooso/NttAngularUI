import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location} from '@angular/common';
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


  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  articleImage: any;
  attachUrl: any = null;
  attachFile: any;
  tagData:any[]=[];
  speaker = new FormControl();
  tag = new FormControl();
  today=new Date();
  @ViewChild('closeModel',{static:true}) closeModel;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthServiceService, private location: Location) {
    this.createEventForm = formBuilder.group({
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
      categoryTypeId:['',Validators.required]

    })
    this.addSpeakerForm = formBuilder.group({
      fullName:['',Validators.required]
    })
    this.addTagForm = formBuilder.group({
      name:['',Validators.required],
      keywords:['',Validators.required],
    })
  }

  ngOnInit(): void {
    this.getCategoryDetails();
    this.getPolicyFaQDetails();
    this.getPolicyTnCDetails();
    this.getSpeakerDetails();
    this.getTagsDetails();
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


  generateEvent() {
    if(this.createEventForm.valid){
      // if(true){
    let name:any[]=[];
    let spekaerName:any[] = [];
    spekaerName = this.createEventForm.controls['fullName'].value;
    // console.log("check me", this.createEventForm.controls['fullName'].value)
    // spekaerName.forEach(sname=>{
    //   let speakers={
    //     "fullName":sname
    //   };
    //   name.push(speakers);
    // });
    for(let i=0; i<=spekaerName.length;i++){
      if(spekaerName != undefined){
        let speakers={
          "fullName":spekaerName[i]
        };
        name.push(speakers);
      }
      console.log("check me", spekaerName[i]);
    }
    console.log("check me twice", this.createEventForm.value);
    // let tag:any[]=[];
    //   for(let i=0; i<=this.createEventForm.controls['name'].value.length;i++){
    //     let tags={
    //       "name":this.createEventForm.controls['name'].value[i]
    //       };
    //      tag.push(tags);
    //   }
      // this.createEventForm.controls['name'].value.forEach(tname=>{
      //   let tags={
      //     "name":tname
      //   };
      //   tag.push(tags);
      // });

    let schedule:any[]=[];
      let scheduling={
        "endTime":this.createEventForm.controls['endTime'].value,
        "startTime":this.createEventForm.controls['startTime'].value
      };
      schedule.push(scheduling);

    let tags:any[]=[];

    this.createEventForm.value.tagList.forEach(m=>{
      let tag={
        "id":m.id,
      "keywords": m.keywords,
      "name": m.name
      }
      tags.push(tag);
    });

    let objData={
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
      // "thumbnailImageUrl":this.createEventForm.controls['thumbnailImageUrl'].value,
      "thumbnailImageUrl":this.articleImage,
      "detailImageUrl":this.attachFile,
      "categoryTypeId":this.createEventForm.controls['categoryTypeId'].value,
      "speakerList":name,
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
      "id":0
    }

    console.log("Post Data",objData);

    this.authService.saveEventDetails(objData).subscribe(
      (response) => {
        alert("Successfully Created");
        console.log("responsne", response)},
      (error) => console.log(error)
    )
  }
  }
  createSpeaker(){
    if(this.addSpeakerForm.valid){
     // alert("i Called");
      this.allspeakers.unshift(this.addSpeakerForm.value.fullName);
      console.log(this.addSpeakerForm.value.fullName);
      console.log("new Array", this.allspeakers);
    }
    // alert("i Called");
    // console.log(this.addSpeakerForm.value.fullName);

    // console.log(this.allspeakers);
  }
  createTag(){
    if(this.addTagForm.valid){
          let flag=true;
    this.tagData.forEach(m=>{
      if(m.keywords==this.addTagForm.get(['keywords']).value)
      flag=false;
    })
    let obj=this.addTagForm.value
    if(flag){
      obj['id']=0;
    this.tagData.push(obj);
    this.closeModel.nativeElement.click();
  }
  else
  alert("Tag Already EXist");
  }
}
  getTagsDetails(){
    this.authService.getTagsList().subscribe((res)=>{
      // console.log("Tag", res.body);
      this.tagData=res.body;
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
  Back() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  // reset(){
  //   this.addTagForm.resetForm();
  //   this.addSpeakerForm.resetForm();
  // }
}
