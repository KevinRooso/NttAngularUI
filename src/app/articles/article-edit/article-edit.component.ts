import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location} from '@angular/common';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  EditArticleForm: FormGroup;


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
  constructor(private frmbuilder: FormBuilder, private location: Location, private router: Router, private authService: AuthServiceService, private router1: ActivatedRoute ) {
    this.EditArticleForm = frmbuilder.group({
      title: ['', Validators.required],
      longDescription:['', Validators.required],
      shortDescription: ['', Validators.required],
      thumbnailImageUrl: [''],
      downloadUrl: ['']
    });

  }

  ngOnInit(): void {
    this.router1.queryParams.subscribe(params => {
      console.log(params.page);
      this.articleId = params.page;
      this.getArticlesDetails(params.page);
    });
  }

  getArticlesDetails(id){
    this.authService.getResourceById(id).subscribe((res)=>{
      this.articleData = res.body;
      console.log('resdata', this.articleData);
      this.EditArticleForm.controls['title'].setValue(this.articleData.title);
      this.EditArticleForm.controls['longDescription'].setValue(this.articleData.longDescription);
      this.EditArticleForm.controls['shortDescription'].setValue(this.articleData.shortDescription);
     // this.EditArticleForm.controls['title'].setValue(this.articleData.title);
      this.articelImage = res.body.thumbnailImageUrl;
      this.articelAttach = res.body.resourceLink;
      console.log("Check ME", res.body.thumbnailImageUrl);
      console.log("Check file", res.body.articelAttach);
      //this.previewUrl = this.getSpeaker.profileImageUrl;

    })
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }
  fileProgress2(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview2();
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
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.authService.uploadFile(formData)
      .subscribe(res => {
        console.log("Image", res);
        this.articleImage = res.fileDownloadUri;
        console.log("ArticleImage", this.articleImage);
        // alert('SUCCESS !!');
      })
  }
  uploadAttachment() {
    const formData1 = new FormData();
    formData1.append('file', this.fileData);
    this.authService.uploadFile(formData1)
      .subscribe(res => {
        console.log("Image", res);
        this.attachFile = res.fileDownloadUri;
        console.log("File", this.attachFile);
        // alert('SUCCESS !!');
      })
  }

  updateArticle() {
    if(this.EditArticleForm.valid){
      console.log("ArticleImage2", this.articleImage);
    let obj = {
      "categoryId": 0,
      "customerProfile": "string",
      "detailImageUrl": "string",
      "downloadUrl": this.attachFile,
      "id": this.articleId,
      "isDraft": true,
      "longDescription": this.EditArticleForm.controls['longDescription'].value,
      "person": {},
      "resourceType": 2,
      "serviceUsed": "string",
      "shortDescription": this.EditArticleForm.controls['shortDescription'].value,
      "tagList": [{ }],
      "thumbnailImageUrl": this.articleImage,
      "title": this.EditArticleForm.controls['title'].value,
      "resourceLink": this.articelAttach,
    }
    console.log("post", obj);

    this.authService.saveResource(obj).subscribe(
      (response) => {
        alert("Successfully Updated");
        console.log("response", response);
      },
      (error) => console.log(error)
    )
  }
  }
  // updateArticle(){

  // }
  BackMe() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}


