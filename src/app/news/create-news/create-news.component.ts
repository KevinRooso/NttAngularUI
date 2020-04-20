import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  speakerImage: string = "";
  articleImage: any;
  checkError: any;
  submitted: boolean = false;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  catagoryData: any[] = [];
  tagData: any[] = [];
  userList: any[] = [];
  imageValid: boolean = false;


  today=new Date();


  constructor(private formBuilder: FormBuilder, private router: Router, private service: AuthServiceService, private location: Location, private authService: AuthServiceService, public snackBar: MatSnackBar) { }
  createNewsForm: FormGroup;




  ngOnInit(): void {
    this.createNewsForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      topic: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      longDescription: new FormControl('', [Validators.required, Validators.maxLength(8000)]),
      shortDescription: new FormControl('', [Validators.required, Validators.maxLength(3000)]),
      about: new FormControl('', [Validators.required, Validators.maxLength(2000 )]),
      location: ['', Validators.required],
      targetUserType: ['', Validators.required],
      thumbnailImageUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]),
      draft: [false],
       expiryDate: ['', Validators.required]
    });

    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.createNewsForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.createNewsForm.controls[controlName].hasError(errorName);
      }

    }
    this.getUserList();

  }


  // fileProgress(fileInput: any) {
  //   this.fileData = <File>fileInput.target.files[0];
  //   this.preview();
  // }
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
    this.authService.uploadFile(formData)
      .subscribe(res => {
        console.log("Image", res);
        this.articleImage = res.fileDownloadUri;
        console.log("Image", this.articleImage);
        this.snackBar.open('Image successfully uploaded', 'Close', { duration: 5000 });
        //alert('SUCCESS !!');
      })
  }
  getUserList() {
    this.authService.getUserList().subscribe((res) => {
      this.userList = res.body;
      if(this.userList!=null)
      this.userList=this.userList.filter(m=>{
        return m.id!=9;
      })
    })
  }
  generateNews(){
    this.submitted = true;
    if (this.createNewsForm.valid) {
      let objData = {
        "title": this.createNewsForm.controls['title'].value,
        "topic": this.createNewsForm.controls['topic'].value,
        "shortDescription": this.createNewsForm.controls['shortDescription'].value,
        "longDescription": this.createNewsForm.controls['longDescription'].value,
        "location": this.createNewsForm.controls['location'].value,
        "about": this.createNewsForm.controls['about'].value,
        "active": false,
        "tagList":[],
        "targetUserType":this.createNewsForm.controls['targetUserType'].value,
        "draft": this.createNewsForm.controls['draft'].value,
        "thumbnailImageUrl": this.articleImage,
        "id": 0,
        "expiryDate": this.createNewsForm.controls['expiryDate'].value,
    }
    console.log("post", objData);
    this.authService.saveNews(objData).subscribe((response) => {
      console.log("response=",response);
      this.snackBar.open('News successfully created', 'Close', {duration: 5000});
      this.submitted = false;
      //this.router.navigate(['events']);
    },
    (error) => {
      console.log("error==",error);
      this.snackBar.open(error, 'Close');
     })

  }

  }
  BackMe() {
    this.location.back();
  }

}
