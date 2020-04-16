import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  updateEventForm: FormGroup;
  //addSpeakerForm: FormGroup;
  addTagForm: FormGroup;
  addAgenda: FormGroup;
  show = false;
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

  today=new Date();
  closingDate = new Date();
  regStartDate = new Date();
  regEndDate = new Date();
  submitted: boolean = false;
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
  agendaData:any[] = [];
  checkError:any;
  isEvent:boolean = false;
  isWebinar:boolean = false;

  imageValid: boolean = false;
  imageValid2: boolean = false;

  endingDate = new Date();

  image1button:boolean=false;
  image2button:boolean=false;
  // selected1:string ='Cloud Computing';
  @ViewChild('closeModel',{static:true}) closeModel;
  @ViewChild('closeModelAgenda', { static: true }) closeModelAgenda;
  @ViewChild('agendaUpdate', { static: true }) agendaUpdate;
  // @ViewChild('closespeakerModel',{static:true}) closespeakerModel;
  constructor(private formBuilder: FormBuilder, private location: Location, private router: Router, public snackBar: MatSnackBar, private authService: AuthServiceService, private router1: ActivatedRoute) {
    this.updateEventForm = formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      detail: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
      shortDescription: new FormControl('', [Validators.required, Validators.maxLength(700)]),
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      tagList: ['', Validators.required],
      premise: [''],
      webinarUrl: ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      targetUserType: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      totalSeat: [''],
      registrationCloseBeforeSeat: [''],
      //noOfSubUsersAllow: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      speakerList: [''],
      registrationStartDate: ['', Validators.required],
      registrationEndDate: ['', Validators.required],
      policyTnc: new FormControl('', [Validators.required, Validators.maxLength(3000)]),
      policyFAQ: new FormControl('', [Validators.maxLength(3000)]),
      thumbnailImageUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]),
      detailImageUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]),
      fullName: [''],
      name: [''],
      isDraft:[''],
      categoryTypeId: ['', Validators.required]
    })
    // this.submitted = true;
    this.checkError = (controlName: string, errorName: string, checkSubmitted:boolean) => {
      if(checkSubmitted){
        if(this.submitted){
          return this.updateEventForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.updateEventForm.controls[controlName].hasError(errorName);
      }

    }
    // let mobnum = "^((\\+91-?)|0)?[0-9]{10}$";
    // this.createSpeakerForm = formBuilder.group({
    //   fullName: ['', Validators.required],
    //   description: ['', Validators.required],
    //   email: ['',[Validators.required, Validators.email]],
    //   personalEmail: ['', [Validators.required, Validators.email]],
    //   designation: ['', Validators.required],
    //   // profile: ['', Validators.required],
    //   origanizationName: ['', Validators.required],
    //   phone: ['',[Validators.required, Validators.pattern(mobnum)]],
    //   keySkills: [''],
    //   profileImageUrl: ['']
    // });

    this.addTagForm = formBuilder.group({
      name:['',Validators.required],
      keywords: ['',Validators.required]
    });
    this.addAgenda = formBuilder.group({
      title: [''],
      topic: [''],
      startDate: [''],
      endDate: [''],
      speakerList: [''],
      isBreak:[''],
      idData:['-1'],
      id:['0'],
      isActive: [false]
    })
    console.log("validation chcek=",this.updateEventForm.controls['thumbnailImageUrl'].valid);
  }
  ngOnInit(): void {
    this.router1.queryParams.subscribe(params => {
      console.log(params.page);
      this.evntID = params.page;
      this.getEventData(params.page);
    });
    // this.getPolicyFaQDetails();
    // this.getPolicyTnCDetails();

  }
  getUserList(){
    this.authService.getUserList().subscribe((res)=>{
      this.userList = res.body;
      if(this.userList!=null)
      this.userList=this.userList.filter(m=>{
        return m.id!=9;
      })
    })
  }
  getEventData(id) {
    this.show = true;
    this.authService.getEventDetail(id).subscribe(res => {
      console.log("res=====",res);

      this.getEventDetails = res.body.events;
      console.log("data id",this.getEventDetails);
       for(let i=0;i<this.getEventDetails.tags.length;i++)
        this.selected4.push(this.getEventDetails.tags[i].id);
        console.log("tags=",this.selected4);
      // for(let i=0;i<this.getEventDetails.speakers.length;i++)
      //   this.selected6.push(this.getEventDetails.speakers[i].id);
      //   console.log("speakerlist=",this.selected6);

      if(this.getEventDetails.isEvent == true && this.getEventDetails.isWebinar == false){
        this.color="1";
      }
      if(this.getEventDetails.isEvent == false && this.getEventDetails.isWebinar == true){
        this.color="2";
      }
      if(this.getEventDetails.isEvent == true && this.getEventDetails.isWebinar == true){
        this.color="3";
      }
      console.log("Get Event data", this.getEventDetails);
      this.updateEventForm.controls['title'].setValue(this.getEventDetails.title);
      this.updateEventForm.controls['detail'].setValue(this.getEventDetails.detail);
      this.updateEventForm.controls['shortDescription'].setValue(this.getEventDetails.shortDescription);
      this.updateEventForm.controls['registrationCloseBeforeSeat'].setValue(this.getEventDetails.registrationCloseBeforeSeat);
      this.updateEventForm.controls['address1'].setValue(this.getEventDetails.address1);
      this.updateEventForm.controls['address2'].setValue(this.getEventDetails.address2);
      this.updateEventForm.controls['city'].setValue(this.getEventDetails.city);
      this.updateEventForm.controls['totalSeat'].setValue(this.getEventDetails.totalSeat);

      this.updateEventForm.controls['registrationStartDate'].setValidators(null);
      this.updateEventForm.controls['registrationStartDate'].updateValueAndValidity();
      this.updateEventForm.controls['registrationStartDate'].setValue(this.getEventDetails.registrationStartDate);

      this.updateEventForm.controls['registrationEndDate'].setValidators(null);
      this.updateEventForm.controls['registrationEndDate'].updateValueAndValidity();
      this.updateEventForm.controls['registrationEndDate'].setValue(this.getEventDetails.registrationEndDate);


      this.updateEventForm.controls['country'].setValue(this.getEventDetails.country);
      this.updateEventForm.controls['pincode'].setValue(this.getEventDetails.pincode);
    // this.updateEventForm.controls['noOfSubUsersAllow'].setValue(this.getEventDetails.noOfSubUsersAllow);
      this.updateEventForm.controls['detailImageUrl'].setValidators(null);
      this.updateEventForm.controls['detailImageUrl'].updateValueAndValidity();
      this.attachUrl = this.getEventDetails.detailImageUrl;
      this.attachFile= this.getEventDetails.detailImageUrl
      this.updateEventForm.controls['thumbnailImageUrl'].setValidators(null);
      this.updateEventForm.controls['thumbnailImageUrl'].updateValueAndValidity();
      this.previewUrl= this.getEventDetails.thumbnailImageUrl;
      this.articleImage= this.getEventDetails.thumbnailImageUrl

      this.updateEventForm.controls['tagList'].setValidators(null);
      this.updateEventForm.controls['tagList'].updateValueAndValidity();

      //this.updateEventForm.controls['speakerList'].setValidators(null);
     // this.updateEventForm.controls['speakerList'].updateValueAndValidity();

      this.updateEventForm.controls['startDate'].setValidators(null);
      this.updateEventForm.controls['startDate'].updateValueAndValidity();
      this.updateEventForm.controls['startDate'].setValue(this.getEventDetails.eventSchedule[0].startDate);


      this.updateEventForm.controls['endDate'].setValidators(null);
      this.updateEventForm.controls['endDate'].updateValueAndValidity();
      this.updateEventForm.controls['endDate'].setValue(this.getEventDetails.eventSchedule[0].endDate);


      this.updateEventForm.controls['policyFAQ'].setValue(this.getEventDetails.policyFAQ);
      this.updateEventForm.controls['policyTnc'].setValue(this.getEventDetails.policyTnc);
      this.updateEventForm.controls['categoryTypeId'].setValue(this.getEventDetails.categoryTypeId.displayName);
      this.updateEventForm.controls['targetUserType'].setValue(this.getEventDetails.targetUserType.displayName);
      this.updateEventForm.controls['webinarUrl'].setValue(this.getEventDetails.webinarUrl);
      this.updateEventForm.controls['isDraft'].setValue(this.getEventDetails.isDraft);

      this.getEventDetails.tags.forEach(m => {
        this.valuesSelectedTag.push(m.name);
      })

      if(this.getEventDetails.eventSchedule!=null){
        this.endingDate=this.getEventDetails.eventSchedule[0].endDate;
        this.closingDate=this.getEventDetails.eventSchedule[0].startDate;
      this.getEventDetails.eventSchedule.forEach((m,n)=>{
        console.log("nnnnn=",n);

        let obj= {
          "title": m.title,
          "topic": m.topic,
          "isBreak": m.isBreak,
          "endDate": m.endDate,
          "startDate": m.startDate,
          "speakerList": m.speakers,
          "isActive": false,
          "id":m.id,
          "idData":n
        }
        this.agendaData.push(obj);
      })
    }
     console.log("agenda data=", this.agendaData);

      this.getCategoryDetails();
      this.getSpeakerDetails()
      this.getTagsDetails();
      this.getUserList();
      this.show = false;
    })
  }
  fileProgress(fileInput: any) {
    this.previewUrl = null;
    this.imageValid = false;
    this.fileData = <File>fileInput.target.files[0];
    let fileType = this.fileData.type;
    if (fileType == 'image/jpeg' || fileType == 'image/png') {
      this.imageValid = true;
      this.preview();
    }
  }
  // fileProgress(fileInput: any) {
  //   this.fileData = <File>fileInput.target.files[0];
  //   this.imgValid =true;
  //   this.preview();
  // }
  // fileProgress2(fileInput: any) {
  //   this.fileData = <File>fileInput.target.files[0];
  //   //this.imgValid1 =true;
  //   this.preview2();
  // }
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
        this.image1button=true;
        this.snackBar.open('Image successfully uploaded', 'Close', {duration: 5000});
      })
  }

  setAddressFieldValidation(validatorType: any) {
    this.updateEventForm.controls['address1'].setValidators(validatorType);
    this.updateEventForm.controls['address1'].updateValueAndValidity();

    this.updateEventForm.controls['city'].setValidators(validatorType);
    this.updateEventForm.controls['city'].updateValueAndValidity();

    this.updateEventForm.controls['country'].setValidators(validatorType);
    this.updateEventForm.controls['country'].updateValueAndValidity();

    this.updateEventForm.controls['pincode'].setValidators(validatorType);
    this.updateEventForm.controls['pincode'].updateValueAndValidity();
  }

  setWebinarFieldValidation(validatorType: any) {
    this.updateEventForm.controls['webinarUrl'].setValidators(validatorType);
    this.updateEventForm.controls['webinarUrl'].updateValueAndValidity();
  }

  updateEvent() {
    const ON_PREMISE = "1";
    const WEBINAR = "2";
    const BOTH = "3";

    if(this.color == ON_PREMISE){
      this.isEvent = true;
      this.isWebinar = false;
      this.updateEventForm.controls['webinarUrl'].setValidators(null);
      this.updateEventForm.controls['webinarUrl'].updateValueAndValidity();
      this.setWebinarFieldValidation(null);
      this.setAddressFieldValidation(Validators.required);
    } else if(this.color == WEBINAR){
      this.isWebinar = true;
      this.isEvent = false;
      this.setWebinarFieldValidation(Validators.required);
      this.setAddressFieldValidation(null);
    } else if(this.color == BOTH){
      this.isWebinar = true;
      this.isEvent = true;
      this.setWebinarFieldValidation(Validators.required);
      this.setAddressFieldValidation(Validators.required);
    }

    this.submitted = true;
   if(this.updateEventForm.valid){
    this.show =true;
    let tags:any[]=[];
    let speakerList1:any[]=[];
    // console.log("eventform==",this.updateEventForm.value);

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

    // this.allspeakers.forEach(m=>{
    //   this.updateEventForm.value.speakerList.forEach(n=>{
    //       if(n==m.id){

    //         speakerList1.push(m);
    //       }
    //   });
    // })

    let schedule: any[] = [];
    let scheduling = {
      "endDate": this.updateEventForm.controls['endDate'].value,
      "startDate": this.updateEventForm.controls['startDate'].value
    };
    schedule.push(scheduling);
    let catId;

    this.allData.forEach(m=>{
      if(m.displayName==this.updateEventForm.controls['categoryTypeId'].value)
        catId=m.id;
    });

    let userId;
    this.userList.forEach(m=>{
      if(m.displayName==this.updateEventForm.controls['targetUserType'].value)
        userId=m.id;
    });

    // let tncId;
    // this.allPolicyTNC.forEach(m=>{
    //   if(m.displayName==this.updateEventForm.controls['policyTnc'].value)
    //   tncId=m.id;
    // });

    // let faqId;
    // this.allPolicyFAQ.forEach(m=>{
    //   if(m.displayName==this.updateEventForm.controls['policyFAQ'].value)
    //   faqId=m.id;
    // });
    // console.log("Thumb", this.articleImage);
    // console.log("dateil Banner",this.attachFile);description
    // this.agendaData[0].isActive = false;
    // this.agendaData[0].description = "";
    // this.agendaData[0].speakers[0].isActive = false;
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
     // "noOfSubUsersAllow": this.updateEventForm.controls['noOfSubUsersAllow'].value,
      "registrationStartDate": this.updateEventForm.controls['registrationStartDate'].value,
      "registrationEndDate": this.updateEventForm.controls['registrationEndDate'].value,
      //"speakerList":speakerList1,
      "policyFAQ": this.updateEventForm.controls['policyFAQ'].value,
      "policyTnc": this.updateEventForm.controls['policyTnc'].value,
      "thumbnailImageUrl": this.articleImage,
      "detailImageUrl": this.attachFile,
      "categoryTypeId": catId,
      "tagList": tags,
      "eventSchedule": this.agendaData,
      "autoApproveParticipant": false,
      "isbreak": false,
      "status": false,
      "isDraft": this.updateEventForm.controls['isDraft'].value,
      "isPublish": false,
      "isRegOpen": false,
      "publishStatus": false,
      "isActive":false,
      "id": this.evntID,
      "targetUserType":userId,
      "isEvent":this.isEvent,
      "isWebinar":this.isWebinar,
      "webinarUrl":this.updateEventForm.controls['webinarUrl'].value

    }

    console.log("Updated Data", obj);

    this.authService.saveEventDetails(obj).subscribe(
      (response) => {
        console.log("responsne", response);
        this.snackBar.open('Event successfully updated', 'Close', {duration: 2000});
       // alert("Successfully Updated");
        this.submitted = false;
        this.show =false;
       // this.router.navigate(['/details'], { queryParams: { page: this.evntID } });
      },
      (error) => {
        //alert("Error :"+error);
        console.log("Api fail",error)
        //this.snackBar.open(error, 'Close');
        this.show =false;
      }
    )
   } else{
    this.snackBar.open('Please fill all mandatory fields', 'Close', {duration: 5000});
  }
  }
  createAgenda(){
    // if (this.addAgenda.valid) {
      console.log("Check",this.addAgenda.controls['idData'].value);
    let obj= {
      "title": this.addAgenda.controls['title'].value,
      "topic": this.addAgenda.controls['topic'].value,
      "isBreak": this.addAgenda.controls['isBreak'].value,
      "endDate": this.addAgenda.controls['endDate'].value,
      "startDate": this.addAgenda.controls['startDate'].value,
      "speakerList": this.addAgenda.controls['speakerList'].value,
      "isActive": false,
      "id":0,
      "idData":-1
    }

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
  }
// }
  delete(i){
    this.agendaData.splice(i,1);
  }
  updateAgenda(i){
    // alert(i);
    this.agendaData[i].idData = i;
    console.log("log", this.agendaData[i]);
    this.addAgenda.setValue(this.agendaData[i]);
    this.agendaUpdate.nativeElement.click();
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
      this.tagData=res.body;
    })
  }
  getCategoryDetails() {
    this.authService.getCategoryList().subscribe((res) => {
      this.allData = res.body;
    })
  }
  getSpeakerDetails() {
    this.authService.getAllSpeakers().subscribe((res) => {
      this.allspeakers=res.body;
    })
  }

  Back() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  maxCDate() {
    console.log("Closing Date", this.updateEventForm.get(['startDate']).value);
    this.closingDate = this.updateEventForm.get(['startDate']).value;
   this.regStartDate = this.closingDate;
  }
  maxEDate() {
    console.log("ending Date", this.updateEventForm.get(['endDate']).value);
    this.endingDate = this.updateEventForm.get(['endDate']).value;
  }
  maxRegDate() {
    this.regEndDate = this.updateEventForm.get(['registrationStartDate']).value;
  }
  getLocation() {
    alert("inside location");
    this.authService.getLocation().subscribe(res => {
      console.log(res);
    })
  }


}
