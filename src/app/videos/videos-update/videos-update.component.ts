import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-videos-update',
  templateUrl: './videos-update.component.html',
  styleUrls: ['./videos-update.component.css']
})
export class VideosUpdateComponent implements OnInit {
  speakerImage: any;
  videoID: any;

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private service:AuthServiceService, private location: Location, private actRoute:ActivatedRoute) { }
    createVideoForm:FormGroup;
  // personForm:FormGroup;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  catagoryData:any[]=[];
  tagData:any[]=[];
  selected2:string="";
  selected4:string[]=[];
  ngOnInit(): void {
    this.createVideoForm = this.formBuilder.group({
      title: [''],
      longDescription: [''],
      shortDescription: [''],
      person: [''],
      categoryId: [''],
      tagList: [''],
      thumbnailImageUrl: [''],
      downloadUrl: [''],
    });
    this.actRoute.queryParams.subscribe(params => {
      this.videoID=params.page;
      this.getVideosData(params.page);
    });
    // this.getVideosData(params.page);
    this.getCategoryDetails();
    this.getTagsDetails();
  }
  getVideosData(id){
    this.service.getResourceById(id).subscribe(res=>{
      console.log("Videos=",res);
      this.selected2=res.body.category.id;
      console.log("catg=",res.body.category.id);
     // console.log("person=",res.body.person.id);

      //this.selected3=res.body.person.id;
      res.body.resourceTags.forEach(m=>{
        this.selected4.push(m.name);
      })
       this.speakerImage=res.body.thumbnailImageUrl;
      this.createVideoForm.get(['title']).setValue(res.body.title);
      this.createVideoForm.get(['longDescription']).setValue(res.body.longDescription);
      this.createVideoForm.get(['shortDescription']).setValue(res.body.shortDescription);
      this.createVideoForm.get(['categoryId']).setValue(res.body.category.id);
      this.createVideoForm.get(['downloadUrl']).setValue(res.body.resourceLink)
      //this.createVideoForm.get(['person']).setValue(res.body.person.id);
      this.previewUrl=res.body.thumbnailImageUrl;
      //this.createBlogForm.get(['thumbnailImageUrl']).setValue(res.body.thumbnailImageUrl);
      // this.createBlogForm.get(['title']).setValue(res.body.title);
    })
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
      "id":this.videoID
    }
    console.log(dataObj);
    this.service.saveResource(dataObj).subscribe(res=>{
      console.log("Post Dat",res);
      alert("Video Updated Successfully");
      // this.router.navigate(['blogs']);
    })
    }
}
BackMe(){
  this.location.back();
}

}
