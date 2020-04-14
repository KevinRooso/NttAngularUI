import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    constructor(private formbuilder: FormBuilder,
      private authService: AuthServiceService,
      private location: Location,
      private router:Router,
      public snackBar: MatSnackBar) {

    }



    ngOnInit(): void {
      // this.createSpeaker();
      let mobnum = "^((\\+91-?)|0)?[0-9]{10}$";
      this.createCases = this.formbuilder.group({
        title: ['', Validators.required],
        longDescription: ['', Validators.required],
        categoryId: ['', Validators.required],
        tagList: ['', Validators.required],
        serviceUsed: ['', Validators.required],
        targetUserType:['',Validators.required],
        expiryDate:['',Validators.required],
        thumbnailImageUrl: ['', [Validators.required,Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]],
        isDraft:[false]
      });
      this.addTagForm = this.formbuilder.group({
        name:['',Validators.required],
        keywords:['',Validators.required],
      })
      this.getCategoryDetails();
      this.getTagsDetails();
      this.getUserList();
      this.checkError = (controlName: string, errorName: string, checkSubmitted:boolean) => {
        if(checkSubmitted){
          if(this.submitted){
            return this.createCases.controls[controlName].hasError(errorName);
          }
        } else {
          return this.createCases.controls[controlName].hasError(errorName);
        }
      }
    }
    getUserList() {
      this.authService.getUserList().subscribe((res) => {
        this.userList = res.body;
      })
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
      this.authService.uploadFile(formData)
        .subscribe(res => {
          console.log("Image", res);
          this.speakerImage = res.fileDownloadUri;
          this.snackBar.open('Image successfully uploaded', 'Close', {duration: 5000});
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
       "isDraft":obj.isDraft,
       "categoryId": obj.categoryId.id,
       "longDescription": obj.longDescription,
        "person": {
        },
        "resourceType":3,
        "serviceUsed": obj.serviceUsed,
        "tagList": tags,
        "targetUserType":obj.targetUserType,
        "thumbnailImageUrl": this.speakerImage,
        "title": obj.title,
        "expiryDate": this.createCases.controls['expiryDate'].value


   }

      console.log("post", dataObj);
      this.authService.saveResource(dataObj).subscribe(res=>{
        console.log(res);
      this.snackBar.open('Case Study Added Successfully', 'Close', {duration: 5000});
        //alert("Blog Added Successfully");
        this.router.navigate(['cases']);
      })
      }
      else
      this.snackBar.open('Please fill all mandatory field', 'Close', {duration: 5000});
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
    this.snackBar.open('Tag Already EXist', 'Close', {duration: 5000});
   // alert("Tag Already EXist");
    }
  }
    BackMe() {
      this.location.back(); // <-- go back to previous location on cancel
    }
  }
