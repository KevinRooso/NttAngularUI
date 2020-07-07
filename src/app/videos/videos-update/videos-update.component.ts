import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { textValidation } from 'src/app/validators/general-validators';

@Component({
  selector: 'app-videos-update',
  templateUrl: './videos-update.component.html',
  styleUrls: ['./videos-update.component.css'],
})
export class VideosUpdateComponent implements OnInit {
  speakerImage: any;
  videoID: any;
  vidoeData: any;
  submitBtnCaption: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: AuthServiceService,
    private location: Location,
    private actRoute: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {}
  createVideoForm: FormGroup;
  // personForm:FormGroup;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  catagoryData: any[] = [];
  tagData: any[] = [];
  selected2 = '';
  selected4: string[] = [];

  addTagForm: FormGroup;
  checkError: any;
  submitted = false;
  imageValid = false;
  checkErrorPerson: any;
  submittedPerson = false;
  imageValidPerson = false;
  previewUrl1: any = null;
  imageValid1 = false;
  userList: any[] = [];
  today = new Date();
  tarUserType = '';
  show = false;
  image1button = false;
  result1: string;
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  @ViewChild('closeModel', { static: true }) closeModel;
  ngOnInit(): void {
    this.createVideoForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      longDescription: new FormControl('', [Validators.required, textValidation(700)]),
      shortDescription: new FormControl('', [Validators.required, textValidation(80)]),
      // person: ['',Validators.required],
      categoryId: [''],
      tagList: [''],
      targetUserType: ['', Validators.required],
      draft: [false],
      thumbnailImageUrl: ['', [Validators.required, Validators.pattern('(.*?).(jpg|png|jpeg)$')]],
      downloadUrl: ['', [Validators.required]],
      expiryDate: ['', Validators.required],
    });
    this.addTagForm = this.formBuilder.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
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
    this.actRoute.params.subscribe((params) => {
      this.videoID = params.page;
      this.getVideosData(params.page);
    });
    // this.getVideosData(params.page);
  }
  getUserList() {
    this.service.getUserList().subscribe((res) => {
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
  getVideosData(id) {
    this.service.getResourceById(id).subscribe((res) => {
      this.vidoeData = res.body;
      const url1 = this.vidoeData.thumbnailImageUrl;
      this.result1 = url1.split('/').pop().split('?')[0].slice(14, url1.length);

      this.createVideoForm.controls['targetUserType'].setValidators(null);
      this.createVideoForm.controls['targetUserType'].updateValueAndValidity();
      this.createVideoForm.controls['tagList'].setValidators(null);
      this.createVideoForm.controls['tagList'].updateValueAndValidity();
      this.createVideoForm.controls['categoryId'].setValidators(null);
      this.createVideoForm.controls['categoryId'].updateValueAndValidity();
      // this.createVideoForm.controls['person'].setValidators(null);
      // this.createVideoForm.controls['person'].updateValueAndValidity();
      this.createVideoForm.controls['thumbnailImageUrl'].setValidators(null);
      this.createVideoForm.controls['thumbnailImageUrl'].updateValueAndValidity();
      this.createVideoForm.controls['thumbnailImageUrl'].setValidators([Validators.pattern('(.*?).(jpg|png|jpeg)$')]);
      this.createVideoForm.controls['thumbnailImageUrl'].updateValueAndValidity();
      if (res.body.targetUserType != null) {
        this.tarUserType = res.body.targetUserType.id;
      }
      this.today = res.body.expiryDate;
      this.createVideoForm.controls['expiryDate'].setValue(res.body.expiryDate);

      if (res.body.targetUserType != null) {
        if (res.body.category !== null) {
          this.selected2 = res.body.category.id;
        }
      }

      res.body.resourceTags.forEach((m) => {
        this.selected4.push(m.id);
      });
      this.setDraftCaption(res.body.isDraft);
      this.speakerImage = res.body.thumbnailImageUrl;
      this.createVideoForm.get(['title']).setValue(res.body.title);
      this.createVideoForm.get(['longDescription']).setValue(res.body.longDescription);
      this.createVideoForm.get(['shortDescription']).setValue(res.body.shortDescription);
      if (res.body.category !== null) {
        this.createVideoForm.get(['categoryId']).setValue(res.body.category.id);
      }
      this.createVideoForm.get(['downloadUrl']).setValue(res.body.resourceLink);
      this.createVideoForm.get(['draft']).setValue(res.body.isDraft);
      // this.createVideoForm.get(['person']).setValue(res.body.person.id);
      this.previewUrl = res.body.thumbnailImageUrl;
      this.image1button = true;
      this.getCategoryDetails();
      this.getTagsDetails();
      this.getUserList();

      // this.createBlogForm.get(['thumbnailImageUrl']).setValue(res.body.thumbnailImageUrl);
      // this.createBlogForm.get(['title']).setValue(res.body.title);
    });
  }
  getCategoryDetails() {
    this.service.getCategoryListByGroup('Resources').subscribe((res) => {
      this.catagoryData = res.body;
    });
  }
  getTagsDetails() {
    this.service.getTagsList().subscribe((res) => {
      this.tagData = res.body;
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
    this.image1button = false;
    this.show = true;
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.service.uploadFile(formData).subscribe(
      (res) => {
        this.speakerImage = res.fileDownloadUri;
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

  generateBlog() {
    this.show = true;
    if (!this.image1button) {
      this.snackBar.open('Please Upload Image', 'Close', { duration: 5000 });
      this.show = false;
      return false;
    }
    if (this.createVideoForm.value.tagList.length === 0) {
      this.createVideoForm.controls['tagList'].setValidators(null);
      this.createVideoForm.controls['tagList'].updateValueAndValidity();
    }
    this.submitted = true;
    if (this.createVideoForm.valid) {
      const obj = this.createVideoForm.value;
      obj['thumbnailImageUrl'] = this.speakerImage;

      const tags: any[] = [];
      this.tagData.forEach((m) => {
        obj.tagList.forEach((n) => {
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
      catId = this.createVideoForm.controls['categoryId'].value;
      if (this.createVideoForm.controls['categoryId'].value === '0') {
        catId = null;
      }

      const dataObj = {
        longDescription: obj.longDescription,
        categoryId: catId,
        customerProfile: 'string',
        detailImageUrl: 'string',
        downloadUrl: obj.downloadUrl,
        personId: null,
        shortDescription: obj.shortDescription,
        tagList: tags,
        thumbnailImageUrl: obj.thumbnailImageUrl,
        title: obj.title,
        resourceType: 6,
        id: this.videoID,
        draft: obj.draft,
        targetUserType: obj.targetUserType,
        expiryDate: obj.expiryDate,
      };

      this.service.saveResource(dataObj).subscribe(
        (_res) => {
          this.show = false;
          this.snackBar.open('Videos Updated Successfully', 'Close', { duration: 5000 });
          // alert("Case Study Updated Successfully");
          this.router.navigate(['/resources/videos']);
        },
        (_error) => {
          this.show = false;
          this.snackBar.open('Oops, something went wrong..', 'Close');
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
        this.snackBar.open('Tag Already Exist', 'Close', { duration: 5000 });
      }
      // alert("Tag Already EXist");
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
