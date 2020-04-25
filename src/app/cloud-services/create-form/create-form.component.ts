import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  constructor(  private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
    public snackBar: MatSnackBar,
    private router1:ActivatedRoute) { }

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
  submitted = false;

  imageValid = false;
  imageValid2 = false;

  image1button = false;
  image2button = false;
  editData:any=null;
    parent:any=null;
    parentId=0;
    bradArray:any[]=[]
    changeFlag:boolean=false;
  ngOnInit(): void {
    this.productServicesForm = this.formBuilder.group({
      displayName: ['', Validators.required],
      isCategory: [false],
      shortDescription:[''],
      shortInformation:[''],
      longDescription:[''],
      thumbnailImage: ['', [Validators.required, Validators.pattern('(.*?).(jpg|png|jpeg)$')]],
      largeImage: ['', [Validators.required, Validators.pattern('(.*?).(jpg|png|jpeg)$')]]
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
    this.router1.queryParams.subscribe((params) => {
      console.log("data=",params);
      console.log("data=",JSON.parse(params.page1));

      if(params!=null){
        this.parent=JSON.parse(params.page);
        if(this.parent !=null)
        this.parentId=this.parent.id;
        this.bradArray=JSON.parse(params.page1);
        this.editData=JSON.parse(params.page2);
        if(this.editData!=null){
          this.productServicesForm.controls['displayName'].setValue(this.editData.displayName);
          this.productServicesForm.controls['isCategory'].setValue(this.editData.isCategory);
          this.productServicesForm.controls['shortDescription'].setValue(this.editData.shortDescription);
          this.productServicesForm.controls['shortInformation'].setValue(this.editData.shortInformation);
          this.productServicesForm.controls['longDescription'].setValue(this.editData.longDescription);
          this.changeFlag=this.editData.isLastService;
          this.previewUrl = this.editData.thumbnailImage;
          this.attachUrl = this.editData.largeImage;
          this.articleImage = this.editData.thumbnailImage;
          this.attachFile = this.editData.largeImage;

        }
      }

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
    if ((fileType == 'image/jpeg' || fileType == 'image/png' || fileType == 'image/jpg') && fileSize < 1000000) {
      this.imageValid = true;
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
    const img = new Image();
    img.src = window.URL.createObjectURL(this.fileData);
    const fileType = this.fileData.type;
    const fileSize = this.fileData.size;
    if ((fileType == 'image/jpeg' || fileType == 'image/png' || fileType == 'image/jpg') && fileSize < 300000) {
      this.imageValid = true;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = () => {
      setTimeout(() => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        window.URL.revokeObjectURL(img.src);
        console.log(width + '*' + height);

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
        console.log('Image', res);
        this.articleImage = res.fileDownloadUri;
        console.log('Image', this.articleImage);
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
    this.image2button = false;
    this.authService.uploadFile(formData1).subscribe(
      (res) => {
        console.log('Image', res);
        this.attachFile = res.fileDownloadUri;
        console.log('File', this.attachFile);
        this.show = false;
        this.image2button = true;
        this.imageValid2 = false;
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
  lastServiceChange(){
    this.changeFlag=!this.changeFlag;
  }
  submit(){
    let formObject = this.productServicesForm.value;
    formObject.thumbnailImage= this.articleImage;
    formObject.largeImage=this.attachFile;
    if(this.editData!=null){
      formObject.id=this.editData.id;
    }
    formObject.parentId=this.parentId;
    console.log("postobj=",formObject);
    this.authService.createProductAndService(formObject).subscribe(res=>{
      console.log("res=",res);
      this.snackBar.open('Success !!', 'Close', {
        duration: 5000,
      });
      console.log("obj=",this.parent);
      let obj={
        'page':JSON.stringify(this.parent),
            'page1':JSON.stringify(this.bradArray)
      }
    let navigationExtras: NavigationExtras = {
      queryParams: obj
  };
  this.router.navigate(['cloud-service'], navigationExtras);
    })
  }
  sendPage(data){
    console.log("obj=",data);
      let obj={
        'page':JSON.stringify(data),
            'page1':JSON.stringify(this.bradArray)
      }
    let navigationExtras: NavigationExtras = {
      queryParams: obj
  };
  this.router.navigate(['cloud-service'], navigationExtras);
  }
}
