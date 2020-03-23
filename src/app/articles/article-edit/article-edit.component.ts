import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';

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
  constructor(private frmbuilder: FormBuilder, private authService: AuthServiceService) {
    this.EditArticleForm = frmbuilder.group({
      title: ['', Validators.required],
      longDescription: [''],
      shortDescription: [''],
      thumbnailImageUrl: [''],
      downloadUrl: ['']
    });

  }

  ngOnInit(): void {
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
        console.log("Image", this.articleImage);
        alert('SUCCESS !!');
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
        alert('SUCCESS !!');
      })
  }

  createArticle() {
    let obj = {

      "categoryId": 0,
      "customerProfile": "string",
      "detailImageUrl": "string",
      "downloadUrl": this.attachFile,
      "id": 0,
      "isDraft": true,
      "longDescription": this.EditArticleForm.controls['longDescription'].value,
      "person": {
        "description": "string",
        "designation": "string",
        "email": "string",
        "fullName": "string",
        "id": 0,
        "keySkills": "string",
        "origanizationName": "string",
        "personalEmail": "string",
        "phone": "string",
        "profile": "string",
        "profileImageUrl": "string"
      },
      "resourceType": 0,
      "serviceUsed": "string",
      "shortDescription": this.EditArticleForm.controls['shortDescription'].value,
      "tagList": [
        {
          "id": 0,
          "keywords": "string",
          "name": "string"
        }
      ],
      "thumbnailImageUrl": this.articleImage,
      "title": this.EditArticleForm.controls['title'].value
    }
    console.log("post", obj);

    this.authService.saveResource(obj).subscribe(
      (response) => {
        alert("Successfully Created");
        console.log("response", response);
      },
      (error) => console.log(error)
    )
  }
  updateArticle(){

  }

}


