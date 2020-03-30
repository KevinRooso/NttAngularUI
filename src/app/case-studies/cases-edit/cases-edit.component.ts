import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location} from '@angular/common';

@Component({
  selector: 'app-cases-edit',
  templateUrl: './cases-edit.component.html',
  styleUrls: ['./cases-edit.component.css']
})
export class CasesEditComponent implements OnInit {

  createCases: FormGroup;
  addTagForm:FormGroup;
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    fruits: any[] = [];
    tagData:any[]=[];
    fileData: File = null;
    previewUrl: any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;
    speakerImage: string="";
    caseId;
    selected2:string="";
    selected3:string="";
    selected4:string[]=[];
    catagoryData:any[]=[];
    @ViewChild('closeModel',{static:true}) closeModel;
    constructor(private frmbuilder: FormBuilder,
      private authService: AuthServiceService,
       private location: Location,
       private actRoute:ActivatedRoute,
       private router:Router) {
      let mobnum = "^((\\+91-?)|0)?[0-9]{10}$";
      this.createCases = frmbuilder.group({
        title: ['', Validators.required],
        longDescription: [''],
        categoryId: [''],
        tagList: [''],
        serviceUsed: ['', Validators.required],
        thumbnailImageUrl: ['']
      });
      this.addTagForm = this.frmbuilder.group({
        name:['',Validators.required],
        keywords:['',Validators.required],
      })
    }



    ngOnInit(): void {
      // this.createSpeaker();
      this.actRoute.queryParams.subscribe(params => {
      this.caseId=params.page;
        this.getCasesData(params.page);
      });
      this.getCategoryDetails();
      this.getTagsDetails();
    }
    getCasesData(id){
      this.authService.getBlogById(id).subscribe(res=>{
        console.log(res);
        console.log("blog=",res);
        this.selected2=res.body.category.id;
        console.log("catg=",res.body.category.id);
        console.log("person=",res.body.person.id);

        this.selected3=res.body.person.id;
        for(let i=0;i<res.body.resourceTags.length;i++)
        this.selected4.push(res.body.resourceTags[i].name);
        console.log("tags=",this.selected4);

        this.previewUrl=res.body.thumbnailImageUrl;
        this.speakerImage=res.body.thumbnailImageUrl;
        this.createCases.get(['title']).setValue(res.body.title);
        this.createCases.get(['longDescription']).setValue(res.body.longDescription);
        this.createCases.get(['serviceUsed']).setValue(res.body.serviceUsed);
        this.createCases.get(['categoryId']).setValue(res.body.category.id);
        this.createCases.get(['thumbnailImageUrl']).setValue(res.body.thumbnailImageUrl);

      })
    }
    getCategoryDetails(){
      this.authService.getCategoryList().subscribe((res)=>{
        this.catagoryData = res.body;
        console.log("cat=",this.catagoryData);

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
     let catObj;
     this.catagoryData.forEach(m=>{
       if(this.createCases.get(['categoryId']).value==m.id)
       catObj=m;

     })

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
       "id":this.caseId,
       "categoryId": catObj.id,
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
        alert("Case Study Updated Successfully");
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
      let obj=this.addTagForm.value;
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
