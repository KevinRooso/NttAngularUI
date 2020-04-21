import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var $;
@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private service:AuthServiceService,
    public snackBar: MatSnackBar) { }
  createBlogForm:FormGroup;
  personForm:FormGroup;
  addTagForm:FormGroup;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  speakerImage: string="";
  catagoryData:any[]=[];
  tagData:any[]=[];
  persons:any[]=[];
  fruits: any[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

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
  show1:boolean=false;
  show:boolean=false;
  image1button:boolean=false;
  image2button:boolean=false;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('closebutton',{static:true}) closebutton;
  @ViewChild('closeModel',{static:true}) closeModel;
  personImage:string="";
  ngOnInit(): void {
    this.createBlogForm = this.formBuilder.group({
      title: ['',Validators.required],
      longDescription: ['',Validators.required],
      shortDescription: ['',Validators.required],
      person: ['',Validators.required],
      categoryId: ['',Validators.required],
      tagList: ['',Validators.required],
      targetUserType:['',Validators.required],
      isDraft:[false],
      expiryDate:  ['',Validators.required],
      thumbnailImageUrl: ['', [Validators.required,Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]],
    });
    let mobnum = "^((\\+91-?)|0)?[0-9]{10}$";
    this.personForm = this.formBuilder.group({
      fullName:  ['',Validators.required],
      description:  ['',Validators.required],
      designation:  ['',Validators.required],
      email:  ['',[Validators.required, Validators.email]],
      keySkills:  [''],
      origanizationName:  ['',Validators.required],


      phone:  ['',Validators.pattern(mobnum)],

      profileImageUrl:  ['', [Validators.required,Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]],
    });
    this.addTagForm = this.formBuilder.group({
      name:['',Validators.required],
      keywords:['',Validators.required],
    })
    this.getCategoryDetails();
    this.getTagsDetails();
    this.getPersons();
    this.getUserList();
    this.checkError = (controlName: string, errorName: string, checkSubmitted:boolean) => {
      if(checkSubmitted){
        if(this.submitted){
          return this.createBlogForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.createBlogForm.controls[controlName].hasError(errorName);
      }
    }
    this.checkErrorPerson = (controlName: string, errorName: string, checkSubmitted:boolean) => {
      if(checkSubmitted){
        if(this.submittedPerson){
          return this.personForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.personForm.controls[controlName].hasError(errorName);
      }
    }
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
  getPersons(){
    this.service.getPersons().subscribe(res=>{
      console.log("persons==",res);

        this.persons=res.body;
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
    this.image1button=false;
    this.show=true;
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.service.uploadFile(formData)
      .subscribe(res => {
        console.log("Image", res);
        this.speakerImage = res.fileDownloadUri;
        this.show=false;
        this.image1button=true;
        this.imageValid = false;
        this.snackBar.open('Image successfully uploaded', 'Close', {duration: 5000});
        console.log(this.speakerImage);
      },
      (error)=>{
        this.show=false;
        this.snackBar.open('Oops, Something went wrong', 'Close', { duration: 5000 });
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
    this.image2button=false;
    this.show1=true;
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.service.uploadFile(formData)
      .subscribe(res => {
        console.log("Image", res);
        this.image2button=true;
        this.show1=false;
        this.imageValid1 = false;
        this.personImage = res.fileDownloadUri;
        this.snackBar.open('Image successfully uploaded', 'Close', {duration: 5000});
        console.log(this.personImage);
      },
      (error)=>{
        this.show=false;
        this.snackBar.open('Oops, Something went wrong', 'Close', { duration: 5000 });
      })
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
  addPerson(){
    this.previewUrl1= null;
    this.personForm.reset();

  }
  generateBlog(){
    this.show=true;
    if(!this.image1button){
      this.snackBar.open('Please Upload Blog Image', 'Close', { duration: 5000 });
      this.show=false;
      return false;
    }
    let obj=this.createBlogForm.value;

      if(this.createBlogForm.valid){
    obj['thumbnailImageUrl']=this.speakerImage;

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

       "customerProfile": "",
         "detailImageUrl": "",
         "downloadUrl": "",
         "categoryId": obj.categoryId.id,
         "draft": obj.isDraft,
         "longDescription": obj.longDescription,
         "person": {
           "description": obj.person.description,
           "designation": obj.person.designation,
           "email": obj.person.email,
           "id":0,
           "fullName":obj.person.fullName,
           "keySkills":obj.person.keySkills,
           "origanizationName":obj.person.origanizationName,
           "personalEmail": obj.person.personalEmail,
           "phone":obj.person.phone,
           "profile":obj.person.profile,
           "profileImageUrl": obj.person.profileImageUrl
         },
         "targetUserType":obj.targetUserType,
         "resourceType":1,
         "serviceUsed": "",
         "shortDescription": obj.shortDescription,
         "tagList": tags,
         "thumbnailImageUrl": obj.thumbnailImageUrl,
         "title": obj.title,
         "expiryDate": this.createBlogForm.controls['expiryDate'].value

    }
    console.log(dataObj);
    this.service.saveResource(dataObj).subscribe(res=>{
      console.log(res);
      this.show=false;
      this.snackBar.open('Blog Added Successfully', 'Close', {duration: 5000});
      //alert("Blog Added Successfully");
      this.router.navigate(['blogs']);
    },
    (error) => {
      console.log("error==",error);
      this.show=false;
      this.snackBar.open(error, 'Close');
     })
  //console.log(this.createBlogForm.value);
}
else{
  this.show=false;
  this.snackBar.open('Please fill all mandatory field', 'Close', {duration: 5000});
}

}
  submitPerson(){
    let flag=false;
    this.show1=true;
    if(!this.image2button){
      this.snackBar.open('Please Upload Author Image', 'Close', { duration: 5000 });
      this.show1=false;
      return false;
    }
    if(this.personForm.valid){
    console.log(this.personForm.value);
    let fruit1 = '';
    console.log(this.fruits);
    this.fruits.forEach(m => {
      fruit1 = fruit1 + ',' + m.name;
    })
    this.persons.forEach(m=>{
        if(m.email==this.personForm.get(['email']).value){
          flag=true;
        }
    });
    if(!flag){
    let obj1=this.personForm.value;
    obj1['keySkills']=fruit1.substring(1, fruit1.length - 0);
    obj1['profileImageUrl']=this.personImage;
    obj1['id']=0;
    this.persons.unshift(obj1);
    this.closebutton.nativeElement.click();
    }
    else{
      this.show1=false;
    this.snackBar.open('Author Already Exist', 'Close', {duration: 5000});
    }
   // alert("Author Already Exist")
  }else{
    this.show1=false;
  this.snackBar.open('Please fill all mandatory field', 'Close', {duration: 5000});
  }
  //alert("Please fill all mandatory field");
  }
  createTag(){
    if(this.addTagForm.valid){
          let flag=true;
    this.tagData.forEach(m=>{
      if (m.name.toUpperCase() == this.addTagForm.get(['name']).value.toUpperCase())
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

}
