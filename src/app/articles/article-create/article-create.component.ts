import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css'],
})
export class ArticleCreateComponent implements OnInit {
  createArticleForm: FormGroup;
  addTagForm: FormGroup;
  tagsList: string[] = [];

  fileData: File = null;
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

  today = new Date();
  show = false;
  image1button = false;
  image2button = false;
  @ViewChild('closeModel', { static: true }) closeModel;
  constructor(
    frmbuilder: FormBuilder,
    private authService: AuthServiceService,
    private location: Location,
    public snackBar: MatSnackBar,
    private router: Router
  ) {
    this.createArticleForm = frmbuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      longDescription: new FormControl('', [Validators.required, Validators.maxLength(8000)]),
      shortDescription: new FormControl('', [Validators.required, Validators.maxLength(3000)]),
      thumbnailImageUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?).(jpg|png|jpeg)$')]),
      downloadUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?).(pdf)$')]),
      draft: [false],
      tagList: ['', Validators.required],
      targetUserType: ['', Validators.required],
      categoryId: ['', Validators.required],
      expiryDate: ['', Validators.required],
    });

    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.createArticleForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.createArticleForm.controls[controlName].hasError(errorName);
      }
    };
    this.addTagForm = frmbuilder.group({
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
    const fileType = this.fileData.type;

    if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') {
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
        console.log(width + '*' + height);

        if (width >= 240 && width <= 480 && height >= 180 && height <= 240) {
          this.imageValid = true;
          this.preview();
        } else {
          this.snackBar.open('Please upload valid image type/size', 'Close', {
            duration: 5000,
          });
          this.imageValid = false;
          this.previewUrl = null;
        }
      }, 2000);
    };
  }
  fileProgress2(fileInput: any) {
    this.attachUrl = null;
    this.imageValid2 = false;
    this.fileData = fileInput.target.files[0] as File;
    const fileType = this.fileData.type;
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
        this.snackBar.open('Image successfully uploaded', 'Close', {
          duration: 5000,
        });
      },
      (error) => {
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
      (error) => {
        this.show = false;
        this.snackBar.open('Oops, Something went wrong', 'Close', {
          duration: 5000,
        });
      }
    );
  }

  createArticle() {
    this.show = true;

    if (!this.image1button) {
      this.snackBar.open('Please Upload Article Image', 'Close', {
        duration: 5000,
      });
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
    if (this.createArticleForm.valid) {
      const tags: any[] = [];

      this.createArticleForm.value.tagList.forEach((m) => {
        const tag = {
          id: m.id,
          keywords: m.keywords,
          name: m.name,
        };
        tags.push(tag);
      });

      const obj = {
        categoryId: this.createArticleForm.controls['categoryId'].value,
        customerProfile: 'string',
        detailImageUrl: 'string',
        downloadUrl: this.attachFile,
        draft: this.createArticleForm.controls['draft'].value,
        longDescription: this.createArticleForm.controls['longDescription'].value,
        person: {},
        resourceType: 2,
        serviceUsed: 'string',
        shortDescription: this.createArticleForm.controls['shortDescription'].value,
        tagList: tags,
        thumbnailImageUrl: this.articleImage,
        title: this.createArticleForm.controls['title'].value,
        targetUserType: this.createArticleForm.controls['targetUserType'].value,
        approverId: 0,
        expiryDate: this.createArticleForm.controls['expiryDate'].value,
      };

      this.authService.saveResource(obj).subscribe(
        (response) => {
          this.show = false;
          this.snackBar.open('Article successfully created', 'Close', {
            duration: 2000,
          });

          this.router.navigate(['articles']);
        },
        (error) => {
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
}
