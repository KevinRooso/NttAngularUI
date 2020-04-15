import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {

  speakerImage: string = "";

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private service: AuthServiceService, private location: Location, public snackBar: MatSnackBar) { }
  updateNewsForm: FormGroup;
  // personForm:FormGroup;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  catagoryData: any[] = [];
  tagData: any[] = [];
  checkError: any;
  submitted: boolean = false;
  newsId;
  public dateTime1;
  articleImage: any;
  imageValid: boolean = false;
  selected3:string="";

  userList: any[] = [];
  ngOnInit(): void {

    this.updateNewsForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      topic: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      longDescription: new FormControl('', [Validators.required, Validators.maxLength(8000)]),
      shortDescription: new FormControl('', [Validators.required, Validators.maxLength(3000)]),
      about: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
      location: ['', Validators.required],
      targetUserType: ['', Validators.required],
      thumbnailImageUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]),
      draft: [false],
    });
    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.updateNewsForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.updateNewsForm.controls[controlName].hasError(errorName);
      }

    }
    this.getUserList();
    this.actRoute.queryParams.subscribe(params => {
      this.newsId = params.page;
      this.getNewsVideoById(params.page);
    });
  }
  getUserList() {
    this.service.getUserList().subscribe((res) => {
      this.userList = res.body;
      if(this.userList!=null)
      this.userList=this.userList.filter(m=>{
        return m.id!=9;
      })
    })
  }
  getNewsVideoById(id) {
    this.service.getNewsById(id).subscribe(res => {
      console.log("Data", res);

      // this.getDate(res.body.date);
      this.updateNewsForm.get(['title']).setValue(res.body.title);
      this.updateNewsForm.get(['topic']).setValue(res.body.topic);
      this.updateNewsForm.get(['shortDescription']).setValue(res.body.shortDescription);
      this.updateNewsForm.get(['longDescription']).setValue(res.body.longDescription);
      this.updateNewsForm.get(['location']).setValue(res.body.location);
      this.updateNewsForm.get(['about']).setValue(res.body.about);
      this.updateNewsForm.get(['draft']).setValue(res.body.draft);
      if(res.body.targetUserType!=null)
      this.updateNewsForm.get(['targetUserType']).setValue(res.body.targetUserType.displayName);
      this.updateNewsForm.controls['thumbnailImageUrl'].setValidators(null);
      this.updateNewsForm.controls['thumbnailImageUrl'].updateValueAndValidity();
      this.previewUrl = res.body.thumbnailImageUrl;
      this.articleImage = res.body.thumbnailImageUrl;
      if(res.body.targetUserType!=null)
      this.selected3=res.body.targetUserType.id;
      console.log("Data", this.selected3);
    })
  }
  fileProgress(fileInput: any) {
    this.previewUrl = null;
    this.imageValid = false;
    this.fileData = <File>fileInput.target.files[0];
    let fileType = this.fileData.type;
    if (fileType == 'image/jpeg' || fileType == 'image/png') {
      this.imageValid = true;
      this.preview();
    }
  }
  preview() {
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
  uploadImage() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.service.uploadFile(formData)
      .subscribe(res => {
        console.log("Image", res);
        this.articleImage = res.fileDownloadUri;
        console.log("Image", this.articleImage);
        this.snackBar.open('Image successfully uploaded', 'Close', { duration: 5000 });
        //alert('SUCCESS !!');
      })
  }

  updateNews() {
    this.submitted = true;
    if (this.updateNewsForm.valid) {

      let userId;
      this.userList.forEach(m=>{
        if(m.displayName==this.updateNewsForm.controls['targetUserType'].value)
          userId=m.id;
      });

      let objData = {
        "title": this.updateNewsForm.controls['title'].value,
        "topic": this.updateNewsForm.controls['topic'].value,
        "shortDescription": this.updateNewsForm.controls['shortDescription'].value,
        "longDescription": this.updateNewsForm.controls['longDescription'].value,
        "location": this.updateNewsForm.controls['location'].value,
        "about": this.updateNewsForm.controls['about'].value,
        "active": false,
        "tagList":[],
        "draft": this.updateNewsForm.controls['draft'].value,
        "thumbnailImageUrl": this.articleImage,
        "id": this.newsId,
        "targetUserType":userId
      }
      console.log("post", objData);
      this.service.saveNews(objData).subscribe((response) => {
        this.snackBar.open('News successfully updated', 'Close', { duration: 5000 });
         console.log("responsne", response);
        this.submitted = false;
        //this.router.navigate(['events']);
      },
        (error) => {
          console.log("error", error);
          this.snackBar.open(error, 'Close');
          // alert("Error :" + error);
        })
    }
  }
  BackMe() {
    this.location.back();
  }
  // getDate(date){
  // let dObj=date.split(' ');
  // console.log(dObj[3],'=',MONTH[dObj[1]],'=',dObj[2]);
  // this.dateTime1=new Date(dObj[3],MONTH[dObj[1]],dObj[2]);
  // }

}
// const MONTH={
//     'Jan':0,'Feb':1,'Mar':2,'Apr':3,'May':4,'Jun':5,'Jul':6,'Aug':7,
//     'Sep':8,'Oct':9,'Nov':10,'Dec':11
// }
