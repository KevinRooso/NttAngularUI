import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location} from '@angular/common';

@Component({
  selector: 'app-whitepaper-create',
  templateUrl: './whitepaper-create.component.html',
  styleUrls: ['./whitepaper-create.component.css']
})
export class WhitepaperCreateComponent implements OnInit {

  createWhitePaperForm: FormGroup;


  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  articleImage: any;
  attachUrl: any = null;
  attachFile: any;

  constructor(private frmbuilder: FormBuilder, private authService: AuthServiceService, private location: Location) {
    this.createWhitePaperForm = frmbuilder.group({
      title: ['', Validators.required],
      longDescription: ['', Validators.required],
      // shortDescription: ['',  Validators.required],
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

  createWhitePaper() {
    if(this.createWhitePaperForm.valid){
    let obj = {
      "categoryId": 0,
      "customerProfile": "string",
      "detailImageUrl": "string",
      "downloadUrl": this.attachFile,
      "isDraft": true,
      "longDescription": this.createWhitePaperForm.controls['longDescription'].value,
      "person": {},
      "resourceType": 5,
      "serviceUsed": "string",
      "shortDescription": "string",
      "tagList": [{}],
      "thumbnailImageUrl": this.articleImage,
      "title": this.createWhitePaperForm.controls['title'].value
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
BackMe() {
  this.location.back(); // <-- go back to previous location on cancel
}
}
