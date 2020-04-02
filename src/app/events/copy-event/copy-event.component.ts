import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location} from '@angular/common';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-copy-event',
  templateUrl: './copy-event.component.html',
  styleUrls: ['./copy-event.component.css']
})
export class CopyEventComponent implements OnInit {
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
  previewUrl2: any = null;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  articleImage: any;
  attachUrl: any = null;
  attachFile: any;
  color:string="3" ;
  userList:any[]=[];
  selected4:string[]=[];
  selected6:string[]=[];
  selected1:string ='Cloud Computing';
  @ViewChild('closeModel',{static:true}) closeModel;
  @ViewChild('closespeakerModel',{static:true}) closespeakerModel;
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
      premise:[''],
      webinarurl:[''],
      userType:[''],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      totalSeat: ['',Validators.required],
      registrationCloseBeforeSeat: [''],
      noOfSubUsersAllow: [''],
      startTime: [''],
      speakerList:[''],
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

    let mobnum = "^((\\+91-?)|0)?[0-9]{10}$";
    this.createSpeakerForm = formBuilder.group({
      fullName: ['', Validators.required],
      description: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      personalEmail: ['', [Validators.required, Validators.email]],
      designation: ['', Validators.required],
      // profile: ['', Validators.required],
      origanizationName: ['', Validators.required],
      phone: ['',[Validators.required, Validators.pattern(mobnum)]],
      keySkills: [''],
      profileImageUrl: ['']
    });

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
    this.getUserList();
  }
  getUserList(){
    this.authService.getUserList().subscribe((res)=>{
      // console.log("Tag", res.body);
      this.userList=res.body;
    })
  }
  getEventData(id) {
    this.authService.getEventDetail(id).subscribe(res => {
      console.log("res=====",res);

      this.getEventDetails = res.body;
       for(let i=0;i<res.body.tags.length;i++)
        this.selected4.push(res.body.tags[i].id);
        console.log("tags=",this.selected4);
      for(let i=0;i<res.body.speakers.length;i++)
        this.selected6.push(res.body.speakers[i].id);
        console.log("speakerlist=",this.selected6);

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
     // if(true){


    let tags:any[]=[];
    let speakerList1:any[]=[];
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

    this.allspeakers.forEach(m=>{
      this.updateEventForm.value.speakerList.forEach(n=>{
          if(n==m.id){

            speakerList1.push(m);
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
      "speakerList":speakerList1,
      "policyFAQ": faqId,
      "policyTnc": tncId,
      "thumbnailImageUrl": this.articleImage,
      "detailImageUrl": this.attachFile,
      "categoryTypeId": catId,
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
      "id": 0
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
      this.allspeakers=res.body;

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

  //speakerssss
  createSpeakerForm: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: any[] = [];

  fileData1: File = null;
  previewUrl1: any = null;
  fileUploadProgress1: string = null;
  uploadedFilePath1: string = null;
  speakerImage:string="";

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }


  fileProgress1(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview1();
  }
  preview1() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl2 = reader.result;
    }
  }
  uploadImage1() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.authService.uploadFile(formData)
      .subscribe(res => {
        console.log("Image", res);
        this.speakerImage = res.fileDownloadUri;
        console.log(this.speakerImage);
        // alert('SUCCESS !!');
      })
  }
  createSpeaker(){
    if(this.createSpeakerForm.valid){
    // if(true){
      let fruit1 = '';
      console.log(this.fruits);
      this.fruits.forEach(m => {
        fruit1 = fruit1 + ',' + m.name;
      })
      let flag=true;
this.allspeakers.forEach(m=>{
  if(m.email==this.createSpeakerForm.get(['email']).value)
  flag=false;
})
      let obj=this.createSpeakerForm.value;
      if(flag){
      obj['keySkills']=fruit1.substring(1, fruit1.length - 0),
      obj['id']=0,
      obj['profileImageUrl']=this.speakerImage,
      this.allspeakers.unshift(this.createSpeakerForm.value);
      console.log(this.createSpeakerForm.value);
      console.log("new Array", this.allspeakers);
      this.closespeakerModel.nativeElement.click();
}
    else
    alert("Speaker Already EXist");
        }
  }

}
