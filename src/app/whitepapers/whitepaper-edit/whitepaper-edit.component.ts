import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { textValidation } from 'src/app/validators/general-validators';

@Component({
  selector: 'app-whitepaper-edit',
  templateUrl: './whitepaper-edit.component.html',
  styleUrls: ['./whitepaper-edit.component.css'],
})
export class WhitepaperEditComponent implements OnInit {
  updateWhitePaperForm: FormGroup;

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  articleImage: any;
  attachUrl: any = null;
  attachFile: any;
  wPaperId: any;
  wPaperData: any;
  addTagForm: FormGroup;
  tagsList: string[] = [];
  articleData: any;
  articleId: any;
  articelImage: any;
  articelAttach: any;
  checkError: any;
  submitted = false;
  userList: any[] = [];
  allData: any[] = [];
  tagData: any[] = [];
  imageValid = false;
  imageValid2 = false;
  selected4: any[] = [];
  valuesSelectedTag: string[] = [];
  selected3 = '';

  today = new Date();
  show = false;
  image1button = false;
  image2button = false;
  result1: string;
  result2: string;
  @ViewChild('closeModel', { static: true }) closeModel;
  submitBtnCaption = 'Publish';

  constructor(
    private frmbuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private authService: AuthServiceService,
    private router1: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {
    this.updateWhitePaperForm = this.frmbuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      longDescription: new FormControl('', [Validators.required, textValidation(700)]),
      shortDescription: new FormControl('', [Validators.required, textValidation(80)]),
      thumbnailImageUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?).(jpg|png|jpeg)$')]),
      downloadUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?).(pdf)$')]),
      draft: [false],
      tagList: [''],
      targetUserType: ['', Validators.required],
      categoryId: [''],
      expiryDate: ['', Validators.required],
    });
    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.updateWhitePaperForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.updateWhitePaperForm.controls[controlName].hasError(errorName);
      }
    };
    this.addTagForm = this.frmbuilder.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.router1.queryParams.subscribe((params) => {
      this.wPaperId = params.page;
      this.getWhitePaperDetails(params.page);
    });
    // this.router1.queryParams.subscribe(params => {
    //   this.articleId = params.page;
    //   this.getArticlesDetails(params.page);
    //   this.getUserList();
    //   this.getCategoryDetails();
    //   this.getTagsDetails();
    // });
  }
  getTagsDetails() {
    this.authService.getTagsList().subscribe((res) => {
      this.tagData = res.body;
    });
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
  getCategoryDetails() {
    this.authService.getCategoryList().subscribe((res) => {
      this.allData = res.body;
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
      }, 2000);
    };
  }
  fileProgress2(fileInput: any) {
    this.image2button = false;
    this.attachUrl = null;
    this.imageValid2 = false;
    this.fileData = fileInput.target.files[0] as File;
    const img = new Image();
    img.src = window.URL.createObjectURL(this.fileData);
    if (this.fileData !== undefined) {
      this.image2button = false;
      const fileType = this.fileData.type;
      if (fileType === 'application/pdf') {
        this.imageValid2 = true;
        this.result2 = this.fileData.name;
        // this.preview2();
      } else {
        this.snackBar.open('Please upload PDF attachment only', 'Close', { duration: 5000 });
      }
    }
    //     const reader = new FileReader();
    // reader.readAsDataURL(this.fileData);
    // reader.onload = () => {
    //   setTimeout(() => {
    //     const width = img.naturalWidth;
    //     const height = img.naturalHeight;

    //     window.URL.revokeObjectURL(img.src);

    //     if (width >= 720 && width <= 1080 && height >= 360 && height <= 580) {
    //       this.imageValid2 = true;
    //       this.preview2();
    //     } else {
    //       this.snackBar.open('Please upload valid image type/size', 'Close', { duration: 5000 });
    //       this.imageValid2 = false;
    //       this.attachUrl = null;
    //       this.result2 = null;
    //     }
    //   }, 2000);
    // };
  }
  preview() {
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) === null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }
  preview2() {
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
    this.authService.uploadFile(formData).subscribe(
      (res) => {
        this.articleImage = res.fileDownloadUri;
        this.show = false;
        this.image1button = true;
        this.imageValid = false;
        this.snackBar.open('Image successfully uploaded', 'Close', { duration: 5000 });
      },
      () => {
        this.show = false;
        this.snackBar.open('Oops, Something went wrong', 'Close', { duration: 5000 });
      }
    );
  }
  uploadAttachment() {
    this.show = true;
    this.image2button = false;
    const formData1 = new FormData();
    formData1.append('file', this.fileData);
    this.authService.uploadFile(formData1).subscribe(
      (res) => {
        this.attachFile = res.fileDownloadUri;
        this.image2button = true;
        this.imageValid2 = false;
        this.show = false;
        this.snackBar.open('Attachment successfully uploaded', 'Close', { duration: 5000 });
      },
      () => {
        this.show = false;
        this.snackBar.open('Oops, Something went wrong', 'Close', { duration: 5000 });
      }
    );
  }

  getWhitePaperDetails(id) {
    this.authService.getResourceById(id).subscribe((res) => {
      this.wPaperData = res.body;

      const url1 = this.wPaperData.thumbnailImageUrl;
      this.result1 = url1.split('/').pop().split('?')[0].slice(14, url1.length);

      const url2 = this.wPaperData.resourceLink;
      this.result2 = url2.split('/').pop().split('?')[0].slice(14, url2.length);

      this.setDraftCaption(res.body.isDraft);

      // this.selected3=res.body.person.id;
      for (let i = 0; i < res.body.resourceTags.length; i++) {
        this.selected4.push(res.body.resourceTags[i].id);
      }

      this.updateWhitePaperForm.controls['title'].setValue(this.wPaperData.title);
      this.updateWhitePaperForm.controls['longDescription'].setValue(this.wPaperData.longDescription);
      this.updateWhitePaperForm.controls['shortDescription'].setValue(this.wPaperData.shortDescription);
      if (this.wPaperData.category !== null) {
        this.updateWhitePaperForm.controls['categoryId'].setValue(this.wPaperData.category.displayName);
      }
      if (this.wPaperData.resourceTags.length > 0) {
        this.updateWhitePaperForm.controls['tagList'].setValue(this.wPaperData.resourceTags.name);
      }
      this.updateWhitePaperForm.controls['draft'].setValue(this.wPaperData.isDraft);
      this.selected4 = [];
      for (let i = 0; i < res.body.resourceTags.length; i++) {
        this.selected4.push(res.body.resourceTags[i].id);
      }
      this.updateWhitePaperForm.controls['thumbnailImageUrl'].setValidators(null);
      this.updateWhitePaperForm.controls['thumbnailImageUrl'].updateValueAndValidity();
      this.previewUrl = this.wPaperData.thumbnailImageUrl;
      this.articleImage = this.wPaperData.thumbnailImageUrl;
      this.updateWhitePaperForm.controls['downloadUrl'].setValidators(null);
      this.updateWhitePaperForm.controls['downloadUrl'].updateValueAndValidity();
      this.attachFile = this.wPaperData.resourceLink;

      this.updateWhitePaperForm.controls['targetUserType'].setValidators(null);
      this.updateWhitePaperForm.controls['targetUserType'].updateValueAndValidity();
      this.updateWhitePaperForm.controls['targetUserType'].setValue(this.wPaperData.targetUserType.id);

      this.updateWhitePaperForm.controls['tagList'].setValidators(null);
      this.updateWhitePaperForm.controls['tagList'].updateValueAndValidity();
      this.today = res.body.expiryDate;
      this.updateWhitePaperForm.controls['expiryDate'].setValue(res.body.expiryDate);
      this.image1button = true;
      this.image2button = true;
      this.getUserList();
      this.getCategoryDetails();
      this.getTagsDetails();
    });
  }
  updateWhitepaper() {
    this.show = true;
    if (!this.image1button) {
      this.snackBar.open('Please Upload Article Image', 'Close', { duration: 5000 });
      this.show = false;
      return false;
    }
    if (!this.image2button) {
      this.snackBar.open('Please Upload Attachment', 'Close', { duration: 5000 });
      this.show = false;
      return false;
    }
    this.submitted = true;
    if (this.updateWhitePaperForm.value.tagList.length === 0) {
      this.updateWhitePaperForm.controls['tagList'].setValidators(null);
      this.updateWhitePaperForm.controls['tagList'].updateValueAndValidity();
    }
    if (this.updateWhitePaperForm.valid) {
      const tags: any[] = [];
      const obj1 = this.updateWhitePaperForm.value;
      this.tagData.forEach((m) => {
        obj1.tagList.forEach((n) => {
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
      if (this.updateWhitePaperForm.controls['categoryId'].value === '0') {
        catId = null;
      } else {
        this.allData.forEach((m) => {
          if (m.displayName === this.updateWhitePaperForm.controls['categoryId'].value) {
            catId = m.id;
          }
        });
      }

      // let userId;
      // this.userList.forEach(m=>{
      //   if(m.displayName===this.EditArticleForm.controls['targetUserType'].value)
      //     userId=m.id;
      // });

      const obj = {
        categoryId: catId,
        customerProfile: 'string',
        detailImageUrl: 'string',
        downloadUrl: this.attachFile,
        id: this.wPaperId,
        draft: this.updateWhitePaperForm.controls['draft'].value,
        longDescription: this.updateWhitePaperForm.controls['longDescription'].value,
        person: {},
        resourceType: 5,
        serviceUsed: 'string',
        shortDescription: this.updateWhitePaperForm.controls['shortDescription'].value,
        tagList: tags,
        thumbnailImageUrl: this.articleImage,
        title: this.updateWhitePaperForm.controls['title'].value,
        targetUserType: this.updateWhitePaperForm.controls['targetUserType'].value,
        expiryDate: this.updateWhitePaperForm.controls['expiryDate'].value,
      };

      this.authService.saveResource(obj).subscribe(
        () => {
          this.show = false;
          this.submitted = false;
          this.snackBar.open('Whitepaper successfully updated', 'Close', { duration: 5000 });
          this.router.navigate(['whitepapers']);
        },
        () => {
          this.show = false;
          this.snackBar.open('Oops, Something went wrong', 'Close', { duration: 5000 });
        }
      );
    } else {
      this.show = false;
      this.snackBar.open('Please fill all mandatory fields', 'Close', { duration: 5000 });
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
    this.location.back(); // <-- go back to previous location on cancel
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
