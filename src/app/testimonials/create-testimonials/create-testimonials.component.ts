import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-create-testimonials',
  templateUrl: './create-testimonials.component.html',
  styleUrls: ['./create-testimonials.component.css']
})
export class CreateTestimonialsComponent implements OnInit {

  speakerImage: string="";

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private service:AuthServiceService, private location: Location) { }
    createVideoForm:FormGroup;
  // personForm:FormGroup;
  fileData: File = null;
  previewUrl: any = null;
  previewUrl1: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  catagoryData:any[]=[];
  tagData:any[]=[];
    logo:string="";

  ngOnInit(): void {
    this.createVideoForm = this.formBuilder.group({
      title: ['',Validators.required],
      shortDescription: ['',Validators.required],
      longDescription: ['',Validators.required],
      detailImageUrl:[''],
      thumbnailImageUrl:['']

    });

  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
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
  uploadImage() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.service.uploadFile(formData)
      .subscribe(res => {
        console.log("Image", res);
        alert("Image Uploaded Successfully");
        this.speakerImage = res.fileDownloadUri;
        console.log(this.speakerImage);
      })
  }


  fileProgress1(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview1();
  }
  preview1() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl1 = reader.result;
    }
  }
  uploadImage1() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.service.uploadFile(formData)
      .subscribe(res => {
        alert("Image Uploaded Successfully");
        this.logo = res.fileDownloadUri;
      })
  }


  generateBlog(){
    if(this.createVideoForm.valid){
      let obj=this.createVideoForm.value;
      let dataObj={
            "detailImageUrl":this.logo,
          "isDraft": true,
          "longDescription": obj.longDescription,
          "person": {
          },
          "resourceType":4,
          "shortDescription": obj.shortDescription,
          "tagList": [],
          "thumbnailImageUrl": this.speakerImage,
          "title": obj.title

     }

    console.log(dataObj);
    this.service.saveResource(dataObj).subscribe(res=>{
      console.log(res);
      alert("Testimonials Added Successfully");
      this.router.navigate(['testimonials']);
    })
    }
}
BackMe(){
  this.location.back();
}

}
