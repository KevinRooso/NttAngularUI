import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { textValidation } from 'src/app/validators/general-validators';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css'],
})
export class CreateNewsComponent implements OnInit {
  createNewsForm: FormGroup;
  addTagForm: FormGroup;
  speakerImage = '';
  articleImage: any;
  checkError: any;
  submitted = false;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  catagoryData: any[] = [];
  tagData: any[] = [];
  userList: any[] = [];
  imageValid = false;
  show = false;
  image1button = false;

  today = new Date();
  submitBtnCaption = 'Submit';
  allData: any;
  @ViewChild('closeModel', { static: true }) closeModel;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private authService: AuthServiceService,
    public snackBar: MatSnackBar
  ) {}
  // createNewsForm: FormGroup;

  ngOnInit(): void {
    this.createNewsForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      topic: new FormControl('', [Validators.required, textValidation(100)]),
      longDescription: new FormControl('', [Validators.required, textValidation(700)]),
      shortDescription: new FormControl('', [Validators.required, textValidation(100)]),
      about: new FormControl('', [Validators.required, textValidation(200)]),
      location: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      targetUserType: ['', Validators.required],
      thumbnailImageUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?).(jpg|png|jpeg)$')]),
      draft: [true],
      expiryDate: ['', Validators.required],
      categoryTypeId: [''],
      tagList: [''],
    });

    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.createNewsForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.createNewsForm.controls[controlName].hasError(errorName);
      }
    };
    this.addTagForm = this.formBuilder.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
    });
    this.getUserList();
    this.getCategoryDetails();
    this.getTagsDetails();
  }

  // fileProgress(fileInput: any) {
  //   this.fileData = <File>fileInput.target.files[0];
  //   this.preview();
  // }
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

  uploadImage() {
    this.image1button = false;
    this.show = true;
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.authService.uploadFile(formData).subscribe(
      (res) => {
        this.articleImage = res.fileDownloadUri;
        this.show = false;
        this.image1button = true;
        this.imageValid = false;
        this.snackBar.open('Image successfully uploaded', 'Close', { duration: 5000 });
      },
      (_error) => {
        this.show = false;
        this.snackBar.open('Oops, Something went wrong', 'Close', { duration: 5000 });
      }
    );
  }
  getUserList() {
    this.authService.getUserList().subscribe((res) => {
      this.userList = res.body;
      if (this.userList !== null) {
        this.userList = this.userList.filter((m) => {
          return m.id !== 9;
        });
      }
    });
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
  generateNews() {
    this.show = true;
    this.submitted = true;
    if (!this.image1button) {
      this.snackBar.open('Please Upload news Image', 'Close', { duration: 5000 });
      this.show = false;
      return false;
    }
    this.submitted = true;
    if (this.createNewsForm.valid) {
      const tags: any[] = [];
      this.createNewsForm.value.tagList.forEach((m) => {
        const tag = {
          id: m.id,
          keywords: m.keywords,
          name: m.name,
        };
        tags.push(tag);
      });

      const objData = {
        categoryTypeId: this.createNewsForm.controls['categoryTypeId'].value,
        title: this.createNewsForm.controls['title'].value,
        topic: this.createNewsForm.controls['topic'].value,
        shortDescription: this.createNewsForm.controls['shortDescription'].value,
        longDescription: this.createNewsForm.controls['longDescription'].value,
        location: this.createNewsForm.controls['location'].value,
        about: this.createNewsForm.controls['about'].value,
        active: false,
        tagList: tags,
        targetUserType: this.createNewsForm.controls['targetUserType'].value,
        draft: this.createNewsForm.controls['draft'].value,
        thumbnailImageUrl: this.articleImage,
        id: 0,
        expiryDate: this.createNewsForm.controls['expiryDate'].value,
      };
      this.authService.saveNews(objData).subscribe(
        (_response) => {
          this.show = false;
          this.submitted = false;
          this.snackBar.open('News successfully created', 'Close', { duration: 2000 });
          this.router.navigate(['news']);
        },
        (_error) => {
          this.show = false;
          this.snackBar.open('Oops Something went wrong...', 'Close');
        }
      );
    } else {
      this.show = false;
      this.snackBar.open('Please fill all mandatory field', 'Close', { duration: 5000 });
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
        alert('Tag Already Exist');
      }
    }
  }
  BackMe() {
    this.location.back();
  }
  OnDraft(e) {
    if (e.checked === true) {
      this.submitBtnCaption = 'Submit';
    } else {
      this.submitBtnCaption = 'Publish';
    }
  }
}
