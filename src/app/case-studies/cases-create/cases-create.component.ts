import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { textValidation } from 'src/app/validators/general-validators';

@Component({
  selector: 'app-cases-create',
  templateUrl: './cases-create.component.html',
  styleUrls: ['./cases-create.component.css'],
})
export class CasesCreateComponent implements OnInit {
  createCases: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  addTagForm: FormGroup;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: any[] = [];
  tagData: any[] = [];
  fileData: File = null;
  fileData2: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  speakerImage = '';
  catagoryData: any[] = [];
  attachUrl: any = null;
  articleImage: any;

  checkError: any;
  submitted = false;
  imageValid = false;
  imageValid2 = false;
  checkErrorPerson: any;
  submittedPerson = false;
  imageValidPerson = false;
  previewUrl1: any = null;
  imageValid1 = false;
  userList: any[] = [];
  show = false;
  image1button = false;
  image2button = false;
  attachFile: any;

  today = new Date();

  @ViewChild('closeModel', { static: true }) closeModel;
  submitBtnCaption = 'Submit';
  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthServiceService,
    private location: Location,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // this.createSpeaker();

    this.createCases = this.formbuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      longDescription: new FormControl('', [Validators.required, textValidation(700)]),
      categoryId: ['', Validators.required],
      tagList: ['', Validators.required],
      serviceUsed: new FormControl('', [Validators.required, textValidation(500)]),
      targetUserType: ['', Validators.required],
      expiryDate: ['', Validators.required],
      thumbnailImageUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?).(jpg|png|jpeg)$')]),
      downloadUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?).(pdf)$')]),
      draft: [true],
    });
    this.addTagForm = this.formbuilder.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
    });
    this.getCategoryDetails();
    this.getTagsDetails();
    this.getUserList();
    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.createCases.controls[controlName].hasError(errorName);
        }
      } else {
        return this.createCases.controls[controlName].hasError(errorName);
      }
    };
  }
  getUserList() {
    this.authService.getUserList().subscribe((res) => {
      this.userList = res.body;
      if (this.userList != null) {
        this.userList = this.userList.filter((m) => {
          return m.id !== 9;
        });
      }
      if (this.userList !== null) {
        this.userList = this.userList.filter((m) => {
          return m.id !== 10;
        });
      }
    });
  }
  getCategoryDetails() {
    this.authService.getCategoryListByGroup('Resources').subscribe((res) => {
      this.catagoryData = res.body;
    });
  }
  getTagsDetails() {
    this.authService.getTagsList().subscribe((res) => {
      this.tagData = res.body;
      this.tagData = this.tagData.reverse();
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
    if ((fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') && fileSize < 300000) {
      this.imageValid = true;
      // this.preview();
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
    this.fileData2 = fileInput.target.files[0] as File;
    const fileType = this.fileData2.type;
    if (fileType === 'application/pdf') {
      this.imageValid2 = true;
      this.preview2();
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
  preview2() {
    // Show preview

    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData2);
    reader.onload = (_event) => {
      this.attachUrl = reader.result;
    };
  }
  uploadImage() {
    this.show = true;
    this.image1button = false;
    const formData = new FormData();
    formData.append('file', this.fileData);
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
    formData1.append('file', this.fileData2);
    this.authService.uploadFile(formData1).subscribe(
      (res) => {
        this.attachFile = res.fileDownloadUri;

        this.show = false;
        this.image2button = true;
        this.imageValid2 = false;
        this.snackBar.open('Attachment successfully uploaded', 'Close', {
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

  createCase() {
    this.show = true;
    if (!this.image1button) {
      this.snackBar.open('Please Upload Image', 'Close', { duration: 5000 });
      this.show = false;
      return false;
    }
    if (!this.image2button) {
      this.snackBar.open('Please Upload Attachment', 'Close', {
        duration: 5000,
      });
      this.show = false;
      return false;
    }
    this.submitted = true;
    if (this.createCases.valid) {
      const obj = this.createCases.value;
      const tags: any[] = [];
      obj.tagList.forEach((m) => {
        const tag = {
          id: m.id,
          keywords: m.keywords,
          name: m.name,
        };
        tags.push(tag);
      });

      const dataObj = {
        customerProfile: 'string',
        detailImageUrl: 'string',
        approverId: 0,
        draft: obj.draft,
        categoryId: obj.categoryId.id,
        longDescription: obj.longDescription,
        personId: null,
        resourceType: 3,
        serviceUsed: obj.serviceUsed,
        tagList: tags,
        targetUserType: obj.targetUserType,
        thumbnailImageUrl: this.articleImage,
        downloadUrl: this.attachFile,
        title: obj.title,
        expiryDate: this.createCases.controls['expiryDate'].value,
      };

      this.authService.saveResource(dataObj).subscribe(
        (_res) => {
          this.show = false;
          this.snackBar.open('Case Study Added Successfully', 'Close', {
            duration: 5000,
          });
          // alert("Blog Added Successfully");
          this.router.navigate(['/resources/cases']);
        },
        (_error) => {
          this.show = false;
          this.snackBar.open('Oops, something went wrong..', 'Close');
        }
      );
    } else {
      this.show = false;
      this.snackBar.open('Please fill all mandatory field', 'Close', {
        duration: 5000,
      });
    }
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
        this.snackBar.open('Tag Already Exist', 'Close', { duration: 5000 });
      }
      // alert("Tag Already EXist");
    }
  }
  BackMe() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  OnDraft(e) {
    if (e.checked === true) {
      this.submitBtnCaption = 'Submit';
    } else {
      this.submitBtnCaption = 'Publish';
    }
  }
}
