import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-testimonials',
  templateUrl: './create-testimonials.component.html',
  styleUrls: ['./create-testimonials.component.css'],
})
export class CreateTestimonialsComponent implements OnInit {
  speakerImage = '';
  buttonText: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: AuthServiceService,
    private location: Location,
    private snackBar: MatSnackBar,
    private router1: ActivatedRoute
  ) {}
  createVideoForm: FormGroup;
  // personForm:FormGroup;
  fileData: File = null;
  previewUrl: any = null;
  previewUrl1: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  catagoryData: any[] = [];
  tagData: any[] = [];
  logo = '';

  addTagForm: FormGroup;
  checkError: any;
  submitted = false;
  imageValid = false;
  checkErrorPerson: any;
  submittedPerson = false;
  imageValidPerson = false;
  imageValid1 = false;
  userList: any[] = [];
  resourceId;
  testemonials: any[] = [];
  tarUserType = '';
  title = '';

  today = new Date();

  show = false;
  image1button = false;
  image2button = false;
  ngOnInit(): void {
    this.createVideoForm = this.formBuilder.group({
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      longDescription: ['', Validators.required],
      targetUserType: ['', Validators.required],
      isDraft: [false],
      detailImageUrl: ['', [Validators.required, Validators.pattern('(.*?).(jpg|png|jpeg)$')]],
      thumbnailImageUrl: ['', [Validators.required, Validators.pattern('(.*?).(jpg|png|jpeg)$')]],
      expiryDate: ['', Validators.required],
    });
    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.createVideoForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.createVideoForm.controls[controlName].hasError(errorName);
      }
    };
    this.router1.queryParams.subscribe((params) => {
      this.resourceId = params.page;
      if (this.resourceId !== undefined) {
        this.getResourceData();
        this.title = 'Edit Testimonial';
        this.buttonText = 'Update Details';
      } else {
        this.title = 'Create Testimonial';
        this.buttonText = 'Submit Details';
        this.getUserList();
      }
    });
  }
  getResourceData() {
    this.service.getResourceById(this.resourceId).subscribe((res) => {
      this.testemonials = res.body;
      this.createVideoForm.controls['targetUserType'].setValidators(null);
      this.createVideoForm.controls['targetUserType'].updateValueAndValidity();

      // this.createVideoForm.controls['person'].setValidators(null);
      // this.createVideoForm.controls['person'].updateValueAndValidity();

      this.createVideoForm.controls['detailImageUrl'].setValidators(null);
      this.createVideoForm.controls['detailImageUrl'].updateValueAndValidity();
      this.createVideoForm.controls['detailImageUrl'].setValidators([Validators.pattern('(.*?).(jpg|png|jpeg)$')]);
      this.createVideoForm.controls['detailImageUrl'].updateValueAndValidity();

      this.createVideoForm.controls['thumbnailImageUrl'].setValidators(null);
      this.createVideoForm.controls['thumbnailImageUrl'].updateValueAndValidity();
      this.createVideoForm.controls['thumbnailImageUrl'].setValidators([Validators.pattern('(.*?).(jpg|png|jpeg)$')]);
      this.createVideoForm.controls['thumbnailImageUrl'].updateValueAndValidity();
      if (res.body.targetUserType != null) {
        this.tarUserType = res.body.targetUserType.id;
      }

      this.speakerImage = res.body.detailImageUrl;
      this.logo = res.body.thumbnailImageUrl;
      this.createVideoForm.get(['title']).setValue(res.body.title);
      this.createVideoForm.get(['longDescription']).setValue(res.body.longDescription);
      this.createVideoForm.get(['shortDescription']).setValue(res.body.shortDescription);
      this.createVideoForm.get(['isDraft']).setValue(res.body.isDraft);
      this.today = res.body.expiryDate;
      this.createVideoForm.controls['expiryDate'].setValue(res.body.expiryDate);
      this.previewUrl1 = res.body.detailImageUrl;
      this.image1button = true;
      this.image2button = true;
      this.previewUrl = res.body.thumbnailImageUrl;
      this.getUserList();
    });
  }
  getUserList() {
    this.service.getUserList().subscribe((res) => {
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

    if (this.fileData !== undefined) {
      this.image1button = false;
      const fileType = this.fileData.type;
      if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') {
        this.imageValid = true;
        this.preview();
      }
    }
  }
  preview() {
    // Show preview
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

  uploadImage() {
    this.show = true;
    const formData = new FormData();
    this.image1button = false;
    formData.append('file', this.fileData);
    this.service.uploadFile(formData).subscribe(
      (res) => {
        // alert("Image Uploaded Successfully");
        this.logo = res.fileDownloadUri;
        this.imageValid = false;
        this.image1button = true;
        this.show = false;
        this.snackBar.open('Image successfully uploaded', 'Close', { duration: 5000 });
      },
      (error) => {
        this.show = false;
        this.snackBar.open('Oops, Something went wrong', 'Close', { duration: 5000 });
      }
    );
  }

  fileProgress1(fileInput: any) {
    this.image2button = false;
    this.previewUrl1 = null;
    this.imageValid1 = false;
    this.fileData = fileInput.target.files[0] as File;
    if (this.fileData !== undefined) {
      this.image2button = false;
      const fileType = this.fileData.type;
      if (fileType === 'image/jpeg' || fileType === 'image/png') {
        this.imageValid1 = true;
        this.preview1();
      }
    }
  }
  // fileProgress1(fileInput: any) {

  //   this.image2button=false;
  //   this.previewUrl1=null;
  //   this.imageValid1 = false;
  //   this.fileData = <File>fileInput.target.files[0];
  //   if(this.fileData!=undefined){
  //     this.image2button=false;
  //   let fileType = this.fileData.type;
  //   if (fileType == 'application/pdf') {
  //     this.imageValid1 = true;
  //     this.preview1();
  //   }
  // }
  // }
  preview1() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl1 = reader.result;
    };
  }
  uploadImage1() {
    this.show = true;
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.service.uploadFile(formData).subscribe(
      (res) => {
        this.speakerImage = res.fileDownloadUri;
        this.imageValid1 = false;
        this.image2button = true;
        this.show = false;
        this.snackBar.open('Image successfully uploaded', 'Close', { duration: 5000 });
      },
      (error) => {
        this.show = false;
        this.snackBar.open('Oops, Something went wrong', 'Close', { duration: 5000 });
      }
    );
  }
  // uploadImage1() {
  //   this.show=true;
  //   this.image2button=false;
  //   const formData1 = new FormData();
  //   formData1.append('file', this.fileData);
  //   this.service.uploadFile(formData1)
  //     .subscribe((res) => {
  //       console.log("Image", res);
  //       this.speakerImage = res.fileDownloadUri;
  //       this.imageValid1 = false;
  //       this.image2button=true;
  //       this.snackBar.open('Image successfully uploaded', 'Close', { duration: 5000 });
  //     },
  //     (error)=>{
  //       this.show=false;
  //       this.snackBar.open('Oops, Something went wrong', 'Close', { duration: 5000 });
  //     })
  // }

  generateBlog() {
    let id;

    if (this.resourceId !== undefined) {
      id = this.resourceId;
    } else {
      id = 0;
    }
    if (!this.image1button) {
      this.snackBar.open('Please Upload Logo', 'Close', { duration: 5000 });
      this.show = false;
      return false;
    }
    if (!this.image2button) {
      this.snackBar.open('Please Upload Publisher Image ', 'Close', { duration: 5000 });
      this.show = false;
      return false;
    }
    this.submitted = true;
    if (this.createVideoForm.valid) {
      this.show = true;
      const obj = this.createVideoForm.value;
      const dataObj = {
        thumbnailImageUrl: this.logo,
        draft: obj.isDraft,
        longDescription: obj.longDescription,
        person: {},
        resourceType: 4,
        shortDescription: obj.shortDescription,
        tagList: [],
        detailImageUrl: this.speakerImage,
        title: obj.title,
        targetUserType: obj.targetUserType,
        categoryId: 15,
        id,
        expiryDate: this.createVideoForm.controls['expiryDate'].value,
      };

      this.service.saveResource(dataObj).subscribe((res) => {
        // alert("Testimonials Added Successfully");
        if (this.resourceId !== undefined) {
          this.snackBar.open('Testimonials Updated Successfully', 'Close', { duration: 5000 });
        } else {
          this.snackBar.open('Testimonials Added Successfully', 'Close', { duration: 5000 });
        }
        this.show = false;
        this.router.navigate(['testimonials']);
      });
    } else {
      this.show = false;
      this.snackBar.open('Please fill all mandatory fields', 'Close', { duration: 5000 });
    }
  }
  BackMe() {
    this.location.back();
  }
}
