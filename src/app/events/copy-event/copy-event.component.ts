import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-copy-event',
  templateUrl: './copy-event.component.html',
  styleUrls: ['./copy-event.component.css'],
})
export class CopyEventComponent implements OnInit {
  updateEventForm: FormGroup;
  addSpeakerForm: FormGroup;
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
  policyFaqs: string[] = [];
  allPolicyFAQ: any[] = [];
  allPolicyTNC: any[] = [];
  agendaData: any[] = [];
  tagData: any[] = [];
  speaker = new FormControl();
  tag = new FormControl();

  today = new Date();
  closingDate = new Date();
  regStartDate = new Date();
  regEndDate = new Date();
  submitted = false;
  selected: string;
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
  color = '3';
  userList: any[] = [];
  selected4: string[] = [];
  selected6: string[] = [];
  speakerList1: string[] = [];
  checkError: any;
  checkErrorAgenda: any;
  isOnPremise = false;
  isWebinar = false;
  endingDate = new Date();
  newtoday = new Date();

  imageValid = false;
  imageValid2 = false;

  image1button = false;
  image2button = false;
  result1: string;
  result2: string;

  errorMsg1: any;
  errorMsg2: any;

  valuei: any;
  valueData: any;

  // selected1:string ='Cloud Computing';
  @ViewChild('closeModel', { static: true }) closeModel;
  @ViewChild('closeModel1', { static: true }) closeModel1;
  @ViewChild('msgbutton', { static: true }) msgbutton;
  @ViewChild('closeModelAgenda', { static: true }) closeModelAgenda;
  @ViewChild('agendaUpdate', { static: true }) agendaUpdate;
  @ViewChild('confirmBox', { static: true }) confirmBox;
  @ViewChild('closeModal2', { static: true }) closeModal2;
  // @ViewChild('closespeakerModel',{static:true}) closespeakerModel;
  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthServiceService,
    private router1: ActivatedRoute,
    private location: Location
  ) {
    this.updateEventForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      detail: new FormControl('', [Validators.required, Validators.maxLength(700)]),
      shortDescription: new FormControl('', [Validators.required, Validators.maxLength(80)]),
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
      // noOfSubUsersAllow: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      speakerList: [''],
      registrationStartDate: ['', Validators.required],
      registrationEndDate: ['', Validators.required],
      policyTnc: new FormControl('', [Validators.required, Validators.maxLength(1500)]),
      policyFAQ: new FormControl('', [Validators.maxLength(1500)]),
      thumbnailImageUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?).(jpg|png|jpeg)$')]),
      detailImageUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?).(jpg|png|jpeg)$')]),
      fullName: [''],
      name: [''],
      isDraft: [],
      categoryTypeId: ['', Validators.required],
    });
    // this.submitted = true;
    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.updateEventForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.updateEventForm.controls[controlName].hasError(errorName);
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

    this.addTagForm = formBuilder.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
    });
    this.addAgenda = formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      topic: new FormControl('', [Validators.maxLength(41)]),
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      speakerList: [''],
      isBreak: [''],
      idData: ['-1'],
      id: ['0'],
      isActive: [false],
    });
  }
  ngOnInit(): void {
    this.newtoday.setDate(this.newtoday.getDate() - 1);
    this.router1.queryParams.subscribe((params) => {
      this.evntID = params.page;
      this.getEventData(params.page);
    });
    // this.getPolicyFaQDetails();
    // this.getPolicyTnCDetails();
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
  getEventData(id) {
    // this.show = true;

    this.authService.getEventDetail(id).subscribe((res) => {
      this.getEventDetails = res.body.events;

      const url1 = this.getEventDetails.thumbnailImageUrl;
      this.result1 = url1.split('/').pop().split('?')[0].slice(14, url1.length);

      const url2 = this.getEventDetails.detailImageUrl;
      this.result2 = url2.split('/').pop().split('?')[0].slice(14, url2.length);

      if (this.getEventDetails.isOnPremise === true && this.getEventDetails.isWebinar === false) {
        this.color = '1';
      }
      if (this.getEventDetails.isOnPremise === false && this.getEventDetails.isWebinar === true) {
        this.color = '2';
      }
      if (this.getEventDetails.isOnPremise === true && this.getEventDetails.isWebinar === true) {
        this.color = '3';
      }

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
      this.attachFile = this.getEventDetails.detailImageUrl;
      this.updateEventForm.controls['thumbnailImageUrl'].setValidators(null);
      this.updateEventForm.controls['thumbnailImageUrl'].updateValueAndValidity();
      this.previewUrl = this.getEventDetails.thumbnailImageUrl;
      this.articleImage = this.getEventDetails.thumbnailImageUrl;

      // alert(result);

      this.updateEventForm.controls['tagList'].setValidators(null);
      this.updateEventForm.controls['tagList'].updateValueAndValidity();

      // this.updateEventForm.controls['speakerList'].setValidators(null);
      // this.updateEventForm.controls['speakerList'].updateValueAndValidity();

      this.updateEventForm.controls['startDate'].setValidators(null);
      this.updateEventForm.controls['startDate'].updateValueAndValidity();
      this.updateEventForm.controls['startDate'].setValue(this.getEventDetails.eventStartDate);

      this.updateEventForm.controls['endDate'].setValidators(null);
      this.updateEventForm.controls['endDate'].updateValueAndValidity();
      this.updateEventForm.controls['endDate'].setValue(this.getEventDetails.eventEndDate);

      this.updateEventForm.controls['policyFAQ'].setValue(this.getEventDetails.policyFAQ);
      this.updateEventForm.controls['policyTnc'].setValue(this.getEventDetails.policyTnc);
      this.updateEventForm.controls['categoryTypeId'].setValue(this.getEventDetails.categoryTypeId.displayName);
      this.updateEventForm.controls['targetUserType'].setValue(this.getEventDetails.targetUserType.displayName);
      this.updateEventForm.controls['webinarUrl'].setValue(this.getEventDetails.webinarUrl);
      this.updateEventForm.controls['isDraft'].setValue(this.getEventDetails.isDraft);

      this.image1button = true;
      this.image2button = true;

      this.getEventDetails.tags.forEach((m) => {
        // this.endingDate = this.getEventDetails.eventSchedule[0].endDate;
        // this.closingDate = this.getEventDetails.eventSchedule[0].startDate;
        this.valuesSelectedTag.push(m.name);
      });

      if (this.getEventDetails.eventSchedule != null && this.getEventDetails.eventSchedule.length > 0) {
        this.endingDate = this.getEventDetails.eventSchedule[0].endDate;
        this.closingDate = this.getEventDetails.eventSchedule[0].startDate;
        this.getEventDetails.eventSchedule.forEach((m, n) => {
          const obj = {
            title: m.title,
            topic: m.topic,
            isBreak: m.isBreak,
            endDate: m.endDate,
            startDate: m.startDate,
            speakerList: m.speakers,
            isActive: false,
            id: m.id,
            idData: n,
          };
          this.agendaData.push(obj);
        });
      }
      // if(this.getEventDetails.speakers!=null)
      // this.getEventDetails.speakers.forEach(m => {
      //   this.valuesSpeakertags.push(m.fullName);
      // })
      // for (let i = 0; i < this.getEventDetails.tags.length; i++) {
      //   this.selected4.push(this.getEventDetails.tags[i].id);
      // }
      this.getCategoryDetails();
      this.getSpeakerDetails();
      this.getTagsDetails();
      this.getUserList();
      // this.show = false;
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
    if ((fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') && fileSize < 1000000) {
      this.imageValid = true;
      this.result1 = this.fileData.name;
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
    if ((fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') && fileSize < 300000) {
      this.imageValid2 = true;
      this.result2 = this.fileData.name;
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
    this.show = true;
    this.image2button = false;
    const formData1 = new FormData();
    formData1.append('file', this.fileData);
    // this.image2button=false;
    this.authService.uploadFile(formData1).subscribe(
      (res) => {
        this.attachFile = res.fileDownloadUri;
        this.image2button = true;
        this.imageValid2 = false;
        this.show = false;
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
  submitChanges() {
    // this.show=true;
    if(this.agendaData.length === 0){
      this.snackBar.open('Please fill Agenda', 'Close', {
        duration: 5000,
      });
      this.show = false;
      return false;
    }
    if (!this.image1button) {
      this.snackBar.open('Please Upload Thumbnail Image', 'Close', {
        duration: 5000,
      });
      this.show = false;
      return false;
    }
    if (!this.image2button) {
      this.snackBar.open('Please Upload Banner', 'Close', { duration: 5000 });
      this.show = false;
      return false;
    }
    const ON_PREMISE = '1';
    const WEBINAR = '2';
    const BOTH = '3';

    if (this.color === ON_PREMISE) {
      this.isOnPremise = true;
      this.isWebinar = false;
      this.updateEventForm.controls['webinarUrl'].setValue(null);
      this.updateEventForm.controls['webinarUrl'].setValidators(null);
      this.updateEventForm.controls['webinarUrl'].updateValueAndValidity();
      this.setWebinarFieldValidation(null);
      this.setAddressFieldValidation(Validators.required);
    } else if (this.color === WEBINAR) {
      this.isWebinar = true;
      this.isOnPremise = false;
      this.updateEventForm.controls['address1'].setValue(null);
      this.updateEventForm.controls['address2'].setValue(null);
      this.updateEventForm.controls['city'].setValue(null);
      this.updateEventForm.controls['country'].setValue(null);
      this.updateEventForm.controls['pincode'].setValue(null);
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

    let eventStartDate = this.updateEventForm.controls['startDate'].value;
    if (typeof eventStartDate === 'string') {
      eventStartDate = new Date(eventStartDate);
    }

    if (eventStartDate instanceof Date) {
      eventStartDate.setSeconds(0);
      eventStartDate.setMilliseconds(0);
      // update event start daate as well to remove seconds and milis before save
      this.updateEventForm.controls['startDate'].setValue(eventStartDate);
    }

    let eventEndDate = this.updateEventForm.controls['endDate'].value;
    if (typeof eventEndDate === 'string') {
      eventEndDate = new Date(eventEndDate);
    }

    if (eventEndDate instanceof Date) {
      eventEndDate.setSeconds(0);
      eventEndDate.setMilliseconds(0);
      // update event start daate as well to remove seconds and milis before save
      this.updateEventForm.controls['endDate'].setValue(eventEndDate);
    }

    eventStartDate.setSeconds(0);
    eventStartDate.setMilliseconds(0);

    // update event start daate as well to remove seconds and milis before save
    this.updateEventForm.controls['startDate'].setValue(eventStartDate.toISOString());

    eventEndDate.setSeconds(0);
    eventEndDate.setMilliseconds(0);

    // update event start daate as well to remove seconds and milis before save
    this.updateEventForm.controls['endDate'].setValue(eventEndDate.toISOString());

    minAgendaStartTime.setSeconds(0);
    minAgendaStartTime.setMilliseconds(0);

    maxAgendaEndTime.setSeconds(0);
    maxAgendaEndTime.setMilliseconds(0);

    if (minAgendaStartTime && eventStartDate && minAgendaStartTime.getTime() !== eventStartDate.getTime()) {
      this.errorMsg1 = 'Please select one of the agenda time equals to event start time';
      this.snackBar.open(this.errorMsg1, 'Close');
      return false;
    } else if (maxAgendaEndTime && eventEndDate && maxAgendaEndTime.getTime() !== eventEndDate.getTime()) {
      this.errorMsg2 = 'Please select one of the agenda time equals to event End time';
      this.snackBar.open(this.errorMsg1, 'Close');
      return false;
    }

    if (this.updateEventForm.value.tagList.length === 0) {
      this.updateEventForm.controls['tagList'].setValidators(Validators.required);
      this.updateEventForm.controls['tagList'].updateValueAndValidity();
    }
    if (this.updateEventForm.valid) {
      this.show = true;
      const tags: any[] = [];

      this.tagData.forEach((m) => {
        this.updateEventForm.value.tagList.forEach((n) => {
          if (n === m.id) {
            const tag = {
              id: m.id,
              keywords: m.keywords,
              name: m.name,
            };
            tags.push(tag);
          }
        });
      });

      const schedule: any[] = [];
      const scheduling = {
        endDate: this.updateEventForm.controls['endDate'].value,
        startDate: this.updateEventForm.controls['startDate'].value,
      };
      schedule.push(scheduling);
      let catId;

      this.allData.forEach((m) => {
        if (m.displayName === this.updateEventForm.controls['categoryTypeId'].value) {
          catId = m.id;
        }
      });

      let userId;
      this.userList.forEach((m) => {
        if (m.displayName === this.updateEventForm.controls['targetUserType'].value) {
          userId = m.id;
        }
      });

      const obj = {
        title: this.updateEventForm.controls['title'].value,
        detail: this.updateEventForm.controls['detail'].value,
        shortDescription: this.updateEventForm.controls['shortDescription'].value,
        address1: this.updateEventForm.controls['address1'].value,
        address2: this.updateEventForm.controls['address2'].value,
        city: this.updateEventForm.controls['city'].value,
        country: this.updateEventForm.controls['country'].value,
        pincode: this.updateEventForm.controls['pincode'].value,
        totalSeat: this.updateEventForm.controls['totalSeat'].value,
        registrationCloseBeforeSeat: this.updateEventForm.controls['registrationCloseBeforeSeat'].value,
        // "noOfSubUsersAllow": this.updateEventForm.controls['noOfSubUsersAllow'].value,
        registrationStartDate: this.updateEventForm.controls['registrationStartDate'].value,
        registrationEndDate: this.updateEventForm.controls['registrationEndDate'].value,
        // "speakerList":speakerList1,
        policyFAQ: this.updateEventForm.controls['policyFAQ'].value,
        policyTnc: this.updateEventForm.controls['policyTnc'].value,
        thumbnailImageUrl: this.articleImage,
        detailImageUrl: this.attachFile,
        categoryTypeId: catId,
        tagList: tags,
        eventSchedule: this.agendaData,
        autoApproveParticipant: false,
        isbreak: false,
        status: false,
        isDraft: this.updateEventForm.controls['isDraft'].value,
        isPublish: false,
        isRegOpen: false,
        publishStatus: false,
        isActive: false,
        id: 0,
        targetUserType: userId,
        isOnPremise: this.isOnPremise,
        isWebinar: this.isWebinar,
        isEvent: true,
        webinarUrl: this.updateEventForm.controls['webinarUrl'].value,
      };

      this.authService.saveEventDetails(obj).subscribe(
        (response) => {
          this.show = false;
          this.submitted = false;
          this.snackBar.open('Event successfully created', 'Close', {
            duration: 2000,
          });
          this.router.navigate(['/details'], {
            queryParams: { page: response.body.id },
          });
        },
        (error) => {
          this.snackBar.open(error, 'Close');
          this.show = false;
        }
      );
    } else {
      this.show = false;
      this.snackBar.open('Please fill all mandatory fields', 'Close', {
        duration: 5000,
      });
    }
    this.closeModel1.nativeElement.click();
  }
  updateEvent() {
    if (!this.updateEventForm.dirty) {
      this.msgbutton.nativeElement.click();
    } else {
      this.submitChanges();
    }
  }
  getSpeakerDetails() {
    this.authService.getAllSpeakers().subscribe((res) => {
      this.allspeakers = res.body;
      this.speakerList1 = res.body;
    });
  }
  createAgenda() {
    this.addAgenda.controls['title'].setValidators(Validators.required);
    this.addAgenda.controls['title'].updateValueAndValidity();
    this.addAgenda.controls['topic'].setValidators(Validators.required);
    this.addAgenda.controls['topic'].updateValueAndValidity();
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
        isActive: false,
        id: 0,
        idData: '-1',
      };

      let eventStartDate = this.updateEventForm.get(['startDate']).value;
      let eventEndDate = this.updateEventForm.get(['endDate']).value;
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
    } else {
      alert('please fill mandatory');
    }
  }
  delete(i, data) {
    this.valuei = i;
    this.valueData = data;
    this.confirmBox.nativeElement.click();
  }

  deleteConfirm() {
    this.authService.removeEventSchedule(this.valueData.id).subscribe((_res) => {
      this.agendaData.splice(this.valuei, 1);
      this.closeModal2.nativeElement.click();
      this.snackBar.open('Event agenda removed', 'Close', { duration: 3000 });
    });
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
  updateAgenda(i) {
    // this.allspeakers = [];
    //   for(let i=0;i<data.speakerList.length;i++){
    //     this.selected6.push(data.speakerList[i].id);
    //     console.log("speakerlist=",this.selected6);
    //   }
    // this.allspeakers = this.speakerList1;
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

  Back() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  maxCDate() {
    let eventStartDate = this.updateEventForm.get(['startDate']).value;
    this.closingDate = eventStartDate;
    this.regStartDate = eventStartDate;

    if (eventStartDate && typeof eventStartDate === 'string') {
      eventStartDate = new Date(eventStartDate);
    }

    if (eventStartDate) {
      eventStartDate.setSeconds(0);
      eventStartDate.setMilliseconds(0);
      this.updateEventForm.controls['startDate'].setValue(eventStartDate);
    }

    let eventEndDate = this.updateEventForm.controls['endDate'].value;

    if (eventEndDate && typeof eventEndDate === 'string') {
      eventEndDate = new Date(eventEndDate);
    }

    // setting event end date equal to start date as no is allowed to select in end date field
    eventEndDate.setDate(eventStartDate.getDate());
    eventEndDate.setMonth(eventStartDate.getMonth());
    eventEndDate.setFullYear(eventStartDate.getFullYear());
    eventEndDate.setSeconds(0);
    eventEndDate.setMilliseconds(0);

    this.updateEventForm.controls['endDate'].setValue(eventEndDate);

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
    this.endingDate = this.updateEventForm.get(['endDate']).value;
  }
  maxRegDate() {
    this.regEndDate = this.updateEventForm.get(['registrationStartDate']).value;
  }
  getLocation() {
    alert('inside location');
    this.authService.getLocation().subscribe((_res) => {});
  }
}
