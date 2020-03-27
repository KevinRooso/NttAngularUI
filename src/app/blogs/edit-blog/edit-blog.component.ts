import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router, ActivatedRoute } from '@angular/router';
import { Location} from '@angular/common';
declare var $;
@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent  implements OnInit {

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private service:AuthServiceService,
    private actRoute:ActivatedRoute,
    private location: Location) { }
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
  selected2:string="";
  selected3:string="";
  selected4:string[]=[];
  blogId;
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
      tagList: [''],
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
    this.actRoute.queryParams.subscribe(params => {
      this.blogId=params.page;
      this.getBlogData(params.page);
    });
    this.getCategoryDetails();
    this.getTagsDetails();
    this.getPersons();

  }
  getBlogData(id){
      this.service.getBlogById(id).subscribe(res=>{
        console.log("blog=",res);
        this.selected2=res.body.category.id;
        console.log("catg=",res.body.category.id);
        console.log("person=",res.body.person.id);

        this.selected3=res.body.person.id;
        for(let i=0;i<res.body.resourceTags.length;i++)
        this.selected4.push(res.body.resourceTags[i].name);
        console.log("tags=",this.selected4);

         this.speakerImage=res.body.thumbnailImageUrl;
        this.createBlogForm.get(['title']).setValue(res.body.title);
        this.createBlogForm.get(['longDescription']).setValue(res.body.longDescription);
        this.createBlogForm.get(['shortDescription']).setValue(res.body.shortDescription);
        this.createBlogForm.get(['categoryId']).setValue(res.body.category.id);
        this.createBlogForm.get(['person']).setValue(res.body.person.id);
        this.previewUrl=res.body.thumbnailImageUrl;
        //this.createBlogForm.get(['thumbnailImageUrl']).setValue(res.body.thumbnailImageUrl);
        // this.createBlogForm.get(['title']).setValue(res.body.title);
      })
  }
  getCategoryDetails(){
    this.service.getCategoryList().subscribe((res)=>{
      this.catagoryData = res.body;
      console.log("cat=",this.catagoryData);

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
    console.log("tags=",obj.tagList);
    let personObj;

    this.persons.forEach(m=>{
     if(this.createBlogForm.get(['person']).value==m.id)
      personObj=m;
    })
    let catObj;
    this.catagoryData.forEach(m=>{
      if(this.createBlogForm.get(['categoryId']).value==m.id)
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
      "longDescription": obj.longDescription,
      "categoryId": catObj.id,
      "customerProfile": "string",
      "detailImageUrl": "string",
      "downloadUrl": "",
      "id":this.blogId,
      "isDraft": true,
      "person": personObj,
      "shortDescription": obj.longDescription,
      "tagList": tags,
      "thumbnailImageUrl":obj.thumbnailImageUrl,
      "title": obj.title,
      "resourceType":1,
    }
    console.log(dataObj);
    this.service.saveResource(dataObj).subscribe(res=>{
      console.log(res);
      alert("Blog Updated Successfully");
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
    this.persons.push(obj1);
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