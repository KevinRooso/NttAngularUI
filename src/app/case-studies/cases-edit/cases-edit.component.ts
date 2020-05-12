import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { textValidation } from 'src/app/validators/general-validators';

@Component({
  selector: 'app-cases-edit',
  templateUrl: './cases-edit.component.html',
  styleUrls: ['./cases-edit.component.css'],
})
export class CasesEditComponent implements OnInit {
  createCases: FormGroup;
  addTagForm: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  attachFile: any;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: any[] = [];
  tagData: any[] = [];
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  speakerImage = '';
  caseId;
  selected2 = '';
  selected3 = '';
  selected4: string[] = [];
  catagoryData: any[] = [];
  show = false;
  articleImage: any;
  articelAttach: any;

  checkError: any;
  submitted = false;
  checkErrorPerson: any;
  submittedPerson = false;
  imageValidPerson = false;
  previewUrl1: any = null;
  imageValid = false;
  imageValid2 = false;
  userList: any[] = [];
  tarUserType = '';
  attachUrl: any = null;

  image1button = false;
  image2button = false;
  result1: string;
  result2: string;
  today = new Date();
  @ViewChild('closeModel', { static: true }) closeModel;
  getCaseData: any;
  submitBtnCaption = 'Publish';
  constructor(
    private frmbuilder: FormBuilder,
    private authService: AuthServiceService,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar
  ) {
    this.createCases = frmbuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      longDescription: new FormControl('', [Validators.required, textValidation(700)]),
      categoryId: ['', Validators.required],
      tagList: ['', Validators.required],
      serviceUsed: new FormControl('', [Validators.required, textValidation(500)]),
      targetUserType: ['', Validators.required],
      thumbnailImageUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?).(jpg|png|jpeg)$')]),
      downloadUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?).(pdf)$')]),
      draft: [false],
      expiryDate: ['', Validators.required],
    });
    this.addTagForm = this.frmbuilder.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // this.createSpeaker();

    this.actRoute.queryParams.subscribe((params) => {
      this.caseId = params.page;
      this.getCasesData(params.page);
    });
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
    });
  }
  getCasesData(id) {
    this.authService.getBlogById(id).subscribe((res) => {
      this.getCaseData = res.body;

      const url1 = this.getCaseData.thumbnailImageUrl;
      this.result1 = url1.split('/').pop().split('?')[0].slice(14, url1.length);

      const url2 = this.getCaseData.resourceLink;
      if (this.getCaseData.resourceLink != null) {
        this.result2 = url2.split('/').pop().split('?')[0].slice(14, url2.length);
      }

      this.setDraftCaption(res.body.isDraft);

      this.selected2 = res.body.category.id;
      if (res.body.person != null) {
        this.selected3 = res.body.person.id;
      }

      if (res.body.targetUserType != null) {
        this.tarUserType = res.body.targetUserType.id;
      }
      this.createCases.controls['targetUserType'].setValidators(null);
      this.createCases.controls['targetUserType'].updateValueAndValidity();

      this.createCases.controls['categoryId'].setValidators(null);
      this.createCases.controls['categoryId'].updateValueAndValidity();
      this.createCases.controls['tagList'].setValidators(null);
      this.createCases.controls['tagList'].updateValueAndValidity();
      // this.createCases.controls['person'].setValidators(null);
      // this.createCases.controls['person'].updateValueAndValidity();
      this.createCases.controls['thumbnailImageUrl'].setValidators(null);
      this.createCases.controls['thumbnailImageUrl'].updateValueAndValidity();
      this.createCases.controls['thumbnailImageUrl'].setValidators([Validators.pattern('(.*?).(jpg|png|jpeg)$')]);
      this.createCases.controls['thumbnailImageUrl'].updateValueAndValidity();
      this.previewUrl = res.body.thumbnailImageUrl;
      this.articleImage = res.body.thumbnailImageUrl;
      this.createCases.get(['title']).setValue(res.body.title);
      this.createCases.get(['longDescription']).setValue(res.body.longDescription);
      this.createCases.get(['serviceUsed']).setValue(res.body.serviceUsed);
      this.createCases.get(['categoryId']).setValue(res.body.category.id);
      this.createCases.get(['draft']).setValue(res.body.isDraft);

      this.createCases.controls['downloadUrl'].setValidators(null);
      this.createCases.controls['downloadUrl'].updateValueAndValidity();
      this.attachFile = res.body.resourceLink;

      // this.createCases.get(['thumbnailImageUrl']).setValue(res.body.thumbnailImageUrl);
      for (let i = 0; i < res.body.resourceTags.length; i++) {
        this.selected4.push(res.body.resourceTags[i].id);
      }
      this.tarUserType = res.body.targetUserType.id;

      this.today = res.body.expiryDate;
      this.createCases.controls['expiryDate'].setValue(res.body.expiryDate);
      this.image1button = true;
      this.image2button = true;
      this.getCategoryDetails();
      this.getTagsDetails();
      this.getUserList();
    });
  }
  getCategoryDetails() {
    this.authService.getCategoryList().subscribe((res) => {
      this.catagoryData = res.body;
    });
  }
  getTagsDetails() {
    this.authService.getTagsList().subscribe((res) => {
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
        // this.preview2();
        this.result2 = this.fileData.name;
      } else {
        this.snackBar.open('Please upload PDF attachment only', 'Close', { duration: 5000 });
      }
    }
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
    this.authService.uploadFile(formData1).subscribe(
      (res) => {
        this.attachFile = res.fileDownloadUri;

        this.image2button = true;
        this.imageValid2 = false;
        this.show = false;
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
    if (this.createCases.value.tagList.length === 0) {
      this.createCases.controls['tagList'].setValidators(Validators.required);
      this.createCases.controls['tagList'].updateValueAndValidity();
    }
    if (this.createCases.valid) {
      const obj = this.createCases.value;
      let catObj;
      this.catagoryData.forEach((m) => {
        if (this.createCases.get(['categoryId']).value === m.id) {
          catObj = m;
        }
      });

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
      const dataObj = {
        draft: obj.draft,
        id: this.caseId,
        categoryId: catObj.id,
        longDescription: obj.longDescription,
        personId: null,
        resourceType: 3,
        serviceUsed: obj.serviceUsed,
        tagList: tags,
        targetUserType: obj.targetUserType,
        title: obj.title,
        expiryDate: obj.expiryDate,
        customerProfile: 'string',
        detailImageUrl: 'string',
        approverId: 0,
        thumbnailImageUrl: this.articleImage,
        downloadUrl: this.attachFile,
      };

      this.authService.saveResource(dataObj).subscribe(
        (_res) => {
          this.show = false;
          this.snackBar.open('Case Study Updated Successfully', 'Close', {
            duration: 5000,
          });
          // alert("Case Study Updated Successfully");
          this.router.navigate(['cases']);
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
        this.tagData.push(obj);
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
