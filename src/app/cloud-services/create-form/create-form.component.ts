import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
})
export class CreateFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
    public snackBar: MatSnackBar,
    private router1: ActivatedRoute
  ) {}

  show = false;
  productServicesForm: FormGroup;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  articleImage: any;
  attachUrl: any = null;
  attachFile: any;
  previewUrl2: any;
  checkError: any;
  checkError1: any;
  submitted = false;
  uploaded = false;

  imageValid = false;
  imageValid2 = false;

  image1button = false;
  image2button = false;
  editData: any = null;
  parent: any = null;
  parentId = 0;
  bradArray: any[] = [];
  changeFlag = false;
  pageTitle: string;
  craeteUrlForm: FormGroup;
  urlArray: any[] = [];
  globalUrl: any = null;
  index = -1;
  deleteIndex = -1;
  deleteId: any;
  @ViewChild('closedeleteModal', { static: true }) closedeleteModal;
  @ViewChild('closeModelUrl', { static: true }) closeModelUrl;
  @ViewChild('addUrl', { static: true }) addUrl;
  ngOnInit(): void {
    this.productServicesForm = this.formBuilder.group({
      displayName: ['', [Validators.required, Validators.maxLength(30)]],
      isCategory: [false],
      detail: [''],
      shortInformation: ['', [Validators.required, Validators.maxLength(40)]],
      implementation: [''],
      productBenefits: [''],
      differentiator: [''],
      testimonialUrl: [''],
      thumbnailImageUrl: ['', [Validators.pattern('(.*?).(jpg|png|jpeg|JPG|PNG|JPEG)$')]],
    });
    this.craeteUrlForm = this.formBuilder.group({
      testimonialUrl: ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
    });
    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.productServicesForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.productServicesForm.controls[controlName].hasError(errorName);
      }
    };
    this.checkError1 = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.craeteUrlForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.craeteUrlForm.controls[controlName].hasError(errorName);
      }
    };
    this.show = true;
    this.router1.queryParams.subscribe((params) => {
      if (params != null) {
        this.pageTitle = 'Create Product And Services';
        this.parent = JSON.parse(params.page);
        if (this.parent !== null) {
          this.pageTitle = 'Create Product And Services For ' + this.parent.displayName;
          this.parentId = this.parent.id;
        }
        this.bradArray = JSON.parse(params.page1);
        this.editData = JSON.parse(params.page2);
        if (this.editData !== null) {
          if (this.parent !== null) {
            this.pageTitle = 'Edit Product And Services For ' + this.parent.displayName;
          }
          this.productServicesForm.controls['displayName'].setValue(this.editData.displayName);
          this.productServicesForm.controls['detail'].setValue(this.editData.detail);
          this.productServicesForm.controls['isCategory'].setValue(this.editData.isCategory);
          this.productServicesForm.controls['implementation'].setValue(this.editData.implementation);
          this.productServicesForm.controls['shortInformation'].setValue(this.editData.shortInformation);
          this.productServicesForm.controls['productBenefits'].setValue(this.editData.productBenefits);
          this.productServicesForm.controls['differentiator'].setValue(this.editData.differentiator);
          this.urlArray = this.editData.testimonialUrl;
          this.changeFlag = this.editData.isLastService;
          this.previewUrl = this.editData.thumbnailImageUrl;
          this.articleImage = this.editData.thumbnailImageUrl;
          this.uploaded = true;
        }
      }
      this.show = false;
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
    if (
      (fileType.toLowerCase() === 'image/jpeg' || fileType.toLowerCase() === 'image/png' || fileType.toLowerCase() === 'image/jpg') &&
      fileSize < 300000
    ) {
      this.imageValid = true;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = () => {
      setTimeout(() => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        this.uploaded = false;

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
    this.fileData = fileInput.target.files[0] as File;
    const img = new Image();
    img.src = window.URL.createObjectURL(this.fileData);
    const fileType = this.fileData.type;
    const fileSize = this.fileData.size;
    if (
      (fileType.toLowerCase() === 'image/jpeg' || fileType.toLowerCase() === 'image/png' || fileType.toLowerCase() === 'image/jpg') &&
      fileSize < 300000
    ) {
      this.imageValid = true;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = () => {
      setTimeout(() => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        window.URL.revokeObjectURL(img.src);

        if (width >= 720 && width <= 1080 && height >= 360 && height <= 580) {
          this.imageValid2 = true;
          this.preview2();
        } else {
          this.snackBar.open('Please upload valid image type/size', 'Close', {
            duration: 5000,
          });
          this.imageValid2 = false;
          this.attachUrl = null;
        }
      }, 2000);
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
  preview2() {
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
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
    this.image1button = false;
    this.authService.uploadFile(formData).subscribe(
      (res) => {
        this.articleImage = res.fileDownloadUri;
        this.show = false;
        this.uploaded = true;
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
    formData1.append('file', this.fileData);
    this.image2button = false;
    this.authService.uploadFile(formData1).subscribe(
      (res) => {
        this.attachFile = res.fileDownloadUri;
        this.show = false;
        this.image2button = true;
        this.imageValid2 = false;
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
  lastServiceChange() {
    this.changeFlag = !this.changeFlag;
  }
  submit() {
    if (this.changeFlag === false) {
      this.uploaded = true;
    }
    if (this.uploaded) {
      if (this.productServicesForm.valid) {
        const formObject = this.productServicesForm.value;
        formObject.thumbnailImageUrl = this.articleImage;
        if (this.editData != null) {
          formObject.id = this.editData.id;
        }
        formObject.parentId = this.parentId;
        formObject.isLastService = this.changeFlag;
        formObject.testimonialUrl = this.urlArray;
        this.show = true;
        this.authService.createProductAndService(formObject).subscribe(
          (_res) => {
            this.snackBar.open('Success !!', 'Close', {
              duration: 5000,
            });
            const obj = {
              page: JSON.stringify(this.parent),
              page1: JSON.stringify(this.bradArray),
            };
            const navigationExtras: NavigationExtras = {
              queryParams: obj,
              skipLocationChange: true,
            };
            this.show = false;
            this.router.navigate(['cloud-service'], navigationExtras);
          },
          (_error) => {
            this.show = false;
          }
        );
      } else {
        this.snackBar.open('Please fill all mandatory fields', 'Close', {
          duration: 5000,
        });
      }
    } else {
      this.snackBar.open('Please Upload Image', 'Close', {
        duration: 5000,
      });
    }
  }
  sendPage(data) {
    const obj = {
      page: JSON.stringify(data),
      page1: JSON.stringify(this.bradArray),
    };
    const navigationExtras: NavigationExtras = {
      queryParams: obj,
      skipLocationChange: true,
    };
    this.router.navigate(['cloud-service'], navigationExtras);
  }
  createUrl() {
    if (this.craeteUrlForm.valid) {
      const obj = {
        url: this.craeteUrlForm.controls['testimonialUrl'].value,
      };
      if (this.index !== -1) {
        const newArr = this.urlArray;
        this.urlArray = [];
        newArr.forEach((m, i) => {
          if (i === this.index) {
            m.url = this.craeteUrlForm.controls['testimonialUrl'].value;
            this.urlArray.push(m);
          } else {
            this.urlArray.push(m);
          }
        });
      } else {
        this.urlArray.push(obj);
      }
      this.index = -1;
      this.globalUrl = null;

      this.closeModelUrl.nativeElement.click();
    }
  }
  editUrl(data, i) {
    this.craeteUrlForm.controls['testimonialUrl'].setValue(data.url);
    this.globalUrl = data;
    this.index = i;
  }
  cleanUrl() {
    this.craeteUrlForm.controls['testimonialUrl'].setValue('');
  }
  getDeleteId(data, i) {
    this.deleteId = data.id;
    this.deleteIndex = i;
  }
  deleteConfirm() {
    if (this.deleteId) {
      this.authService.deleteProductAndServices(this.deleteId).subscribe((_res) => {
        this.urlArray = this.urlArray.filter((_m, i) => i !== this.deleteIndex);
        this.closedeleteModal.nativeElement.click();
      });
    } else {
      this.urlArray = this.urlArray.filter((_m, i) => i !== this.deleteIndex);
      this.closedeleteModal.nativeElement.click();
    }
  }
}
