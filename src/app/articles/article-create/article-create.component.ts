import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
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
  submitted: boolean = false;
  imageValid: boolean = false;
  imageValid2: boolean = false;
  userList: any[] = [];
  allData: any[] = [];
  tagData: any[] = [];

  today=new Date();
  show:boolean=false;
  image1button:boolean=false;
  image2button:boolean=false;
  @ViewChild('closeModel', { static: true }) closeModel;
  constructor(private frmbuilder: FormBuilder, private authService: AuthServiceService,
    private location: Location, public snackBar: MatSnackBar,
    private router:Router) {
    this.createArticleForm = frmbuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      longDescription: new FormControl('', [Validators.required, Validators.maxLength(8000)]),
      shortDescription: new FormControl('', [Validators.required, Validators.maxLength(3000)]),
      thumbnailImageUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]),
      downloadUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?)\.(pdf)$')]),
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

    }
    this.addTagForm = frmbuilder.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
    })
  }



  ngOnInit(): void {
    this.getUserList();
    this.getCategoryDetails();
    this.getTagsDetails();
  }
  getTagsDetails() {
    this.authService.getTagsList().subscribe((res) => {
      this.tagData = res.body;
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
  getCategoryDetails() {
    this.authService.getCategoryList().subscribe((res) => {
      this.allData = res.body;
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
    this.show=true;
    this.image1button=false;
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.authService.uploadFile(formData)
      .subscribe(res => {
        console.log("Image", res);
        this.articleImage = res.fileDownloadUri;
        console.log("Image", this.articleImage);
        this.show=false;
        this.image1button=true;
        this.imageValid = false;
        this.snackBar.open('Image successfully uploaded', 'Close', { duration: 5000 });
      },
      (error)=>{
        this.show=false;
        this.snackBar.open('Oops, Something went wrong', 'Close', { duration: 5000 });
      })
  }

  uploadAttachment() {
    this.image2button=false;
    this.show=true;
    const formData1 = new FormData();
    formData1.append('file', this.fileData);
    this.authService.uploadFile(formData1)
      .subscribe(res => {
        console.log("Image", res);
        this.attachFile = res.fileDownloadUri;
        console.log("File", this.attachFile);
        this.show=false;
        this.image2button=true;
        this.imageValid2 = false;
        this.snackBar.open('Attachment successfully uploaded', 'Close', { duration: 5000 });
      },
      (error)=>{
        this.show=false;
        this.snackBar.open('Oops, Something went wrong', 'Close', { duration: 5000 });
      })
  }


  createArticle() {
    this.show=true;
    if(!this.image1button){
      this.snackBar.open('Please Upload Article Image', 'Close', { duration: 5000 });
      this.show=false;
      return false;
    }
    if(!this.image2button){
      this.snackBar.open('Please Upload Attachment', 'Close', { duration: 5000 });
      this.show=false;
      return false;
    }
    if (this.createArticleForm.valid) {

      let tags: any[] = [];

      this.createArticleForm.value.tagList.forEach(m => {
        let tag = {
          "id": m.id,
          "keywords": m.keywords,
          "name": m.name
        }
        tags.push(tag);
      });

      let obj = {
        "categoryId": this.createArticleForm.controls['categoryId'].value,
        "customerProfile": "string",
        "detailImageUrl": "string",
        "downloadUrl": this.attachFile,
        "draft": this.createArticleForm.controls['draft'].value,
        "longDescription": this.createArticleForm.controls['longDescription'].value,
        "person": {},
        "resourceType": 2,
        "serviceUsed": "string",
        "shortDescription": this.createArticleForm.controls['shortDescription'].value,
        "tagList": tags,
        "thumbnailImageUrl": this.articleImage,
        "title": this.createArticleForm.controls['title'].value,
        "targetUserType": this.createArticleForm.controls['targetUserType'].value,
        "approverId": 0,
        "expiryDate": this.createArticleForm.controls['expiryDate'].value
      }
      console.log("post", obj);

      this.authService.saveResource(obj).subscribe(
        (response) => {
          this.show=false;
          this.snackBar.open('Article successfully created', 'Close', { duration: 2000 });
          console.log("response", response);
          this.router.navigate(['articles']);
        },
        (error) => {
          this.show=false;
          this.snackBar.open('Oops, something went wrong..', 'Close');
        }
      )
    }
    else {
      this.show=false;
      this.snackBar.open('Please fill all mandatory fields', 'Close', { duration: 5000 });
    }

  }
  createTag() {
    if (this.addTagForm.valid) {
      let flag = true;
      this.tagData.forEach(m => {
        if (m.keywords == this.addTagForm.get(['name']).value)
          flag = false;
      })
      let obj = this.addTagForm.value
      if (flag) {
        obj['id'] = 0;
        this.tagData.unshift(obj);
        this.closeModel.nativeElement.click();
      }
      else
        alert("Tag Already EXist");
    }
  }
  BackMe() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}


