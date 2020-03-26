import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  speakerImage: string="";

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private service:AuthServiceService, private location: Location) { }
    createVideoForm:FormGroup;
  // personForm:FormGroup;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  catagoryData:any[]=[];
  tagData:any[]=[];


  ngOnInit(): void {
    this.createVideoForm = this.formBuilder.group({
      title: ['',Validators.required],
      shortDescription: ['',Validators.required],
      date: ['',Validators.required],
      location: ['',Validators.required],
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
        this.speakerImage = res.fileDownloadUri;
        console.log(this.speakerImage);
      })
  }

  generateBlog(){
    if(this.createVideoForm.valid){
      let date=this.createVideoForm.get(['date']).value.toString().split(' ');
      console.log(date);

    let dataObj=this.createVideoForm.value;
    dataObj['thumbnailImageUrl']=this.speakerImage;
    dataObj['date']=date[1]+','+date[2]+','+date[3];
    dataObj['year']=date[3];
    console.log(dataObj);
    this.service.saveNews(dataObj).subscribe(res=>{
      alert("News Added Successfully");
      this.router.navigate(['/videos-detail']);
    })
    }
}
BackMe(){
  this.location.back();
}

}
