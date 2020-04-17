import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  EditArticleForm: FormGroup;

  addTagForm: FormGroup;
  tagsList: string[] = [];

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  articleImage: any;
  attachUrl: any = null;
  attachFile: any;
  articleData: any;
  articleId: any;
  articelImage: any;
  articelAttach: any;
  checkError: any;
  submitted: boolean = false;
  userList: any[] = [];
  allData: any[] = [];
  tagData: any[] = [];
  imageValid: boolean = false;
  imageValid2: boolean = false;
  selected4:string[]=[];
  valuesSelectedTag: string[] = [];
  selected3:string="";
  today=new Date();

  show:boolean=false;
  image1button:boolean=false;
  image2button:boolean=false;
  @ViewChild('closeModel', { static: true }) closeModel;
  // catId: any;
  constructor(private frmbuilder: FormBuilder, private location: Location, private router: Router,
    private authService: AuthServiceService, private router1: ActivatedRoute, public snackBar: MatSnackBar ) {
    this.EditArticleForm = frmbuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      longDescription: new FormControl('', [Validators.required, Validators.maxLength(8000)]),
      shortDescription: new FormControl('', [Validators.required, Validators.maxLength(3000)]),
      thumbnailImageUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]),
      downloadUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?)\.(pdf)$')]),
      draft: [false],
      tagList: [''],
      targetUserType: ['', Validators.required],
      categoryId: ['', Validators.required],
      expiryDate: ['', Validators.required],
    });
    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.EditArticleForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.EditArticleForm.controls[controlName].hasError(errorName);
      }

    }
    this.addTagForm = frmbuilder.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
    })

  }

  ngOnInit(): void {
    this.show=true;
    this.router1.queryParams.subscribe(params => {
      console.log(params.page);
      this.articleId = params.page;

      this.getArticlesDetails(params.page);


    });

  }
  getTagsDetails() {
    this.authService.getTagsList().subscribe((res) => {
      this.tagData = res.body;
      console.log("tagdetails==",this.tagData);

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

  getArticlesDetails(id){
    this.authService.getResourceById(id).subscribe((res)=>{

      this.articleData = res.body;
      this.selected3=res.body.targetUserType.id;
      console.log("Data", this.selected3);



      console.log('resdata', this.articleData);

      this.EditArticleForm.controls['title'].setValue(this.articleData.title);
      this.EditArticleForm.controls['longDescription'].setValue(this.articleData.longDescription);
      this.EditArticleForm.controls['shortDescription'].setValue(this.articleData.shortDescription);
      this.EditArticleForm.controls['categoryId'].setValue(this.articleData.category.displayName);
      this.EditArticleForm.controls['tagList'].setValue(this.articleData.resourceTags.name);
      this.EditArticleForm.controls['draft'].setValue(this.articleData.isDraft);
      this.selected4=[];
      console.log("tags==",this.selected4);
      console.log("tagssss=",res.body.resourceTags);

      for(let i=0;i<res.body.resourceTags.length;i++)
      this.selected4.push(res.body.resourceTags[i].id);

      console.log("tags==",this.selected4);
      this.EditArticleForm.controls['thumbnailImageUrl'].setValidators(null);
      this.EditArticleForm.controls['thumbnailImageUrl'].updateValueAndValidity();
      this.previewUrl= this.articleData.thumbnailImageUrl;
      this.articleImage= this.articleData.thumbnailImageUrl;
      this.EditArticleForm.controls['downloadUrl'].setValidators(null);
      this.EditArticleForm.controls['downloadUrl'].updateValueAndValidity();
      this.articelAttach = this.articleData.resourceLink;

      this.EditArticleForm.controls['targetUserType'].setValidators(null);
      this.EditArticleForm.controls['targetUserType'].updateValueAndValidity();
      this.EditArticleForm.controls['targetUserType'].setValue(this.articleData.targetUserType.id);


      this.EditArticleForm.controls['tagList'].setValidators(null);
      this.EditArticleForm.controls['tagList'].updateValueAndValidity();


      this.today=this.articleData.expiryDate;
      this.EditArticleForm.controls['expiryDate'].setValue(this.articleData.expiryDate);
      console.log("date=",this.today);
      this.image1button=true;
      this.image2button=true;
      this.getTagsDetails();
      this.getUserList();
      this.getCategoryDetails();

      this.show=false;
    })
  }

  fileProgress(fileInput: any) {

    this.previewUrl = null;
    this.imageValid = false;
    this.fileData = <File>fileInput.target.files[0];
    console.log("fileData==", this.fileData);
if(this.fileData!=undefined){
  this.image1button=false;
    let fileType = this.fileData.type;
    if (fileType == 'image/jpeg' || fileType == 'image/png' || fileType == 'image/jpg') {
      this.imageValid = true;
      this.preview();
    }
  }
  }
  fileProgress2(fileInput: any) {
    this.image2button=false;
    this.attachUrl = null;
    this.imageValid2 = false;
    this.fileData = <File>fileInput.target.files[0];
    if(this.fileData!=undefined){
      this.image2button=false;
    let fileType = this.fileData.type;
    if (fileType == 'application/pdf') {
      this.imageValid2 = true;
      this.preview2();
    }
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
  preview2() {
    var mimeType = this.fileData.type;
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
      .subscribe((res) => {
        console.log("Image", res);
        this.articleImage = res.fileDownloadUri;
        console.log("Image", this.articleImage);
        this.show=false;
        this.image1button=true;
        this.snackBar.open('Image successfully uploaded', 'Close', { duration: 5000 });
      },
      (error)=>{
        this.show=false;
        this.snackBar.open('Oops, Something went wrong', 'Close', { duration: 5000 });
      })
  }
  uploadAttachment() {
    this.show=true;
    this.image1button=false;
    const formData1 = new FormData();
    formData1.append('file', this.fileData);
    this.authService.uploadFile(formData1)
      .subscribe((res) => {
        console.log("Image", res);
        this.attachFile = res.fileDownloadUri;
        console.log("File", this.attachFile);
        this.image1button=true;
        this.snackBar.open('Image successfully uploaded', 'Close', { duration: 5000 });
      },
      (error)=>{
        this.show=false;
        this.snackBar.open('Oops, Something went wrong', 'Close', { duration: 5000 });
      })
  }


  updateArticle() {
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
    if(this.EditArticleForm.valid){
      let tags:any[]=[];
      this.tagData.forEach(m=>{
        this.EditArticleForm.value.tagList.forEach(n=>{
            if(n==m.id){
              let tag={
              "id":m.id,
              "keywords": m.keywords,
              "name": m.name
              }
              tags.push(tag);
            }
        });
      })
      let catId;
      this.allData.forEach(m=>{
        if(m.displayName==this.EditArticleForm.controls['categoryId'].value)
          catId=m.id;
      });
      console.log("cat id",catId);

      // let userId;
      // this.userList.forEach(m=>{
      //   if(m.displayName==this.EditArticleForm.controls['targetUserType'].value)
      //     userId=m.id;
      // });

    let obj = {
      "categoryId": catId,
      "customerProfile": "string",
      "detailImageUrl": "string",
      "downloadUrl": this.articelAttach,
      "id": this.articleId,
      "isDraft": true,
      "longDescription": this.EditArticleForm.controls['longDescription'].value,
      "person": {},
      "resourceType": 2,
      "serviceUsed": "string",
      "shortDescription": this.EditArticleForm.controls['shortDescription'].value,
      "tagList": tags,
      "thumbnailImageUrl": this.articleImage,
      "title": this.EditArticleForm.controls['title'].value,
      "targetUserType": this.EditArticleForm.controls['targetUserType'].value,
      "expiryDate":this.EditArticleForm.controls['expiryDate'].value
    }
    console.log("post", obj);

    this.authService.saveResource(obj).subscribe(
      (response) => {
        // alert("Successfully Updated");
        console.log("response", response);
        this.show=false;
        this.snackBar.open('Article successfully updated', 'Close', {duration: 5000});
        this.submitted = false;
      },
      (error) => {
        //alert("Error :"+error);
        this.show=false;
        this.snackBar.open('Oops, Something went wrong', 'Close', {duration: 5000});
      }
    )
  }
  else{
    this.show=false;
    this.snackBar.open('Please fill all mandatory fields', 'Close', {duration: 5000});
  }
  }
  createTag() {
    if (this.addTagForm.valid) {
      let flag = true;
      this.tagData.forEach(m => {
        if (m.keywords == this.addTagForm.get(['keywords']).value)
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


