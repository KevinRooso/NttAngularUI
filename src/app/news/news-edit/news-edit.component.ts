import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { textValidation } from 'src/app/validators/general-validators';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css'],
})
export class NewsEditComponent implements OnInit {
  speakerImage = '';
  newsData: any;
  submitBtnCaption = 'Publish';
  allData: any;
  selected4: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private service: AuthServiceService,
    private location: Location,
    public snackBar: MatSnackBar
  ) {}
  updateNewsForm: FormGroup;
  addTagForm: FormGroup;
  @ViewChild('closeModel', { static: true }) closeModel;
  // personForm:FormGroup;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  catagoryData: any[] = [];
  tagData: any[] = [];
  checkError: any;
  submitted = false;
  newsId;
  public dateTime1;
  articleImage: any;
  imageValid = false;
  selected3 = '';
  today = new Date();
  userList: any[] = [];
  show = false;
  image1button = false;
  result1: string;
  ngOnInit(): void {
    this.updateNewsForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      topic: new FormControl('', [Validators.required, textValidation(100)]),
      longDescription: new FormControl('', [Validators.required, textValidation(700)]),
      shortDescription: new FormControl('', [Validators.required, textValidation(100)]),
      about: new FormControl('', [Validators.required, textValidation(200)]),
      location: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      targetUserType: ['', Validators.required],
      thumbnailImageUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?).(jpg|png|jpeg)$')]),
      draft: [false],
      expiryDate: ['', Validators.required],
      categoryTypeId: [''],
      tagList: [''],
    });
    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.updateNewsForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.updateNewsForm.controls[controlName].hasError(errorName);
      }
    };
    this.addTagForm = this.formBuilder.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
    });

    this.actRoute.queryParams.subscribe((params) => {
      this.newsId = params.page;
      this.getNewsVideoById(params.page);
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
  getTagsDetails() {
    this.service.getTagsList().subscribe((res) => {
      this.tagData = res.body;
    });
  }
  getCategoryDetails() {
    this.service.getCategoryList().subscribe((res) => {
      this.allData = res.body;
    });
  }
  getNewsVideoById(id) {
    this.service.getNewsById(id).subscribe((res) => {
      this.newsData = res.body;

      for (let i = 0; i < res.body.newsTags.length; i++) {
        this.selected4.push(res.body.newsTags[i].id);
      }

      const url1 = this.newsData.thumbnailImageUrl;
      this.result1 = url1.split('/').pop().split('?')[0].slice(14, url1.length);

      this.setDraftCaption(res.body.draft);

      // this.getDate(res.body.date);
      this.updateNewsForm.get(['title']).setValue(res.body.title);
      this.updateNewsForm.get(['topic']).setValue(res.body.topic);
      this.updateNewsForm.get(['shortDescription']).setValue(res.body.shortDescription);
      this.updateNewsForm.get(['longDescription']).setValue(res.body.longDescription);
      this.updateNewsForm.get(['location']).setValue(res.body.location);
      this.updateNewsForm.get(['about']).setValue(res.body.about);
      this.updateNewsForm.get(['draft']).setValue(res.body.draft);
      if (res.body.categoryTypeId) {
        this.updateNewsForm.get(['categoryTypeId']).setValue(res.body.categoryTypeId.displayName);
      }
      if (res.body.targetUserType != null) {
        this.updateNewsForm.get(['targetUserType']).setValue(res.body.targetUserType.displayName);
      }
      this.updateNewsForm.controls['thumbnailImageUrl'].setValidators(null);
      this.updateNewsForm.controls['thumbnailImageUrl'].updateValueAndValidity();
      this.previewUrl = res.body.thumbnailImageUrl;
      this.articleImage = res.body.thumbnailImageUrl;
      this.today = res.body.expiryDate;
      this.updateNewsForm.controls['expiryDate'].setValue(res.body.expiryDate);
      if (res.body.targetUserType != null) {
        this.selected3 = res.body.targetUserType.id;
      }
      this.image1button = true;

      this.setDraftCaption(res.body.draft);
      this.getCategoryDetails();
      this.getTagsDetails();
      this.getUserList();
    });
  }
  fileProgress(fileInput: any) {
    this.previewUrl = null;
    this.imageValid = false;
    this.fileData = fileInput.target.files[0] as File;
    const img = new Image();
    img.src = window.URL.createObjectURL(this.fileData);
    if (this.fileData !== undefined) {
      this.image1button = false;
      const fileType = this.fileData.type;
      const fileSize = this.fileData.size;
      if ((fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') && fileSize < 300000) {
        this.imageValid = true;
        this.result1 = this.fileData.name;
        // this.preview();
      }
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
          this.snackBar.open('Please upload valid image type/size', 'Close', { duration: 5000 });
          this.imageValid = false;
          this.previewUrl = null;
          this.result1 = null;
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
    this.service.uploadFile(formData).subscribe(
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

  updateNews() {
    this.show = true;
    if (!this.image1button) {
      this.snackBar.open('Please Upload news Image', 'Close', { duration: 5000 });
      this.show = false;
      return false;
    }
    this.submitted = true;

    if (this.updateNewsForm.valid) {
      let userId;
      this.userList.forEach((m) => {
        if (m.displayName === this.updateNewsForm.controls['targetUserType'].value) {
          userId = m.id;
        }
      });

      const tags: any[] = [];
      this.tagData.forEach((m) => {
        this.updateNewsForm.value.tagList.forEach((n) => {
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
      let catId;
      if (this.updateNewsForm.controls['categoryTypeId'].value === '0') {
        catId = null;
      } else {
        this.allData.forEach((m) => {
          if (m.displayName === this.updateNewsForm.controls['categoryTypeId'].value) {
            catId = m.id;
          }
        });
      }

      const objData = {
        categoryTypeId: catId,
        title: this.updateNewsForm.controls['title'].value,
        topic: this.updateNewsForm.controls['topic'].value,
        shortDescription: this.updateNewsForm.controls['shortDescription'].value,
        longDescription: this.updateNewsForm.controls['longDescription'].value,
        location: this.updateNewsForm.controls['location'].value,
        about: this.updateNewsForm.controls['about'].value,
        active: false,
        tagList: tags,
        draft: this.updateNewsForm.controls['draft'].value,
        thumbnailImageUrl: this.articleImage,
        id: this.newsId,
        targetUserType: userId,
        expiryDate: this.updateNewsForm.controls['expiryDate'].value,
      };
      this.service.saveNews(objData).subscribe(
        (_response) => {
          this.show = false;
          this.submitted = false;
          this.snackBar.open('News successfully updated', 'Close', { duration: 2000 });
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
      this.submitBtnCaption = 'Update';
    } else {
      this.submitBtnCaption = 'Publish';
    }
  }
  setDraftCaption(isDraft: boolean) {
    if (isDraft) {
      this.submitBtnCaption = 'Update';
    } else {
      this.submitBtnCaption = 'Publish';
    }
  }
}
