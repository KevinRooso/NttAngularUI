import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {

  createArticleForm: FormGroup;


  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  articleImage: any;
  attachUrl: any = null;
  attachFile: any;

  constructor(private frmbuilder: FormBuilder, private authService: AuthServiceService) {
    this.createArticleForm = frmbuilder.group({
      title: ['', Validators.required],
      longDescription: ['', Validators.required],
      shortDescription: ['',  Validators.required],
      thumbnailImageUrl: [''],
      downloadUrl: ['']
    });
  }

  ngOnInit(): void {
    // this.createArticle();
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

  createArticle() {
    if(this.createArticleForm.valid){
    let obj = {

      "categoryId": 0,
      "customerProfile": "string",
      "detailImageUrl": "string",
      "downloadUrl": this.attachFile,
      "isDraft": true,
      "longDescription": this.createArticleForm.controls['longDescription'].value,
      "person": {},
      "resourceType": 2,
      "serviceUsed": "string",
      "shortDescription": this.createArticleForm.controls['shortDescription'].value,
      "tagList": [{}],
      "thumbnailImageUrl": this.articleImage,
      "title": this.createArticleForm.controls['title'].value
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
}

}


