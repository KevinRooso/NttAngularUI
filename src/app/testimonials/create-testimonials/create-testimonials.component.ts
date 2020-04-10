import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-testimonials',
  templateUrl: './create-testimonials.component.html',
  styleUrls: ['./create-testimonials.component.css']
})
export class CreateTestimonialsComponent implements OnInit {

  speakerImage: string="";

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private service:AuthServiceService, private location: Location,
    private snackBar:MatSnackBar) { }
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

    addTagForm:FormGroup;
    checkError:any;
    submitted: boolean = false;
    imageValid:boolean=false;
    checkErrorPerson:any;
    submittedPerson: boolean = false;
    imageValidPerson:boolean=false;
   imageValid1:boolean=false;
    userList:any[]=[];
  ngOnInit(): void {
    this.createVideoForm = this.formBuilder.group({
      title: ['',Validators.required],
      shortDescription: ['',Validators.required],
      longDescription: ['',Validators.required],
      targetUserType:['',Validators.required],
      isDraft:[false],
      detailImageUrl: ['', [Validators.required,Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]],
      thumbnailImageUrl: ['', [Validators.required,Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]]

    });
    this.checkError = (controlName: string, errorName: string, checkSubmitted:boolean) => {
      if(checkSubmitted){
        if(this.submitted){
          return this.createVideoForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.createVideoForm.controls[controlName].hasError(errorName);
      }
    }
    this.getUserList();
  }
  getUserList() {
    this.service.getUserList().subscribe((res) => {
      this.userList = res.body;
    })
  }
  fileProgress(fileInput: any) {
    this.previewUrl=null;
    this.imageValid=false;
    this.fileData = <File>fileInput.target.files[0];
    let fileType=this.fileData.type;
     if(fileType=='image/jpeg' || fileType=='image/png'){
      this.imageValid=true;
    this.preview();
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
  uploadImage() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.service.uploadFile(formData)
      .subscribe(res => {
        console.log("Image", res);
       // alert("Image Uploaded Successfully");
        this.logo = res.fileDownloadUri;
        this.imageValid = false;
        this.snackBar.open('Image successfully uploaded', 'Close', {duration: 5000});
        console.log(this.speakerImage);
      })
  }


  fileProgress1(fileInput: any) {
    this.previewUrl1=null;
    this.imageValid1=false;
    this.fileData = <File>fileInput.target.files[0];
    let fileType=this.fileData.type;
     if(fileType=='image/jpeg' || fileType=='image/png'){
      this.imageValid1=true;
    this.preview1();
    }
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
        //alert("Image Uploaded Successfully");
        this.speakerImage = res.fileDownloadUri;
        this.imageValid1 = false;
        this.snackBar.open('Image successfully uploaded', 'Close', {duration: 5000});
      })
  }


  generateBlog(){

      let obj=this.createVideoForm.value;
      let dataObj={
            "thumbnailImageUrl":this.logo,
          "isDraft": obj.isDraft,
          "longDescription": obj.longDescription,
          "person": {
          },
          "resourceType":4,
          "shortDescription": obj.shortDescription,
          "tagList": [],
          "detailImageUrl": this.speakerImage,
          "title": obj.title,
          "targetUserType":obj.targetUserType,
          "categoryId":15

     }

    console.log(dataObj);
    this.service.saveResource(dataObj).subscribe(res=>{
      console.log(res);
      //alert("Testimonials Added Successfully");
      this.snackBar.open('Testimonials Added Successfully', 'Close', {duration: 5000});
      this.router.navigate(['testimonials']);
    })

}
BackMe(){
  this.location.back();
}

}
