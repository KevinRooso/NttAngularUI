import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router, ActivatedRoute } from '@angular/router';
import { Location} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var $;
@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent  implements OnInit {
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
  tarUserType:string="";
  selected4:string[]=[];
  blogId;


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
  @ViewChild('personButton',{static:true}) personButton;
  personImage:string="";
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private service:AuthServiceService,
    private actRoute:ActivatedRoute,
    private location: Location,
    public snackBar: MatSnackBar) {
      this.createBlogForm = this.formBuilder.group({
        title: ['',Validators.required],
        longDescription: ['',Validators.required],
        shortDescription: ['',Validators.required],
        person: ['',Validators.required],
        categoryId: ['',Validators.required],
        tagList: ['',Validators.required],
        targetUserType:['',Validators.required],
        isDraft:[false],
      expiryDate: ['', Validators.required],
        thumbnailImageUrl: ['', [Validators.required,Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]],
      });
      this.crateFrorm();
      this.addTagForm = this.formBuilder.group({
        name:['',Validators.required],
        keywords:['',Validators.required],
      })


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
crateFrorm(){
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
}
  ngOnInit(): void {
    this.actRoute.queryParams.subscribe(params => {
      this.blogId=params.page;
      this.getBlogData(params.page);


    });


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
  getBlogData(id){
    this.show=true;
    const promise=this.service.getBlogById(id).toPromise();
    console.log("promisee===",promise);
    promise.then((res)=>{
      console.log("Promise resolved with: ", res);
      this.createBlogForm.controls['targetUserType'].setValidators(null);
      this.createBlogForm.controls['targetUserType'].updateValueAndValidity();
      this.createBlogForm.controls['tagList'].setValidators(null);
      this.createBlogForm.controls['tagList'].updateValueAndValidity();
      this.createBlogForm.controls['categoryId'].setValidators(null);
      this.createBlogForm.controls['categoryId'].updateValueAndValidity();
      this.createBlogForm.controls['person'].setValidators(null);
      this.createBlogForm.controls['person'].updateValueAndValidity();
       this.createBlogForm.controls['thumbnailImageUrl'].setValidators(null);
       this.createBlogForm.controls['thumbnailImageUrl'].updateValueAndValidity();
       this.createBlogForm.controls['thumbnailImageUrl'].setValidators([Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]);
       this.createBlogForm.controls['thumbnailImageUrl'].updateValueAndValidity();
        if(res.body.targetUserType!=null)
        this.tarUserType=res.body.targetUserType.id;
        this.selected2=res.body.category.id;
        console.log("cat==",this.selected2);

        this.selected3=res.body.person.id;
        for(let i=0;i<res.body.resourceTags.length;i++)
        this.selected4.push(res.body.resourceTags[i].id);
        console.log("selectedtags=",this.selected4);

         this.speakerImage=res.body.thumbnailImageUrl;
        this.createBlogForm.get(['title']).setValue(res.body.title);
        this.createBlogForm.get(['longDescription']).setValue(res.body.longDescription);
        this.createBlogForm.get(['shortDescription']).setValue(res.body.shortDescription);
        this.createBlogForm.get(['isDraft']).setValue(res.body.isDraft);
        this.createBlogForm.get(['categoryId']).setValue(res.body.category.id);
        this.createBlogForm.get(['person']).setValue(res.body.person.id);
        this.createBlogForm.get(['targetUserType']).setValue(res.body.targetUserType.id);
        this.previewUrl=res.body.thumbnailImageUrl;
        this.today=res.body.expiryDate;
      this.createBlogForm.controls['expiryDate'].setValue(res.body.expiryDate);
      this.image1button=true;
        this.getCategoryDetails();
        this.getTagsDetails();
        this.getPersons();
        this.getUserList();
        this.show=false;
    }, (error)=>{
      this.show=false;
      console.log("Promise rejected with ",error);
    })

  }
  getCategoryDetails(){
    this.service.getCategoryList().subscribe((res)=>{
      this.catagoryData = res.body;
      console.log("catsss=",this.catagoryData);

    })
  }
  getTagsDetails(){
    this.service.getTagsList().subscribe((res)=>{
      console.log("tagdetail",res.body);

       this.tagData=res.body;
    })
  }
  getPersons(){
    this.service.getPersons().subscribe(res=>{
      console.log("persons==",res.body);
        this.persons=res.body;

    })
  }

  fileProgress(fileInput: any) {
    this.previewUrl=null;
    this.imageValid=false;
    this.fileData = <File>fileInput.target.files[0];
    if(this.fileData!=undefined){
      this.image1button=false;
        let fileType = this.fileData.type;
        if (fileType == 'image/jpeg' || fileType == 'image/png' || fileType == 'image/jpg') {
          this.imageValid = true;
          this.preview();
        }
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
   // this.personForm.reset();
    this.crateFrorm();
    this.personButton.nativeElement.click();
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

    this.tagData.forEach(m=>{
      obj.tagList.forEach(n=>{
          if(n==m.id){
            let tag={
            "id":m.id,
            "keywords": m.keywords,
            "name": m.name
            }
            tags.push(tag);
          }
      });
    })
    let dataObj={
      "longDescription": obj.longDescription,
      "categoryId": catObj.id,
      "customerProfile": "string",
      "detailImageUrl": "string",
      "downloadUrl": "",
      "id":this.blogId,
      "draft": obj.isDraft,
      "person": personObj,
      "shortDescription": obj.shortDescription,
      "tagList": tags,
      "thumbnailImageUrl":obj.thumbnailImageUrl,
      "title": obj.title,
      "resourceType":1,
      "targetUserType":obj.targetUserType,
      "expiryDate":obj.expiryDate
    }
    console.log(dataObj);
    this.service.saveResource(dataObj).subscribe(res=>{
      console.log(res);
      this.show=false;
      this.snackBar.open('Blog Updated Successfully', 'Close', {duration: 5000});
      this.router.navigate(['blogs']);
    },
    (error)=>{
      this.show=false;
      this.snackBar.open('Oops, Something Went Wrong!!', 'Close', {duration: 5000});
    }
    )
  //console.log(this.createBlogForm.value);
  }
  else{
    this.show=false;
  this.snackBar.open('Please fill all mandatory field', 'Close', {duration: 5000});
  }
}
  submitPerson(){
    let flag=false;
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
  else
  this.snackBar.open('Author Already Exist', 'Close', {duration: 5000});
  //alert("Author Already Exist")
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
    let obj=this.addTagForm.value;
    if(flag){
      obj['id']=0;
    this.tagData.unshift(obj);
    this.closeModel.nativeElement.click();
  }
  else
  this.snackBar.open('Tag Already EXist', 'Close', {duration: 5000});

  }
}
BackMe() {
  this.location.back(); // <-- go back to previous location on cancel
}
}
