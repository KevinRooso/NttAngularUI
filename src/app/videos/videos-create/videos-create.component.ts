import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-videos-create',
  templateUrl: './videos-create.component.html',
  styleUrls: ['./videos-create.component.css']
})
export class VideosCreateComponent implements OnInit {
  speakerImage: any;

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private service:AuthServiceService, private location: Location,
    public snackBar: MatSnackBar) { }
    createVideoForm:FormGroup;
  // personForm:FormGroup;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  catagoryData:any[]=[];
  tagData:any[]=[];

  addTagForm:FormGroup;
  checkError:any;
  submitted: boolean = false;
  imageValid:boolean=false;
  checkErrorPerson:any;
  submittedPerson: boolean = false;
  imageValidPerson:boolean=false;
  previewUrl1: any = null;
  imageValid1:boolean=false;
  userList:any[]=[];


  today=new Date();


  @ViewChild('closeModel',{static:true}) closeModel;
  ngOnInit(): void {
    this.createVideoForm = this.formBuilder.group({
      title: ['',Validators.required],
      longDescription: ['',Validators.required],
      shortDescription:['',Validators.required],
     // person: ['',Validators.required],
      categoryId: ['',Validators.required],
      tagList: ['',Validators.required],
      targetUserType:['',Validators.required],
      isDraft:[false],
      thumbnailImageUrl: ['', [Validators.required,Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]],
      downloadUrl: ['',Validators.required],
      expiryDate: ['',Validators.required],


    });
    this.addTagForm = this.formBuilder.group({
      name:['',Validators.required],
      keywords:['',Validators.required],
    })
    this.checkError = (controlName: string, errorName: string, checkSubmitted:boolean) => {
      if(checkSubmitted){
        if(this.submitted){
          return this.createVideoForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.createVideoForm.controls[controlName].hasError(errorName);
      }
    }
    this.getCategoryDetails();
    this.getTagsDetails();
    this.getUserList();
  }
  getUserList() {
    this.service.getUserList().subscribe((res) => {
      this.userList = res.body;
      if(this.userList!=null)
      this.userList=this.userList.filter(m=>{
        return m.id!=9;
      })
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
        this.speakerImage = res.fileDownloadUri;
        this.imageValid = false;
        this.snackBar.open('Image successfully uploaded', 'Close', {duration: 5000});
        console.log(this.speakerImage);
      })
  }


  generateBlog(){

    let obj=this.createVideoForm.value;
    obj['thumbnailImageUrl']=this.speakerImage;

    let tags:any[]=[];
    console.log('TAGList==',tags);

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

      "person": {},
      "shortDescription": obj.longDescription,
      "tagList": tags,
      "thumbnailImageUrl":obj.thumbnailImageUrl,
      "title": obj.title,
      "resourceType": 6,
      "isDraft": obj.isDraft,
      "targetUserType":obj.targetUserType,
      "expiryDate": this.createVideoForm.controls['expiryDate'].value,
    }
    console.log(dataObj);
    this.service.saveResource(dataObj).subscribe(res=>{
      console.log("Post Dat",res);
      this.snackBar.open('Video Added Successfully', 'Close', {duration: 5000});
     // alert("Video Added Successfully");
       this.router.navigate(['videos']);
    })

}
createTag(){
  if(this.addTagForm.valid){
        let flag=true;
  this.tagData.forEach(m=>{
    if(m.keywords==this.addTagForm.get(['keywords']).value)
    flag=false;
  })
  let obj=this.addTagForm.value
  if(flag){
    obj['id']=0;
  this.tagData.unshift(obj);
  this.closeModel.nativeElement.click();
}
else
this.snackBar.open('Tag Already EXist', 'Close', {duration: 5000});
//alert("Tag Already EXist");
}
}
BackMe(){
  this.location.back();
}

}
