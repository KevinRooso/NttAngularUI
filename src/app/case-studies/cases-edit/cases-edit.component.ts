import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

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

    checkError:any;
  submitted: boolean = false;
  imageValid:boolean=false;
  checkErrorPerson:any;
  submittedPerson: boolean = false;
  imageValidPerson:boolean=false;
  previewUrl1: any = null;
  imageValid1:boolean=false;
  userList:any[]=[];
  tarUserType:string="";

  today=new Date();
    @ViewChild('closeModel',{static:true}) closeModel;
    constructor(private frmbuilder: FormBuilder,
      private authService: AuthServiceService,
       private location: Location,
       private actRoute:ActivatedRoute,
       private router:Router,
       public snackBar: MatSnackBar) {
      let mobnum = "^((\\+91-?)|0)?[0-9]{10}$";
      this.createCases = frmbuilder.group({
        title: ['', Validators.required],
        longDescription: ['', Validators.required],
        categoryId: ['', Validators.required],
        tagList: ['', Validators.required],
        serviceUsed: ['', Validators.required],
        targetUserType:['',Validators.required],
        thumbnailImageUrl: ['', [Validators.required,Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]],
        isDraft:[false],
        expiryDate: ['', Validators.required]
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
        if(this.userList!=null)
        this.userList=this.userList.filter(m=>{
          return m.id!=9;
        })
      })
    }
    getCasesData(id){
      this.authService.getBlogById(id).subscribe(res=>{
        console.log("4");

        console.log(res);

        this.selected2=res.body.category.id;

        this.selected3=res.body.person.id;


        if(res.body.targetUserType!=null)
        this.tarUserType=res.body.targetUserType.id;
        this.createCases.controls['targetUserType'].setValidators(null);
      this.createCases.controls['targetUserType'].updateValueAndValidity();

      this.createCases.controls['categoryId'].setValidators(null);
      this.createCases.controls['categoryId'].updateValueAndValidity();
      this.createCases.controls['tagList'].setValidators(null);
      this.createCases.controls['tagList'].updateValueAndValidity();
      // this.createCases.controls['person'].setValidators(null);
      // this.createCases.controls['person'].updateValueAndValidity();
      this.createCases.controls['thumbnailImageUrl'].setValidators(null);
      this.createCases.controls['thumbnailImageUrl'].updateValueAndValidity();
      this.createCases.controls['thumbnailImageUrl'].setValidators([Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]);
      this.createCases.controls['thumbnailImageUrl'].updateValueAndValidity();
        this.previewUrl=res.body.thumbnailImageUrl;
        this.speakerImage=res.body.thumbnailImageUrl;
        this.createCases.get(['title']).setValue(res.body.title);
        this.createCases.get(['longDescription']).setValue(res.body.longDescription);
        this.createCases.get(['serviceUsed']).setValue(res.body.serviceUsed);
        this.createCases.get(['categoryId']).setValue(res.body.category.id);
       // this.createCases.get(['thumbnailImageUrl']).setValue(res.body.thumbnailImageUrl);
       for(let i=0;i<res.body.resourceTags.length;i++)
        this.selected4.push(res.body.resourceTags[i].id);
        this.tarUserType=res.body.targetUserType.id;
        console.log("tarus===",this.tarUserType);
        this.today=res.body.expiryDate;
        this.createCases.controls['expiryDate'].setValue(res.body.expiryDate);
       this.getCategoryDetails();
       this.getTagsDetails();
       this.getUserList();
      })
    }
    getCategoryDetails(){
      this.authService.getCategoryList().subscribe((res)=>{
        console.log("1");
        console.log("cat=",res.body);

        this.catagoryData = res.body;


      })
    }
    getTagsDetails(){


      this.authService.getTagsList().subscribe((res)=>{
        console.log("2");
      console.log("tagss==",res.body);
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
     let catObj;
     this.catagoryData.forEach(m=>{
       if(this.createCases.get(['categoryId']).value==m.id)
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
       "isDraft":obj.isDraft,
       "id":this.caseId,
       "categoryId": catObj.id,
       "longDescription": obj.longDescription,
        "person": {
        },
        "resourceType":3,
        "serviceUsed": obj.serviceUsed,
        "tagList": tags,
        "targetUserType":obj.targetUserType,
        "thumbnailImageUrl": this.speakerImage,
        "title": obj.title,
        "expiryDate":obj.expiryDate
   }
      console.log("post", dataObj);
      this.authService.saveResource(dataObj).subscribe(res=>{
        console.log(res);
        this.snackBar.open('Case Study Updated Successfully', 'Close', {duration: 5000});
        //alert("Case Study Updated Successfully");
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
