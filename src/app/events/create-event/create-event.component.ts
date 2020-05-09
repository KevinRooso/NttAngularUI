import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  createEventForm: FormGroup;
  addTagForm: FormGroup;
  addAgenda: FormGroup;
  show = false;

  allData: any[] = [];
  tagsList: string[] = [];
  allspeakers: any[] = [];
  radio = false;

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

  locationURL: string;

  color = '3';
  userList: any[] = [];
  errorMsg1: any;
  errorMsg2: any;
  valuei: any;

  @ViewChild('closeModel', { static: true }) closeModel;
  @ViewChild('closeModelAgenda', { static: true }) closeModelAgenda;
  @ViewChild('agendaUpdate', { static: true }) agendaUpdate;
  @ViewChild('confirmBox', { static: true }) confirmBox;
  @ViewChild('closeModal2', { static: true }) closeModal2;

  isOnPremise = false;
  isWebinar = false;
  isAnonymous = false;
  checkError: any;
  submitted = false;

  imageValid = false;
  imageValid2 = false;

  image1button = false;
  image2button = false;

  agendaData: any[] = [];
  counter: any;
  checkErrorAgenda: any;

  // endingDate: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
    private location: Location,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getCategoryDetails();
    this.getSpeakerDetails();
    this.getTagsDetails();
    this.getUserList();
  }
  initializeForm() {
    this.newtoday.setDate(this.newtoday.getDate() - 1);
    this.createEventForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      detail: new FormControl('', [Validators.required, Validators.maxLength(700)]),
      shortDescription: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      address1: [''],
      address2: [''],
      city: [''],
      tagList: [''],
      premise: [''],
      webinarUrl: ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      // locationMapUrl: ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      targetUserType: ['', Validators.required],
      country: [''],
      pincode: ['', [Validators.pattern('^[0-9]{6}$')]],
      totalSeat: [''],
      registrationCloseBeforeSeat: [''],
      // noOfSubUsersAllow: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      speakerList: [''],
      registrationStartDate: ['', Validators.required],
      registrationEndDate: ['', Validators.required],
      policyTnc: ['', [Validators.required, Validators.maxLength(1500)]],
      policyFAQ: ['', [Validators.maxLength(1500)]],
      thumbnailImageUrl: ['', [Validators.required, Validators.pattern('(.*?).(jpg|png|jpeg)$')]],
      detailImageUrl: ['', [Validators.required, Validators.pattern('(.*?).(jpg|png|jpeg)$')]],
      // fullName: [''],
      // name: [''],
      isDraft: [true],
      categoryTypeId: [''],
    });

    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          const val = this.createEventForm.controls[controlName].value;
          if (Object.prototype.toString.call(val) === '[object Date]') {
            // valid date object
            if (isNaN(val.getTime())) {
              // date is not valid
              return true;
            } else {
              // date is valid
              return false;
            }
          } else {
            // not a date type value
            return this.createEventForm.controls[controlName].hasError(errorName);
          }
        }
      } else {
        return this.createEventForm.controls[controlName].hasError(errorName);
      }
    };

    this.checkErrorAgenda = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.addAgenda.controls[controlName].hasError(errorName);
        }
      } else {
        return this.addAgenda.controls[controlName].hasError(errorName);
      }
    };

    this.addTagForm = this.formBuilder.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
    });
    this.addAgenda = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      topic: new FormControl('', [Validators.maxLength(41)]),
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      speakerList: [''],
      isBreak: [''],
      idData: ['-1'],
      id: ['0'],
    });
  }
  getUserList() {
    this.authService.getUserList().subscribe((res) => {
      this.userList = res.body;
      if (this.userList != null) {
        this.userList = this.userList.filter((m) => {
          return m.id !== 9;
        });
      }
    });
  }
  fileProgress(fileInput: any) {
    this.previewUrl = null;
    this.imageValid = false;
    this.fileData = fileInput.target.files[0] as File;
    const img = new Image();
    img.src = window.URL.createObjectURL(this.fileData);
    const fileType = this.fileData.type;
    const fileSize = this.fileData.size;
    if ((fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') && fileSize <= 300000) {
      this.imageValid = true;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = () => {
      setTimeout(() => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        window.URL.revokeObjectURL(img.src);

        if (width === 480 && height === 240) {
          this.imageValid = true;
          this.preview();
        } else {
          this.snackBar.open('Please upload valid image type/size', 'Close', {
            duration: 5000,
          });
          this.imageValid = false;
          this.previewUrl = null;
        }
      }, 50);
    };
  }

  fileProgress2(fileInput: any) {
    this.attachUrl = null;
    this.imageValid2 = false;
    this.fileData = fileInput.target.files[0] as File;
    const img = new Image();
    img.src = window.URL.createObjectURL(this.fileData);
    const fileType = this.fileData.type;
    const fileSize = this.fileData.size;
    if ((fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') && fileSize <= 1000000) {
      this.imageValid2 = true;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = () => {
      setTimeout(() => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        window.URL.revokeObjectURL(img.src);

        if (width === 1080 && height === 580) {
          this.imageValid2 = true;
          this.preview2();
        } else {
          this.snackBar.open('Please upload valid image type/size', 'Close', {
            duration: 5000,
          });
          this.imageValid2 = false;
          this.attachUrl = null;
        }
      }, 50);
    };
  }
  preview() {
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }
  preview2() {
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.attachUrl = reader.result;
    };
  }
  uploadImage() {
    this.show = true;
    this.image1button = false;
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.image1button = false;
    this.authService.uploadFile(formData).subscribe(
      (res) => {
        this.articleImage = res.fileDownloadUri;
        this.show = false;
        this.image1button = true;
        this.imageValid = false;
        this.snackBar.open('Image successfully uploaded', 'Close', {
          duration: 5000,
        });
      },
      (_error) => {
        this.show = false;
        this.snackBar.open('Oops, Something went wrong', 'Close', {
          duration: 5000,
        });
      }
    );
  }
  uploadAttachment() {
    this.image2button = false;
    this.show = true;
    const formData1 = new FormData();
    formData1.append('file', this.fileData);
    this.image2button = false;
    this.authService.uploadFile(formData1).subscribe(
      (res) => {
        this.attachFile = res.fileDownloadUri;
        this.show = false;
        this.image2button = true;
        this.imageValid2 = false;
        this.snackBar.open('Image successfully uploaded', 'Close', {
          duration: 5000,
        });
      },
      (_error) => {
        this.show = false;
        this.snackBar.open('Oops, Something went wrong', 'Close', {
          duration: 5000,
        });
      }
    );
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
    const ON_PREMISE = '1';
    const WEBINAR = '2';
    const BOTH = '3';
    if (this.color === ON_PREMISE) {
      this.isOnPremise = true;
      this.isWebinar = false;
      this.createEventForm.controls['webinarUrl'].setValue(null);
      this.createEventForm.controls['webinarUrl'].setValidators(null);
      this.createEventForm.controls['webinarUrl'].updateValueAndValidity();
      this.setWebinarFieldValidation(null);
      this.setAddressFieldValidation(Validators.required);
    } else if (this.color === WEBINAR) {
      this.isWebinar = true;
      this.isOnPremise = false;
      this.createEventForm.controls['address1'].setValue(null);
      this.createEventForm.controls['address2'].setValue(null);
      this.createEventForm.controls['city'].setValue(null);
      this.createEventForm.controls['country'].setValue(null);
      this.createEventForm.controls['pincode'].setValue(null);
      this.setWebinarFieldValidation(Validators.required);
      this.setAddressFieldValidation(null);
    } else if (this.color === BOTH) {
      this.isWebinar = true;
      this.isOnPremise = true;
      this.setWebinarFieldValidation(Validators.required);
      this.setAddressFieldValidation(Validators.required);
    }

    this.submitted = true;
    // event start time should be equal to agenda min start time
    // event end time should be equal to agenda max end time
    let minAgendaStartTime = null;
    let maxAgendaEndTime = null;
    // tslint:disable-next-line:forin
    for (const index in this.agendaData) {
      const agenda = this.agendaData[index];
      let aStartDate = agenda.startDate;
      let aEndDate = agenda.endDate;

      if (aStartDate && typeof aStartDate === 'string') {
        aStartDate = new Date(aStartDate);
      }

      if (aEndDate && typeof aEndDate === 'string') {
        aEndDate = new Date(aEndDate);
      }

      if (index === '0') {
        minAgendaStartTime = aStartDate;
        maxAgendaEndTime = aEndDate;
      }
      if (minAgendaStartTime > aStartDate) {
        minAgendaStartTime = aStartDate;
      }

      if (maxAgendaEndTime < aEndDate) {
        maxAgendaEndTime = aEndDate;
      }
    }

    if (typeof minAgendaStartTime === 'string') {
      minAgendaStartTime = new Date(minAgendaStartTime);
    }
    if (minAgendaStartTime instanceof Date) {
      minAgendaStartTime.setSeconds(0);
      minAgendaStartTime.setMilliseconds(0);
    }
    if (typeof maxAgendaEndTime === 'string') {
      maxAgendaEndTime = new Date(maxAgendaEndTime);
    }
    if (maxAgendaEndTime instanceof Date) {
      maxAgendaEndTime.setSeconds(0);
      maxAgendaEndTime.setMilliseconds(0);
    }
    let eventStartDate = this.createEventForm.controls['startDate'].value;
    if (typeof eventStartDate === 'string') {
      eventStartDate = new Date(eventStartDate);
    }
    if (eventStartDate instanceof Date) {
      eventStartDate.setSeconds(0);
      eventStartDate.setMilliseconds(0);
      // update event start daate as well to remove seconds and milis before save
      this.createEventForm.controls['startDate'].setValue(eventStartDate);
    }
    let eventEndDate = this.createEventForm.controls['endDate'].value;
    if (typeof eventEndDate === 'string') {
      eventEndDate = new Date(eventEndDate);
    }
    if (eventEndDate instanceof Date) {
      eventEndDate.setSeconds(0);
      eventEndDate.setMilliseconds(0);
      // update event start daate as well to remove seconds and milis before save
      this.createEventForm.controls['endDate'].setValue(eventEndDate);
    }

    if (minAgendaStartTime && eventStartDate && minAgendaStartTime.getTime() !== eventStartDate.getTime()) {
      this.errorMsg1 = 'Please select one of the agenda time equals to event start time';
      this.snackBar.open(this.errorMsg1, 'Close');
      return false;
    } else if (maxAgendaEndTime && eventEndDate && maxAgendaEndTime.getTime() !== eventEndDate.getTime()) {
      this.errorMsg2 = 'Please select one of the agenda time equals to event End time';
      this.snackBar.open(this.errorMsg1, 'Close');
      return false;
    }

    // this.show=true;

    if (!this.image1button) {
      this.snackBar.open('Please Upload Thumbnail Image', 'Close', {
        duration: 5000,
      });
      this.show = false;
      return false;
    }
    if (!this.image2button) {
      this.snackBar.open('Please Upload Banner Image', 'Close', {
        duration: 5000,
      });
      this.show = false;
      return false;
    }
    if (this.agendaData.length === 0) {
      this.snackBar.open('Please fill Event Agenda', 'Close', {
        duration: 5000,
      });
      this.show = false;
      return false;
    }
    if (this.createEventForm.valid) {
      this.show = true;
      // let name: any[] = [];
      // let spekaerName: any[] = [];
      // spekaerName = this.createEventForm.controls['fullName'].value;

      // for (let i = 0; i <= spekaerName.length; i++) {
      //   if (spekaerName != undefined) {
      //     let speakers = {
      //       "fullName": spekaerName[i]
      //     };
      //     name.push(speakers);
      //   }
      //   console.log("check me", spekaerName[i]);
      // }
      // console.log("check me twice", this.createEventForm.value);

      const schedule: any[] = [];
      const scheduling = {
        endDate: this.createEventForm.controls['endDate'].value,
        startDate: this.createEventForm.controls['startDate'].value,
      };
      schedule.push(scheduling);

      const tags: any[] = [];

      if (this.createEventForm.value.tagList.length > 0) {
        this.createEventForm.value.tagList.forEach((m) => {
          const tag = {
            id: m.id,
            keywords: m.keywords,
            name: m.name,
          };
          tags.push(tag);
        });
      }

      let catId;
      catId = this.createEventForm.controls['categoryTypeId'].value;
      if (this.createEventForm.controls['categoryTypeId'].value === '0') {
        catId = null;
      }

      const objData = {
        title: this.createEventForm.controls['title'].value,
        detail: this.createEventForm.controls['detail'].value,
        shortDescription: this.createEventForm.controls['shortDescription'].value,
        address1: this.createEventForm.controls['address1'].value,
        address2: this.createEventForm.controls['address2'].value,
        city: this.createEventForm.controls['city'].value,
        country: this.createEventForm.controls['country'].value,
        pincode: this.createEventForm.controls['pincode'].value,
        // "speakerList": this.createEventForm.controls['speakerList'].value,
        totalSeat: this.createEventForm.controls['totalSeat'].value,
        registrationCloseBeforeSeat: this.createEventForm.controls['registrationCloseBeforeSeat'].value,
        // "noOfSubUsersAllow": this.createEventForm.controls['noOfSubUsersAllow'].value,
        registrationStartDate: this.createEventForm.controls['registrationStartDate'].value,
        registrationEndDate: this.createEventForm.controls['registrationEndDate'].value,
        webinarUrl: this.createEventForm.controls['webinarUrl'].value,
        // "locationMapUrl": this.createEventForm.controls['locationMapUrl'].value,
        policyFAQ: this.createEventForm.controls['policyFAQ'].value,
        policyTnc: this.createEventForm.controls['policyTnc'].value,
        thumbnailImageUrl: this.articleImage,
        detailImageUrl: this.attachFile,
        categoryTypeId: catId,
        tagList: tags,
        // "eventSchedule": schedule,
        eventSchedule: this.agendaData,
        targetUserType: this.createEventForm.controls['targetUserType'].value,
        autoApproveParticipant: false,
        isbreak: false,
        status: false,
        isActive: false,
        isPublish: false,
        isRegOpen: true,
        publishStatus: false,
        id: 0,
        isOnPremise: this.isOnPremise,
        isWebinar: this.isWebinar,
        isEvent: true,
        isDraft: this.createEventForm.controls['isDraft'].value,
        // "isDraft": (this.createEventForm.controls['isDraft'].value || false)
      };

      this.authService.saveEventDetails(objData).subscribe(
        (_response) => {
          this.show = false;
          this.submitted = false;
          this.snackBar.open('Event successfully created', 'Close', {
            duration: 2000,
          });
          this.router.navigate(['events']);
        },
        (_error) => {
          this.show = false;
          this.snackBar.open('Oops, something went wrong..', 'Close');
        }
      );
    } else {
      this.show = false;
      this.snackBar.open('Please fill all mandatory fields', 'Close', {
        duration: 5000,
      });
    }
  }

  createAgenda() {
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
    // this.addAgenda.controls['speakerList'].setValidators(Validators.required);
    // this.addAgenda.controls['speakerList'].updateValueAndValidity();

    if (this.addAgenda.valid) {
      const obj = {
        title: this.addAgenda.controls['title'].value,
        topic: this.addAgenda.controls['topic'].value,
        isBreak: this.addAgenda.controls['isBreak'].value,
        endDate: this.addAgenda.controls['endDate'].value,
        startDate: this.addAgenda.controls['startDate'].value,
        speakerList: this.addAgenda.controls['speakerList'].value,
        id: 0,
        idData: '-1',
      };

      let eventStartDate = this.createEventForm.get(['startDate']).value;
      let eventEndDate = this.createEventForm.get(['endDate']).value;
      let agendaStartDate = obj.startDate;
      let agendaEndDate = obj.endDate;

      if (agendaStartDate && typeof agendaStartDate === 'string') {
        agendaStartDate = new Date(agendaStartDate);
      }

      if (agendaEndDate && typeof agendaEndDate === 'string') {
        agendaEndDate = new Date(agendaEndDate);
      }

      if (eventStartDate && typeof eventStartDate === 'string') {
        eventStartDate = new Date(eventStartDate);
      }

      if (eventEndDate && typeof eventEndDate === 'string') {
        eventEndDate = new Date(eventEndDate);
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
      obj.endDate = agendaEndDate;

      if (obj.startDate.getTime() < eventStartDate.getTime()) {
        this.errorMsg1 = 'Please select one of the agenda time equals to event start time';
        this.snackBar.open(this.errorMsg1, 'Close');
        return false;
      }
      if (obj.endDate.getTime() > eventEndDate.getTime()) {
        this.errorMsg2 = 'Please select one of the agenda time equals to event End time';
        this.snackBar.open(this.errorMsg2, 'Close');
        return false;
      }

      if (this.addAgenda.value['idData'] !== '-1') {
        obj['idData'] = this.addAgenda.value['idData'];
      } else {
        obj['idData'] = '-1';
      }

      this.addAgenda.reset();
      if (obj.idData === '-1') {
        this.agendaData.push(obj);
      } else {
        this.agendaData[obj.idData] = obj;
      }
      this.addAgenda.controls['idData'].setValue('-1');
      this.closeModelAgenda.nativeElement.click();

      // this.addAgenda.controls['speakerList'].setValidators(null);
      // this.addAgenda.controls['speakerList'].updateValueAndValidity();
    } else {
      alert('please fill mandatory');
    }
  }
  clearValidation() {
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
    // this.addAgenda.controls['speakerList'].setValidators(null);
    // this.addAgenda.controls['speakerList'].updateValueAndValidity();
    // this.addAgenda.reset();
  }
  delete(i) {
    this.valuei = i;
    this.confirmBox.nativeElement.click();
    // this.agendaData.splice(i, 1);
  }
  deleteConfirm() {
    this.agendaData.splice(this.valuei, 1);
    this.closeModal2.nativeElement.click();
  }
  // resetForm(){
  //   this.addAgenda.reset();
  // }
  updateAgenda(i) {
    // alert(i);
    this.agendaData[i].idData = i;
    this.addAgenda.setValue(this.agendaData[i]);
    this.agendaUpdate.nativeElement.click();
  }
  createTag() {
    if (this.addTagForm.valid) {
      let flag = true;
      this.tagData.forEach((m) => {
        if (m.name.toUpperCase() === this.addTagForm.get(['name']).value.toUpperCase()) {
          flag = false;
        }
      });
      const obj = this.addTagForm.value;
      if (flag) {
        obj['id'] = 0;
        this.tagData.unshift(obj);
        this.closeModel.nativeElement.click();
      } else {
        alert('Tag Already Exist');
      }
    }
  }
  getTagsDetails() {
    this.authService.getTagsList().subscribe((res) => {
      this.tagData = res.body;
    });
  }
  getCategoryDetails() {
    this.authService.getCategoryList().subscribe((res) => {
      this.allData = res.body;
    });
  }

  getSpeakerDetails() {
    this.authService.getAllSpeakers().subscribe((res) => {
      this.allspeakers = res.body;
    });
  }
  Back() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  maxCDate() {
    let eventStartDate = this.createEventForm.get(['startDate']).value;
    this.closingDate = eventStartDate;
    this.regStartDate = eventStartDate;
    if (eventStartDate && typeof eventStartDate === 'string') {
      eventStartDate = new Date(eventStartDate);
    }
    if (eventStartDate) {
      eventStartDate.setSeconds(0);
      eventStartDate.setMilliseconds(0);
      this.createEventForm.controls['startDate'].setValue(eventStartDate);
    }

    let eventEndDate = this.createEventForm.controls['endDate'].value;
    if (eventEndDate && typeof eventEndDate === 'string') {
      eventEndDate = new Date(eventEndDate);
      // eventEndDate = eventEndDate ? new Date(eventEndDate) : new Date();
    }

    // setting event end date equal to start date as no is allowed to select in end date field
    if (eventEndDate) {
      eventEndDate.setDate(eventStartDate.getDate());
      eventEndDate.setMonth(eventStartDate.getMonth());
      eventEndDate.setFullYear(eventStartDate.getFullYear());
      eventEndDate.setSeconds(0);
      eventEndDate.setMilliseconds(0);
      this.createEventForm.controls['endDate'].setValue(eventEndDate);
    }

    // update all agenda start date if start dates changes
    // tslint:disable-next-line:forin
    for (const index in this.agendaData) {
      const agenda = this.agendaData[index];
      let agenStartDateObj = null;
      let agendaEndDate = null;

      if (agenda.startDate && typeof agenda.startDate === 'string') {
        agenStartDateObj = new Date(agenda.startDate);
      }

      if (agenda.endDate && typeof agenda.endDate === 'string') {
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
    this.endingDate = this.createEventForm.get(['endDate']).value;
  }
  maxRegDate() {
    this.regEndDate = this.createEventForm.get(['registrationStartDate']).value;
  }
  getLocation() {
    alert('inside location');
    this.authService.getLocation().subscribe((_res) => {});
  }
}
