import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})

export class CreateEventComponent implements OnInit {

  createEventForm: FormGroup;
  addTagForm: FormGroup;
  addAgenda: FormGroup;
  show = false;

  allData: any[] = [];
  tagsList: string[] = [];
  allspeakers: any[] = [];
  radio: boolean = false;

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  articleImage: any;
  attachUrl: any = null;
  attachFile: any;
  previewUrl2: any;
  tagData: any[] = [];
  speaker = new FormControl();
  tag = new FormControl();

  today = new Date();
  newtoday = new Date();
  closingDate = new Date();
  endingDate = new Date();
  regStartDate = new Date();
  regEndDate = new Date();

  locationURL:string;

  color: string = "3";
  userList: any[] = [];

  @ViewChild('closeModel', { static: true }) closeModel;
  @ViewChild('closeModelAgenda', { static: true }) closeModelAgenda;
  @ViewChild('agendaUpdate', { static: true }) agendaUpdate;


  isEvent: boolean = false;
  isWebinar: boolean = false;
  isAnonymous: boolean = false;
  checkError: any;
  submitted: boolean = false;

  imageValid: boolean = false;
  imageValid2: boolean = false;

  image1button:boolean=false;
  image2button:boolean=false;
  agendaData:any[] = [];
  counter: any;
  checkErrorAgenda: any


  // endingDate: any;



  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private sanitizer: DomSanitizer,
     private authService: AuthServiceService,
      private location: Location, public snackBar: MatSnackBar) {



  }

  ngOnInit(): void {
    this.initializeForm();
    this.getCategoryDetails();
    this.getSpeakerDetails();
    this.getTagsDetails();
    this.getUserList();

  }
  initializeForm(){
    this.newtoday.setDate(this.newtoday.getDate()-1);
    this.createEventForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      detail: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
      shortDescription: new FormControl('', [Validators.required, Validators.maxLength(700)]),
      address1: [''],
      address2: [''],
      city: [''],
      tagList: ['', Validators.required],
      premise: [''],
      webinarUrl: ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
     // locationMapUrl: ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      targetUserType: ['', Validators.required],
      country: [''],
      pincode: ['', [Validators.pattern('^[0-9]{6}$')]],
      totalSeat: [''],
      registrationCloseBeforeSeat: [''],
      //noOfSubUsersAllow: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      speakerList: [''],
      registrationStartDate: ['', Validators.required],
      registrationEndDate: ['', Validators.required],
      policyTnc: ['', [Validators.required, Validators.maxLength(3000)]],
      policyFAQ: ['', [Validators.maxLength(3000)]],
      thumbnailImageUrl:['', [Validators.required, Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]],
      detailImageUrl:['', [Validators.required, Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]],
      fullName: [''],
      name: [''],
      isDraft: [false],
      categoryTypeId: ['', Validators.required]
    })

    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.createEventForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.createEventForm.controls[controlName].hasError(errorName);
      }

    }
    this.checkErrorAgenda = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.addAgenda.controls[controlName].hasError(errorName);
        }
      } else {
        return this.addAgenda.controls[controlName].hasError(errorName);
      }

    }


    this.addTagForm = this.formBuilder.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
    })
    this.addAgenda = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      topic:new FormControl('', [Validators.maxLength(41)]),
      startDate: ['', Validators.required],
      endDate:['', Validators.required],
      speakerList: ['', Validators.required],
      isBreak:[''],
      idData:['-1'],
      id:['0']
    })
  }
  getUserList() {
    this.authService.getUserList().subscribe((res) => {
      this.userList = res.body;
      if(this.userList!=null)
      this.userList=this.userList.filter(m=>{
        return m.id!=9;
      })
    })
  }
  fileProgress(fileInput: any) {
    // console.log("validation chcek=",this.createEventForm.controls['thumbnailImageUrl'].valid);
    // this.createEventForm.controls['thumbnailImageUrl'].setValidators(Validators.apply);
    // this.createEventForm.controls['thumbnailImageUrl'].updateValueAndValidity();
    // console.log("validation chcek1=",this.createEventForm.controls['thumbnailImageUrl'].valid);
    this.previewUrl = null;
    this.imageValid = false;
    this.fileData = <File>fileInput.target.files[0];
    let fileType = this.fileData.type;
    if (fileType == 'image/jpeg' || fileType == 'image/png') {
      this.imageValid = true;
      this.preview();
    }

  }

  fileProgress2(fileInput: any) {
    this.attachUrl = null;
    this.imageValid2 = false;
    this.fileData = <File>fileInput.target.files[0];
    let fileType = this.fileData.type;
    if (fileType == 'image/jpeg' || fileType == 'image/png') {
      this.imageValid2 = true;
      this.preview2();
    }
  }
  preview() {
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
    this.image1button=false;
    this.authService.uploadFile(formData)
      .subscribe(res => {
        console.log("Image", res);
        this.articleImage = res.fileDownloadUri;
        console.log("Image", this.articleImage);
        this.imageValid = false;
        this.image1button=true;
        this.snackBar.open('Image successfully uploaded', 'Close', {duration: 5000});
      })
  }
  uploadAttachment() {
    const formData1 = new FormData();
    formData1.append('file', this.fileData);
    this.image2button=false;
    this.authService.uploadFile(formData1)
      .subscribe(res => {
        console.log("Image", res);
        this.attachFile = res.fileDownloadUri;
        console.log("File", this.attachFile);
        this.imageValid2 = false;
         this.image2button=true;
        this.snackBar.open('Image successfully uploaded', 'Close', {duration: 5000});
      })
  }


  setAddressFieldValidation(validatorType: any) {
    this.createEventForm.controls['address1'].setValidators(validatorType);
    this.createEventForm.controls['address1'].updateValueAndValidity();

    this.createEventForm.controls['city'].setValidators(validatorType);
    this.createEventForm.controls['city'].updateValueAndValidity();

    this.createEventForm.controls['country'].setValidators(validatorType);
    this.createEventForm.controls['country'].updateValueAndValidity();

    this.createEventForm.controls['pincode'].setValidators(validatorType);
    this.createEventForm.controls['pincode'].updateValueAndValidity();
  }

  setWebinarFieldValidation(validatorType: any) {
    this.createEventForm.controls['webinarUrl'].setValidators(validatorType);
    this.createEventForm.controls['webinarUrl'].updateValueAndValidity();
  }

  generateEvent() {
    const ON_PREMISE = "1";
    const WEBINAR = "2";
    const BOTH = "3";

    if (this.color == ON_PREMISE) {
      this.isEvent = true;
      this.isWebinar = false;
      this.createEventForm.controls['webinarUrl'].setValidators(null);
      this.createEventForm.controls['webinarUrl'].updateValueAndValidity();
      this.setWebinarFieldValidation(null);
      this.setAddressFieldValidation(Validators.required);
    } else if (this.color == WEBINAR) {
      this.isWebinar = true;
      this.isEvent = false;
      this.setWebinarFieldValidation(Validators.required);
      this.setAddressFieldValidation(null);
    } else if (this.color == BOTH) {
      this.isWebinar = true;
      this.isEvent = true;
      this.setWebinarFieldValidation(Validators.required);
      this.setAddressFieldValidation(Validators.required);
    }

    this.submitted = true;
    // event start time should be equal to agenda min start time
    // event end time should be equal to agenda max end time
    let minAgendaStartTime = null;
    let maxAgendaEndTime = null;
    for (let index in this.agendaData) {
      let agenda = this.agendaData[index];
      let aStartDate = agenda.startDate;
      let aEndDate = agenda.endDate;

      if(aStartDate && typeof(aStartDate)=='string'){
        aStartDate = new Date(aStartDate);
      }

      if(aEndDate && typeof(aEndDate)=='string'){
        aEndDate = new Date(aEndDate);
      }

      if (index === '0') {
        minAgendaStartTime = aStartDate;
        maxAgendaEndTime = aEndDate;
      }
      if (minAgendaStartTime > aStartDate) {
        minAgendaStartTime = aStartDate
      }

      if (maxAgendaEndTime < aEndDate) {
        maxAgendaEndTime = aEndDate;
      }
    }

    if(typeof(minAgendaStartTime)=='string'){
      minAgendaStartTime = new Date(minAgendaStartTime);
    }
    if(typeof(maxAgendaEndTime)=='string'){
      maxAgendaEndTime = new Date(maxAgendaEndTime);
    }
    let eventStartDate = this.createEventForm.controls['startDate'].value;
    if(typeof(eventStartDate)=='string'){
      eventStartDate = new Date(eventStartDate);
    }
    let eventEndDate = this.createEventForm.controls['endDate'].value;
    if(typeof(eventEndDate)=='string'){
      eventEndDate = new Date(eventEndDate);
    }

    eventStartDate.setSeconds(0);
    eventStartDate.setMilliseconds(0);

    // update event start daate as well to remove seconds and milis before save
    this.createEventForm.controls['startDate'].setValue(eventStartDate.toISOString());

    eventEndDate.setSeconds(0);
    eventEndDate.setMilliseconds(0);

    // update event start daate as well to remove seconds and milis before save
    this.createEventForm.controls['endDate'].setValue(eventEndDate.toISOString());

    minAgendaStartTime.setSeconds(0);
    minAgendaStartTime.setMilliseconds(0);

    maxAgendaEndTime.setSeconds(0);
    maxAgendaEndTime.setMilliseconds(0);

    if (minAgendaStartTime.getTime() !== eventStartDate.getTime()) {
      let errorMsg = 'Please select one of the agenda time equals to event start time';
      this.snackBar.open(errorMsg, 'Close');
      return false;
    } else if (maxAgendaEndTime.getTime() !== eventEndDate.getTime()) {
      let errorMsg = 'Please select one of the agenda time equals to event end time';
      this.snackBar.open(errorMsg, 'Close');
      return false;
    }

    if (this.createEventForm.valid) {
      this.show =true;
      let name: any[] = [];
      let spekaerName: any[] = [];
      spekaerName = this.createEventForm.controls['fullName'].value;

      for (let i = 0; i <= spekaerName.length; i++) {
        if (spekaerName != undefined) {
          let speakers = {
            "fullName": spekaerName[i]
          };
          name.push(speakers);
        }
        console.log("check me", spekaerName[i]);
      }
      console.log("check me twice", this.createEventForm.value);


      let schedule: any[] = [];
      let scheduling = {
        "endDate": this.createEventForm.controls['endDate'].value,
        "startDate": this.createEventForm.controls['startDate'].value
      };
      schedule.push(scheduling);

      let tags: any[] = [];

      this.createEventForm.value.tagList.forEach(m => {
        let tag = {
          "id": m.id,
          "keywords": m.keywords,
          "name": m.name
        }
        tags.push(tag);
      });



      let objData = {
        "title": this.createEventForm.controls['title'].value,
        "detail": this.createEventForm.controls['detail'].value,
        "shortDescription": this.createEventForm.controls['shortDescription'].value,
        "address1": this.createEventForm.controls['address1'].value,
        "address2": this.createEventForm.controls['address2'].value,
        "city": this.createEventForm.controls['city'].value,
        "country": this.createEventForm.controls['country'].value,
        "pincode": this.createEventForm.controls['pincode'].value,
        //"speakerList": this.createEventForm.controls['speakerList'].value,
        "totalSeat": this.createEventForm.controls['totalSeat'].value,
        "registrationCloseBeforeSeat": this.createEventForm.controls['registrationCloseBeforeSeat'].value,
        //"noOfSubUsersAllow": this.createEventForm.controls['noOfSubUsersAllow'].value,
        "registrationStartDate": this.createEventForm.controls['registrationStartDate'].value,
        "registrationEndDate": this.createEventForm.controls['registrationEndDate'].value,
        "webinarUrl": this.createEventForm.controls['webinarUrl'].value,
        //"locationMapUrl": this.createEventForm.controls['locationMapUrl'].value,
        "policyFAQ": this.createEventForm.controls['policyFAQ'].value,
        "policyTnc": this.createEventForm.controls['policyTnc'].value,
        "thumbnailImageUrl": this.articleImage,
        "detailImageUrl": this.attachFile,
        "categoryTypeId": this.createEventForm.controls['categoryTypeId'].value,
        "tagList": tags,
       // "eventSchedule": schedule,
        "eventSchedule": this.agendaData,
        "targetUserType": this.createEventForm.controls['targetUserType'].value,
        "autoApproveParticipant": false,
        "isbreak": false,
        "status": false,
        "isActive": false,
        "isPublish": false,
        "isRegOpen": true,
        "publishStatus": false,
        "id": 0,
        "isEvent": this.isEvent,
        "isWebinar": this.isWebinar,
        "isDraft": this.createEventForm.controls['isDraft'].value
        //"isDraft": (this.createEventForm.controls['isDraft'].value || false)
      }

      console.log("Post Data", objData);
      this.show =false;

      this.authService.saveEventDetails(objData).subscribe(
        (response) => {

          this.snackBar.open('Event successfully created', 'Close', {duration: 2000});
          this.submitted = false;
          console.log("Api success res", response);
          this.show =false;
          this.router.navigate(['events']);
        },
        (error) => {
          console.log("error",error);

          this.snackBar.open('Something went wrong', 'Close');
           this.show =false;
         }
      )
     }
    else {
      this.snackBar.open('Please fill all mandatory fields', 'Close', {duration: 5000});
    }

  }

  createAgenda(){
    this.addAgenda.controls['title'].setValidators(Validators.required);
    this.addAgenda.controls['title'].updateValueAndValidity();
    this.addAgenda.controls['topic'].setValidators(Validators.required);
    this.addAgenda.controls['topic'].updateValueAndValidity();
    // this.addAgenda.controls['isBreak'].setValidators(null);
    // this.addAgenda.controls['isBreak'].updateValueAndValidity();
    this.addAgenda.controls['endDate'].setValidators(Validators.required);
    this.addAgenda.controls['endDate'].updateValueAndValidity();
    this.addAgenda.controls['startDate'].setValidators(Validators.required);
    this.addAgenda.controls['startDate'].updateValueAndValidity();
    this.addAgenda.controls['speakerList'].setValidators(Validators.required);
    this.addAgenda.controls['speakerList'].updateValueAndValidity();

    if (this.addAgenda.valid) {
    let obj= {
      "title": this.addAgenda.controls['title'].value,
      "topic": this.addAgenda.controls['topic'].value,
      "isBreak": this.addAgenda.controls['isBreak'].value,
      "endDate": this.addAgenda.controls['endDate'].value,
      "startDate": this.addAgenda.controls['startDate'].value,
      "speakerList": this.addAgenda.controls['speakerList'].value,
      "id":0,
      "idData":-1
    }

    let eventStartDate = this.createEventForm.get(['startDate']).value;
    let agendaStartDate = obj.startDate;
    let agendaEndDate = obj.endDate;

    if (agendaStartDate && typeof(agendaStartDate) == 'string') {
      agendaStartDate = new Date(agendaStartDate);
    }

    if (agendaEndDate && typeof(agendaEndDate) == 'string') {
      agendaEndDate = new Date(agendaEndDate);
    }

    if (eventStartDate && typeof(eventStartDate) == 'string') {
      eventStartDate = new Date(eventStartDate);
    }

    agendaStartDate.setDate(eventStartDate.getDate());
    agendaStartDate.setMonth(eventStartDate.getMonth());
    agendaStartDate.setFullYear(eventStartDate.getFullYear());
    agendaStartDate.setSeconds(0);
    agendaStartDate.setMilliseconds(0);

    agendaEndDate.setDate(eventStartDate.getDate());
    agendaEndDate.setMonth(eventStartDate.getMonth());
    agendaEndDate.setFullYear(eventStartDate.getFullYear());
    agendaEndDate.setSeconds(0);
    agendaEndDate.setMilliseconds(0);

    obj.startDate = agendaStartDate;
    obj.endDate = agendaEndDate

    console.log("myobj",obj);

    console.log("id=", this.addAgenda.controls['idData'].value);
    if(this.addAgenda.value['idData']!= -1){
      obj['idData'] = this.addAgenda.value['idData'];
    }else{
      obj['idData'] = -1;
    }
    console.log("id=", obj.idData);

    this.addAgenda.reset()
    if(obj.idData == -1){
      this.agendaData.push(obj);
    }else{
      this.agendaData[(obj.idData)]=obj;
    }
    this.addAgenda.controls['idData'].setValue("-1");
    this.closeModelAgenda.nativeElement.click();

    // this.addAgenda.controls['speakerList'].setValidators(null);
    // this.addAgenda.controls['speakerList'].updateValueAndValidity();
  }
else{
  alert("please fill mandatory");
}
  }
  clearValidation(){
    this.addAgenda.controls['title'].setValidators(null);
    this.addAgenda.controls['title'].updateValueAndValidity();
    this.addAgenda.controls['topic'].setValidators(null);
    this.addAgenda.controls['topic'].updateValueAndValidity();
    this.addAgenda.controls['isBreak'].setValidators(null);
    this.addAgenda.controls['isBreak'].updateValueAndValidity();
    this.addAgenda.controls['endDate'].setValidators(null);
    this.addAgenda.controls['endDate'].updateValueAndValidity();
    this.addAgenda.controls['startDate'].setValidators(null);
    this.addAgenda.controls['startDate'].updateValueAndValidity();
    this.addAgenda.controls['speakerList'].setValidators(null);
    this.addAgenda.controls['speakerList'].updateValueAndValidity();
    // this.addAgenda.reset();
  }
  delete(i){
    this.agendaData.splice(i,1);
  }
  // resetForm(){
  //   this.addAgenda.reset();
  // }
  updateAgenda(i){
    // alert(i);
    this.agendaData[i].idData = i;
    console.log("log", this.agendaData[i]);
    this.addAgenda.setValue(this.agendaData[i]);
    this.agendaUpdate.nativeElement.click();
  }
    createTag() {
    if (this.addTagForm.valid) {
      let flag = true;
      this.tagData.forEach(m => {
        if (m.keywords == this.addTagForm.get(['keywords']).value)
          flag = false;
      })
      let obj = this.addTagForm.value
      if (flag) {
        obj['id'] = 0;
        this.tagData.unshift(obj);
        this.closeModel.nativeElement.click();
      }
      else
        alert("Tag Already EXist");
    }
  }
  getTagsDetails() {
    this.authService.getTagsList().subscribe((res) => {
      this.tagData = res.body;
    })
  }
  getCategoryDetails() {
    this.authService.getCategoryList().subscribe((res) => {
      this.allData = res.body;
    })
  }

  getSpeakerDetails() {
    this.authService.getAllSpeakers().subscribe((res) => {
      this.allspeakers = res.body;
    })
  }
  Back() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  maxCDate() {
    console.log("Closing Date", this.createEventForm.get(['startDate']).value);
    let eventStartDate = this.createEventForm.get(['startDate']).value;
    this.closingDate = eventStartDate;
    this.regStartDate = eventStartDate;
    if (eventStartDate && typeof(eventStartDate) == 'string') {
      eventStartDate = new Date(eventStartDate);
    }

    let eventEndDate = this.createEventForm.controls['endDate'].value;

    if (eventEndDate && typeof(eventEndDate) == 'string') {
      eventEndDate = new Date(eventEndDate);
    }

    // setting event end date equal to start date as no is allowed to select in end date field
    eventEndDate.setDate(eventStartDate.getDate());
    eventEndDate.setMonth(eventStartDate.getMonth());
    eventEndDate.setFullYear(eventStartDate.getFullYear());
    eventEndDate.setSeconds(0);
    eventEndDate.setMilliseconds(0);

    this.createEventForm.controls['endDate'].setValue(eventEndDate.toISOString());

     // update all agenda start date if start dates changes
     for (let index in this.agendaData) {
       let agenda = this.agendaData[index];
       let agenStartDateObj = null;
       let agendaEndDate = null;

       if (agenda.startDate && typeof(agenda.startDate) == 'string') {
         agenStartDateObj = new Date(agenda.startDate);
       }

       if (agenda.endDate && typeof(agenda.endDate) == 'string') {
         agendaEndDate = new Date(agenda.endDate);
       }

       agenStartDateObj.setDate(eventStartDate.getDate());
       agenStartDateObj.setMonth(eventStartDate.getMonth());
       agenStartDateObj.setFullYear(eventStartDate.getFullYear());
       agenStartDateObj.setSeconds(0);
       agenStartDateObj.setMilliseconds(0);

       agendaEndDate.setDate(eventStartDate.getDate());
       agendaEndDate.setMonth(eventStartDate.getMonth());
       agendaEndDate.setFullYear(eventStartDate.getFullYear());
       agendaEndDate.setSeconds(0);
       agendaEndDate.setMilliseconds(0);

       agenda.startDate = agenStartDateObj.toISOString();
       agenda.endDate = agendaEndDate.toISOString();
     }
  }
  maxEDate() {
    console.log("ending Date", this.createEventForm.get(['endDate']).value);
    this.endingDate = this.createEventForm.get(['endDate']).value;
  }
  maxRegDate() {
    this.regEndDate = this.createEventForm.get(['registrationStartDate']).value;
  }
  getLocation() {
    alert("inside location");
    this.authService.getLocation().subscribe(res => {
      console.log(res);
    })
  }
}
