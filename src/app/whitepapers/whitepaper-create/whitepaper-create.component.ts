import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { textValidation } from 'src/app/validators/general-validators';

@Component({
  selector: 'app-whitepaper-create',
  templateUrl: './whitepaper-create.component.html',
  styleUrls: ['./whitepaper-create.component.css'],
})
export class WhitepaperCreateComponent implements OnInit {
  createWhitePaperForm: FormGroup;

  // createArticleForm: FormGroup;
  addTagForm: FormGroup;
  tagsList: string[] = [];

  fileData: File = null;
  fileData2: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  articleImage: any;
  attachUrl: any = null;
  attachFile: any;
  checkError: any;
  submitted = false;
  imageValid = false;
  imageValid2 = false;
  userList: any[] = [];
  allData: any[] = [];
  tagData: any[] = [];
  show = false;

  image1button = false;
  image2button = false;
  today = new Date();

  @ViewChild('closeModel', { static: true }) closeModel;
  submitBtnCaption = 'Submit';
  constructor(
    private frmbuilder: FormBuilder,
    private authService: AuthServiceService,
    private location: Location,
    public snackBar: MatSnackBar,
    private router: Router
  ) {
    this.createWhitePaperForm = this.frmbuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      longDescription: new FormControl('', [Validators.required, textValidation(700)]),
      shortDescription: new FormControl('', [Validators.required, textValidation(80)]),
      thumbnailImageUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?).(jpg|png|jpeg)$')]),
      downloadUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?).(pdf)$')]),
      draft: [true],
      tagList: [''],
      targetUserType: ['', Validators.required],
      categoryId: [''],
      expiryDate: ['', Validators.required],
    });

    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.createWhitePaperForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.createWhitePaperForm.controls[controlName].hasError(errorName);
      }
    };
    this.addTagForm = this.frmbuilder.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getUserList();
    this.getCategoryDetails();
    this.getTagsDetails();
  }
  getTagsDetails() {
    this.authService.getTagsList().subscribe((res) => {
      this.tagData = res.body;
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
      if (this.userList !== null) {
        this.userList = this.userList.filter((m) => {
          return m.id !== 10;
        });
      }
    });
  }
  getCategoryDetails() {
    this.authService.getCategoryListByGroup('Resources').subscribe((res) => {
      this.allData = res.body;
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
    // Show preview
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
        this.snackBar.open('Image successfully uploaded', 'Close', { duration: 5000 });
      },
      () => {
        this.show = false;
        this.snackBar.open('Oops, Something went wrong', 'Close', { duration: 5000 });
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
        this.snackBar.open('Attachment successfully uploaded', 'Close', { duration: 5000 });
      },
      () => {
        this.show = false;
        this.snackBar.open('Oops, Something went wrong', 'Close', { duration: 5000 });
      }
    );
  }

  createArticle() {
    this.show = true;
    if (!this.image1button) {
      this.snackBar.open('Please Upload Image', 'Close', { duration: 5000 });
      this.show = false;
      return false;
    }
    if (!this.image2button) {
      this.snackBar.open('Please Upload Attachment', 'Close', { duration: 5000 });
      this.show = false;
      return false;
    }
    this.submitted = true;
    if (this.createWhitePaperForm.valid) {
      const tags: any[] = [];

      if (this.createWhitePaperForm.value.tagList.length > 0) {
        this.createWhitePaperForm.value.tagList.forEach((m) => {
          const tag = {
            id: m.id,
            keywords: m.keywords,
            name: m.name,
          };
          tags.push(tag);
        });
      }

      let catId;
      catId = this.createWhitePaperForm.controls['categoryId'].value;
      if (this.createWhitePaperForm.controls['categoryId'].value === '0') {
        catId = null;
      }
      const obj = {
        categoryId: catId,
        customerProfile: 'string',
        detailImageUrl: 'string',
        downloadUrl: this.attachFile,
        draft: this.createWhitePaperForm.controls['draft'].value,
        longDescription: this.createWhitePaperForm.controls['longDescription'].value,
        personId: null,
        resourceType: 5,
        serviceUsed: 'string',
        shortDescription: this.createWhitePaperForm.controls['shortDescription'].value,
        tagList: tags,
        thumbnailImageUrl: this.articleImage,
        title: this.createWhitePaperForm.controls['title'].value,
        targetUserType: this.createWhitePaperForm.controls['targetUserType'].value,
        approverId: 0,
        expiryDate: this.createWhitePaperForm.controls['expiryDate'].value,
      };

      this.authService.saveResource(obj).subscribe(
        () => {
          this.show = false;
          this.snackBar.open('Whitepaper successfully created', 'Close', { duration: 2000 });
          this.router.navigate(['/resources/whitepapers']);
        },
        () => {
          this.show = false;
          this.snackBar.open('Oops, something went wrong..', 'Close');
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
      this.submitBtnCaption = 'Submit';
    } else {
      this.submitBtnCaption = 'Publish';
    }
  }
}
