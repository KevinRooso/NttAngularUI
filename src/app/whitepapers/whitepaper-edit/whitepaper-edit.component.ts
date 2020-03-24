import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-whitepaper-edit',
  templateUrl: './whitepaper-edit.component.html',
  styleUrls: ['./whitepaper-edit.component.css']
})
export class WhitepaperEditComponent implements OnInit {

  updateWhitePaperForm: FormGroup;


  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  articleImage: any;
  attachUrl: any = null;
  attachFile: any;
  wPaperId: any;
  wPaperData: any;

  constructor(private frmbuilder: FormBuilder, private location: Location, private authService: AuthServiceService, private router1: ActivatedRoute) {
    this.updateWhitePaperForm = frmbuilder.group({
      title: ['', Validators.required],
      longDescription: ['', Validators.required],
      // shortDescription: ['',  Validators.required],
      thumbnailImageUrl: [''],
      downloadUrl: ['']
    });
  }

  ngOnInit(): void {
    this.router1.queryParams.subscribe(params => {
      console.log(params.page);
      this.wPaperId = params.page;
      this.getWhitePaperDetails(params.page);
    });
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

  getWhitePaperDetails(id){
    this.authService.getResourceById(id).subscribe((res)=>{
      this.wPaperData = res.body;
      console.log('resdata', this.wPaperData);
      this.updateWhitePaperForm.controls['title'].setValue(this.wPaperData.title);
      this.updateWhitePaperForm.controls['longDescription'].setValue(this.wPaperData.longDescription);
    //   this.EditArticleForm.controls['shortDescription'].setValue(this.articleData.shortDescription);
    //  // this.EditArticleForm.controls['title'].setValue(this.articleData.title);
      this.articleImage = res.body.thumbnailImageUrl;
      this.attachFile = res.body.resourceLink;
    //   console.log("Check ME", res.body.thumbnailImageUrl);
    //   console.log("Check file", res.body.articelAttach);
      //this.previewUrl = this.getSpeaker.profileImageUrl;

    })
  }
  createWhitePaper() {
    if(this.updateWhitePaperForm.valid){
    let obj = {
      "categoryId": 0,
      "customerProfile": "string",
      "detailImageUrl": "string",
      "downloadUrl": this.attachFile,
      "isDraft": true,
      "longDescription": this.updateWhitePaperForm.controls['longDescription'].value,
      "person": {},
      "resourceType": 5,
      "serviceUsed": "string",
      "shortDescription": "string",
      "tagList": [{}],
      "thumbnailImageUrl": this.articleImage,
      "title": this.updateWhitePaperForm.controls['title'].value,
      "id": this.wPaperId
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
BackMe() {
  this.location.back(); // <-- go back to previous location on cancel
}

}
