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
  // safeSrc: SafeResourceUrl;
  // mapData: any;
  // mapUrl:any;

  createEventForm: FormGroup;
  addTagForm: FormGroup;

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
  regStartDate = new Date();
  regEndDate = new Date();

  locationURL:string;

  color: string = "3";
  userList: any[] = [];

  @ViewChild('closeModel', { static: true }) closeModel;

  isEvent: boolean = false;
  isWebinar: boolean = false;
  isAnonymous: boolean = false;
  checkError: any;
  submitted: boolean = false;

  imageValid: boolean = false;
  imageValid2: boolean = false;



  constructor(private formBuilder: FormBuilder, private router: Router, private sanitizer: DomSanitizer, private authService: AuthServiceService, private location: Location, public snackBar: MatSnackBar) {

    this.newtoday.setDate(this.newtoday.getDate()-1);
    this.createEventForm = formBuilder.group({
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
      noOfSubUsersAllow: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      speakerList: ['', Validators.required],
      registrationStartDate: ['', Validators.required],
      registrationEndDate: ['', Validators.required],
      policyTnc: new FormControl('', [Validators.required, Validators.maxLength(3000)]),
      policyFAQ: new FormControl('', [Validators.maxLength(3000)]),
      thumbnailImageUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]),
      detailImageUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]),
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


    this.addTagForm = formBuilder.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getCategoryDetails();
    this.getSpeakerDetails();
    this.getTagsDetails();
    this.getUserList();

  }

  getUserList() {
    this.authService.getUserList().subscribe((res) => {
      this.userList = res.body;
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
    this.authService.uploadFile(formData)
      .subscribe(res => {
        console.log("Image", res);
        this.articleImage = res.fileDownloadUri;
        console.log("Image", this.articleImage);
        this.snackBar.open('Image successfully uploaded', 'Close', {duration: 5000});
        //alert('SUCCESS !!');
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
        this.snackBar.open('Image successfully uploaded', 'Close', {duration: 5000});
        //alert('SUCCESS !!');
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
    if (this.createEventForm.valid) {

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
        "speakerList": this.createEventForm.controls['speakerList'].value,
        "totalSeat": this.createEventForm.controls['totalSeat'].value,
        "registrationCloseBeforeSeat": this.createEventForm.controls['registrationCloseBeforeSeat'].value,
        "noOfSubUsersAllow": this.createEventForm.controls['noOfSubUsersAllow'].value,
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
        "eventSchedule": schedule,
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
      //this.snackBar.open('Event successfully created', 'Close', {duration: 5000});
      this.authService.saveEventDetails(objData).subscribe(
        (response) => {
          this.snackBar.open('Event successfully created', 'Close', {duration: 5000});
          //alert("Event successfully created");
         // console.log("responsne", response);
          this.submitted = false;
          this.router.navigate(['events']);
        },
        (error) => {
          this.snackBar.open(error, 'Close');
          // alert("Error :" + error);
         }
      )
     }
    else {
      this.snackBar.open('Please fill all mandatory fields', 'Close', {duration: 5000});
    }

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

  // fileProgress1(fileInput: any) {
  //   this.fileData = <File>fileInput.target.files[0];
  //   this.preview1();
  // }
  // preview1() {
  //   // Show preview
  //   var mimeType = this.fileData.type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     return;
  //   }

  //   var reader = new FileReader();
  //   reader.readAsDataURL(this.fileData);
  //   reader.onload = (_event) => {
  //     this.previewUrl2 = reader.result;
  //   }
  // }
  // getNewLocation(){
  //   this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(this.createEventForm.get(['locationMapUrl']).value);
  //   this.mapUrl = this.createEventForm.get(['locationMapUrl']).value;
  //  console.log("locationMapUrl", this.locationURL);
  // }
  maxCDate() {
    console.log("Closing Date", this.createEventForm.get(['startDate']).value);
    this.closingDate = this.createEventForm.get(['startDate']).value;
   this.regStartDate = this.closingDate;
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
