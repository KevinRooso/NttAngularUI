import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-videos-create',
  templateUrl: './videos-create.component.html',
  styleUrls: ['./videos-create.component.css']
})
export class VideosCreateComponent implements OnInit {
  speakerImage: any;

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
      longDescription: ['',Validators.required],
      shortDescription: [''],
      person: [''],
      categoryId: ['',Validators.required],
      tagList: ['',Validators.required],
      thumbnailImageUrl: [''],
      downloadUrl: ['',Validators.required],

    });
    this.getCategoryDetails();
    this.getTagsDetails();
  }

  getCategoryDetails(){
    this.service.getCategoryList().subscribe((res)=>{
      this.catagoryData = res.body;
    })
  }
  getTagsDetails(){
    this.service.getTagsList().subscribe((res)=>{
       this.tagData=res.body;
    })
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
    let obj=this.createVideoForm.value;
    obj['thumbnailImageUrl']=this.speakerImage;

    let tags:any[]=[];
    obj.tagList.forEach(m=>{
      let tag={
        "id": 0,
      "keywords": m.keywords,
      "name": m.name
      }
      tags.push(tag);
    });

    let dataObj={
      "longDescription": obj.longDescription,
      "categoryId": obj.categoryId,
      "customerProfile": "string",
      "detailImageUrl": "string",
      "downloadUrl": obj.downloadUrl,
      "isDraft": true,
      "person": {},
      "shortDescription": obj.longDescription,
      "tagList": tags,
      "thumbnailImageUrl":obj.thumbnailImageUrl,
      "title": obj.title,
      "resourceType": 6,
    }
    console.log(dataObj);
    this.service.saveResource(dataObj).subscribe(res=>{
      console.log("Post Dat",res);
      alert("Video Added Successfully");
      // this.router.navigate(['blogs']);
    })
    }
}
BackMe(){
  this.location.back();
}

}
