import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-videos-create',
  templateUrl: './videos-create.component.html',
  styleUrls: ['./videos-create.component.css'],
})
export class VideosCreateComponent implements OnInit {
  speakerImage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: AuthServiceService,
    private location: Location,
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
  show = false;
  image1button = false;

  today = new Date();

  @ViewChild('closeModel', { static: true }) closeModel;
  ngOnInit(): void {
    this.createVideoForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      longDescription: new FormControl('', [Validators.required, Validators.maxLength(700)]),
      shortDescription: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      // person: ['',Validators.required],
      categoryId: [''],
      tagList: [''],
      targetUserType: ['', Validators.required],
      isDraft: [false],
      thumbnailImageUrl: ['', [Validators.required, Validators.pattern('(.*?).(jpg|png|jpeg)$')]],
      downloadUrl: ['', Validators.required],
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
    this.getCategoryDetails();
    this.getTagsDetails();
    this.getUserList();
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
  getCategoryDetails() {
    this.service.getCategoryList().subscribe((res) => {
      this.catagoryData = res.body;
    });
  }
  getTagsDetails() {
    this.service.getTagsList().subscribe((res) => {
      this.tagData = res.body;
    });
  }
  // fileProgress(fileInput: any) {
  //   this.previewUrl = null;
  //   this.imageValid = false;
  //   this.fileData = fileInput.target.files[0] as File;
  //   const fileType = this.fileData.type;
  //   if (fileType == 'image/jpeg' || fileType == 'image/png') {
  //     this.imageValid = true;
  //     this.preview();
  //   }
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
        // console.log(width + '*' + height);

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

  // uploadImage() {
  //   const formData = new FormData();
  //   formData.append('file', this.fileData);
  //   this.service.uploadFile(formData)
  //     .subscribe(res => {
  //       console.log("Image", res);
  //       this.speakerImage = res.fileDownloadUri;
  //       this.imageValid = false;
  //       this.snackBar.open('Image successfully uploaded', 'Close', {duration: 5000});
  //       console.log(this.speakerImage);
  //     })
  // }
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
    this.submitted = true;
    if (!this.image1button) {
      this.snackBar.open('Please Upload Image', 'Close', { duration: 5000 });
      this.show = false;
      return false;
    }
    this.submitted = true;
    if (this.createVideoForm.valid) {
      const obj = this.createVideoForm.value;
      obj['thumbnailImageUrl'] = this.speakerImage;

      const tags: any[] = [];

      obj.tagList.forEach((m) => {
        const tag = {
          id: 0,
          keywords: m.keywords,
          name: m.name,
        };
        tags.push(tag);
      });

      const dataObj = {
        longDescription: obj.longDescription,
        categoryId: obj.categoryId,
        customerProfile: 'string',
        detailImageUrl: 'string',
        downloadUrl: obj.downloadUrl,

        person: {},
        shortDescription: obj.longDescription,
        tagList: tags,
        thumbnailImageUrl: obj.thumbnailImageUrl,
        title: obj.title,
        resourceType: 6,
        draft: obj.isDraft,
        targetUserType: obj.targetUserType,
        expiryDate: this.createVideoForm.controls['expiryDate'].value,
      };

      this.service.saveResource(dataObj).subscribe(
        (_res) => {
          this.show = false;
          this.submitted = false;

          this.snackBar.open('Video Added Successfully', 'Close', { duration: 5000 });
          this.router.navigate(['videos']);
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
        this.snackBar.open('Tag Already Exist', 'Close', { duration: 5000 });
      }
      // alert("Tag Already EXist");
    }
  }
  BackMe() {
    this.location.back();
  }
}
