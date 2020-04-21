import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-cases-create',
  templateUrl: './cases-create.component.html',
  styleUrls: ['./cases-create.component.css']
})
export class CasesCreateComponent implements OnInit {


  createCases: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  addTagForm: FormGroup;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: any[] = [];
  tagData: any[] = [];
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  speakerImage: string = "";
  catagoryData: any[] = [];
  attachUrl: any = null;
  articleImage: any;

  checkError: any;
  submitted: boolean = false;
  imageValid: boolean = false;
  imageValid2: boolean = false;
  checkErrorPerson: any;
  submittedPerson: boolean = false;
  imageValidPerson: boolean = false;
  previewUrl1: any = null;
  imageValid1: boolean = false;
  userList: any[] = [];
  show: boolean = false;
  image1button: boolean = false;
  image2button: boolean = false;
  attachFile: any;

  today = new Date();



  @ViewChild('closeModel', { static: true }) closeModel;
  constructor(private formbuilder: FormBuilder,
    private authService: AuthServiceService,
    private location: Location,
    private router: Router,
    public snackBar: MatSnackBar) {

  }



  ngOnInit(): void {
    // this.createSpeaker();
    let mobnum = "^((\\+91-?)|0)?[0-9]{10}$";
    this.createCases = this.formbuilder.group({
      title: ['', Validators.required],
      longDescription: ['', Validators.required],
      categoryId: ['', Validators.required],
      tagList: ['', Validators.required],
      serviceUsed: ['', Validators.required],
      targetUserType: ['', Validators.required],
      expiryDate: ['', Validators.required],
      thumbnailImageUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]),
      downloadUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?)\.(pdf)$')]),
      isDraft: [false]
    });
    this.addTagForm = this.formbuilder.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
    })
    this.getCategoryDetails();
    this.getTagsDetails();
    this.getUserList();
    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.createCases.controls[controlName].hasError(errorName);
        }
      } else {
        return this.createCases.controls[controlName].hasError(errorName);
      }
    }
  }
  getUserList() {
    this.authService.getUserList().subscribe((res) => {
      this.userList = res.body;
      if (this.userList != null)
        this.userList = this.userList.filter(m => {
          return m.id != 9;
        })
    })
  }
  getCategoryDetails() {
    this.authService.getCategoryList().subscribe((res) => {
      this.catagoryData = res.body;
    })
  }
  getTagsDetails() {
    this.authService.getTagsList().subscribe((res) => {
      this.tagData = res.body;
    })
  }
  fileProgress(fileInput: any) {
    this.previewUrl = null;
    this.imageValid = false;
    this.fileData = <File>fileInput.target.files[0];
    let fileType = this.fileData.type;
    if (fileType == 'image/jpeg' || fileType == 'image/png' || fileType == 'image/jpg') {
      this.imageValid = true;
      this.preview();
    }
  }
  fileProgress2(fileInput: any) {
    this.attachUrl = null;
    this.imageValid2 = false;
    this.fileData = <File>fileInput.target.files[0];
    let fileType = this.fileData.type;
    if (fileType == 'application/pdf') {
      this.imageValid2 = true;
      this.preview2();
    }
  }



  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }
  preview2() {
    // Show preview
    var mimeType = this.fileData.type;
    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.attachUrl = reader.result;
    }
  }
  uploadImage() {
    this.show = true;
    this.image1button = false;
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.authService.uploadFile(formData)
      .subscribe(res => {
        console.log("Image", res);
        this.articleImage = res.fileDownloadUri;
        console.log("Image", this.articleImage);
        this.show = false;
        this.image1button = true;
        this.imageValid = false;
        this.snackBar.open('Image successfully uploaded', 'Close', { duration: 5000 });
      },
        (error) => {
          this.show = false;
          this.snackBar.open('Oops, Something went wrong', 'Close', { duration: 5000 });
        })
  }

  uploadAttachment() {
    this.image2button = false;
    this.show = true;
    const formData1 = new FormData();
    formData1.append('file', this.fileData);
    this.authService.uploadFile(formData1)
      .subscribe(res => {
        console.log("Image", res);
        this.attachFile = res.fileDownloadUri;
        console.log("File", this.attachFile);
        this.show = false;
        this.image2button = true;
        this.imageValid2 = false;
        this.snackBar.open('Attachment successfully uploaded', 'Close', { duration: 5000 });
      },
        (error) => {
          this.show = false;
          this.snackBar.open('Oops, Something went wrong', 'Close', { duration: 5000 });
        })
  }

  createCase() {
    this.show=true;
    if(!this.image1button){
      this.snackBar.open('Please Upload Image', 'Close', { duration: 5000 });
      this.show=false;
      return false;
    }
    if(!this.image2button){
      this.snackBar.open('Please Upload Attachment', 'Close', { duration: 5000 });
      this.show=false;
      return false;
    }
    if (this.createCases.valid) {
      let obj = this.createCases.value;
      let tags: any[] = [];
      obj.tagList.forEach(m => {
        let tag = {
          "id": m.id,
          "keywords": m.keywords,
          "name": m.name
        }
        tags.push(tag);
      });

      let dataObj = {
        "customerProfile": "string",
        "detailImageUrl": "string",
        "approverId": 0,
        "draft": obj.isDraft,
        "categoryId": obj.categoryId.id,
        "longDescription": obj.longDescription,
        "person": {
        },
        "resourceType": 3,
        "serviceUsed": obj.serviceUsed,
        "tagList": tags,
        "targetUserType": obj.targetUserType,
        "thumbnailImageUrl": this.articleImage,
        "downloadUrl": this.attachFile,
        "title": obj.title,
        "expiryDate": this.createCases.controls['expiryDate'].value
      }

      console.log("post", dataObj);
      this.authService.saveResource(dataObj).subscribe(res => {
        console.log(res);
        this.show=false;
        this.snackBar.open('Case Study Added Successfully', 'Close', { duration: 5000 });
        //alert("Blog Added Successfully");
        this.router.navigate(['cases']);
      },
      (error) => {
        this.show=false;
        this.snackBar.open('Oops, something went wrong..', 'Close');
      }
    )
    }else{
    this.show=false;
      this.snackBar.open('Please fill all mandatory field', 'Close', { duration: 5000 });
  }
}
  createTag() {
    if (this.addTagForm.valid) {
      let flag = true;
      this.tagData.forEach(m => {
        if (m.name.toUpperCase() == this.addTagForm.get(['name']).value.toUpperCase())
          flag = false;
      })
      let obj = this.addTagForm.value
      if (flag) {
        obj['id'] = 0;
        this.tagData.push(obj);
        this.closeModel.nativeElement.click();
      }
      else
        this.snackBar.open('Tag Already EXist', 'Close', { duration: 5000 });
      // alert("Tag Already EXist");
    }
  }
  BackMe() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
