import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location} from '@angular/common';


@Component({
  selector: 'app-cases-create',
  templateUrl: './cases-create.component.html',
  styleUrls: ['./cases-create.component.css']
})
export class CasesCreateComponent implements OnInit {


  createCases: FormGroup;

    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;

    addTagForm: FormGroup;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    fruits: any[] = [];
    tagData: any[] = [];
    fileData: File = null;
    previewUrl: any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;
    speakerImage: string="";
    catagoryData:any[]=[];
    @ViewChild('closeModel',{static:true}) closeModel;
    constructor(private formbuilder: FormBuilder,
      private authService: AuthServiceService,
      private location: Location,
      private router:Router) {

    }



    ngOnInit(): void {
      // this.createSpeaker();
      let mobnum = "^((\\+91-?)|0)?[0-9]{10}$";
      this.createCases = this.formbuilder.group({
        title: ['', Validators.required],
        longDescription: [''],
        categoryId: [''],
        tagList: [''],
        serviceUsed: ['', Validators.required],
        thumbnailImageUrl: ['']
      });
      this.addTagForm = this.formbuilder.group({
        name:['',Validators.required],
        keywords:['',Validators.required],
      })
      this.getCategoryDetails();
      this.getTagsDetails();
    }
    getCategoryDetails(){
      this.authService.getCategoryList().subscribe((res)=>{
        this.catagoryData = res.body;
      })
    }
    getTagsDetails(){
      this.authService.getTagsList().subscribe((res)=>{
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
      this.authService.uploadFile(formData)
        .subscribe(res => {
          console.log("Image", res);
          this.speakerImage = res.fileDownloadUri;
          console.log(this.speakerImage);
          // alert('SUCCESS !!');
        })
    }

    createCase() {
      if(this.createCases.valid){
     let obj=this.createCases.value;
     let tags:any[]=[];
     obj.tagList.forEach(m=>{
       let tag={
         "id":m.id,
       "keywords": m.keywords,
       "name": m.name
       }
       tags.push(tag);
     });

     let dataObj={
       "isDraft":true,
       "categoryId": obj.categoryId.id,
       "longDescription": obj.longDescription,
        "person": {
        },
        "resourceType":3,
        "serviceUsed": obj.serviceUsed,
        "tagList": tags,
        "thumbnailImageUrl": this.speakerImage,
        "title": obj.title

   }

      console.log("post", dataObj);
      this.authService.saveResource(dataObj).subscribe(res=>{
        console.log(res);
        alert("Blog Added Successfully");
        this.router.navigate(['cases']);
      })
      }

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
      this.tagData.push(obj);
      this.closeModel.nativeElement.click();
    }
    else
    alert("Tag Already EXist");
    }
  }
    BackMe() {
      this.location.back(); // <-- go back to previous location on cancel
    }
  }
