import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private service:AuthServiceService) { }
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
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('closebutton',{static:true}) closebutton;
  @ViewChild('closeModel',{static:true}) closeModel;
  personImage:string="";
  ngOnInit(): void {
    this.createBlogForm = this.formBuilder.group({
      title: ['',Validators.required],
      longDescription: [''],
      shortDescription: [''],
      person: [''],
      categoryId: ['',Validators.required],
      tagList: ['',Validators.required],
      thumbnailImageUrl: [''],
    });
    let mobnum = "^((\\+91-?)|0)?[0-9]{10}$";
    this.personForm = this.formBuilder.group({
      fullName:  ['',Validators.required],
      description:  ['',Validators.required],
      designation:  [''],
      email:  ['',[Validators.required, Validators.email]],
      keySkills:  [''],
      origanizationName:  [''],
      personalEmail:  [''],
      phone:  ['',[Validators.required, Validators.pattern(mobnum)]],
      profile:  [''],
      profileImageUrl:  [''],
    });
    this.addTagForm = this.formBuilder.group({
      name:['',Validators.required],
      keywords:['',Validators.required],
    })
    this.getCategoryDetails();
    this.getTagsDetails();
    this.getPersons();
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
        this.persons=res.body;
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

  fileProgress1(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
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
      this.previewUrl = reader.result;
    }
  }
  uploadImage1() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.service.uploadFile(formData)
      .subscribe(res => {
        console.log("Image", res);
        this.personImage = res.fileDownloadUri;
        console.log(this.personImage);
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

  }
  generateBlog(){
    let obj=this.createBlogForm.value;
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
         "isDraft": true,
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
         "resourceType":1,
         "serviceUsed": "",
         "shortDescription": obj.longDescription,
         "tagList": tags,
         "thumbnailImageUrl": obj.thumbnailImageUrl,
         "title": obj.title

    }
    console.log(dataObj);
    this.service.saveResource(dataObj).subscribe(res=>{
      console.log(res);
      alert("Blog Added Successfully");
      this.router.navigate(['blogs']);
    })
  //console.log(this.createBlogForm.value);


}
  submitPerson(){
    let flag=false;
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
    else
    alert("Author Already Exist")
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
    this.tagData.unshift(obj);
    this.closeModel.nativeElement.click();
  }
  else
  alert("Tag Already EXist");
  }
}

}
