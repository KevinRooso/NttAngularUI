import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-whitepaper-edit',
  templateUrl: './whitepaper-edit.component.html',
  styleUrls: ['./whitepaper-edit.component.css']
})
export class WhitepaperEditComponent implements OnInit {

  updateWhitePaperForm: FormGroup;


  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  articleImage: any;
  attachUrl: any = null;
  attachFile: any;
  wPaperId: any;
  wPaperData: any;
  addTagForm: FormGroup;
  tagsList: string[] = [];
  articleData: any;
  articleId: any;
  articelImage: any;
  articelAttach: any;
  checkError: any;
  submitted: boolean = false;
  userList: any[] = [];
  allData: any[] = [];
  tagData: any[] = [];
  imageValid: boolean = false;
  imageValid2: boolean = false;
  selected4:any[]=[];
  valuesSelectedTag: string[] = [];
  selected3:string="";
  @ViewChild('closeModel', { static: true }) closeModel;

  constructor(private frmbuilder: FormBuilder, private location: Location, private router: Router,
    private authService: AuthServiceService, private router1: ActivatedRoute, public snackBar: MatSnackBar ) {
    this.updateWhitePaperForm = frmbuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      longDescription: new FormControl('', [Validators.required, Validators.maxLength(8000)]),
      shortDescription: new FormControl('', [Validators.required, Validators.maxLength(3000)]),
      thumbnailImageUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]),
      downloadUrl: new FormControl('', [Validators.required, Validators.pattern('(.*?)\.(pdf)$')]),
      draft: [false],
      tagList: [''],
      targetUserType: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.updateWhitePaperForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.updateWhitePaperForm.controls[controlName].hasError(errorName);
      }

    }
    this.addTagForm = frmbuilder.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
    })

  }

  ngOnInit(): void {
    this.router1.queryParams.subscribe(params => {
      console.log(params.page);
      this.wPaperId = params.page;
      this.getWhitePaperDetails(params.page);
      this.getUserList();
      this.getCategoryDetails();
      this.getTagsDetails();
    });
    // this.router1.queryParams.subscribe(params => {
    //   console.log(params.page);
    //   this.articleId = params.page;
    //   this.getArticlesDetails(params.page);
    //   this.getUserList();
    //   this.getCategoryDetails();
    //   this.getTagsDetails();
    // });
  }
  getTagsDetails() {
    this.authService.getTagsList().subscribe((res) => {
      this.tagData = res.body;
    })
  }
  getUserList() {
    this.authService.getUserList().subscribe((res) => {
      this.userList = res.body;
    })
  }
  getCategoryDetails() {
    this.authService.getCategoryList().subscribe((res) => {
      this.allData = res.body;
    })
  }

  fileProgress(fileInput: any) {
    this.previewUrl = null;
    this.imageValid = false;
    this.fileData = <File>fileInput.target.files[0];
    let fileType = this.fileData.type;
    if (fileType == 'image/jpeg' || fileType == 'image/png' || fileType == 'image/jpg') {
      this.imageValid = true;
      this.preview();
    }
  }
  fileProgress2(fileInput: any) {
    this.attachUrl = null;
    this.imageValid2 = false;
    this.fileData = <File>fileInput.target.files[0];
    let fileType = this.fileData.type;
    if (fileType == 'application/pdf') {
      this.imageValid2 = true;
      this.preview2();
    }
  }
  preview() {
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
  preview2() {
    var mimeType = this.fileData.type;
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.attachUrl = reader.result;
    }
  }
  uploadImage() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.authService.uploadFile(formData)
      .subscribe(res => {
        console.log("Image", res);
        this.articleImage = res.fileDownloadUri;
        console.log("Image", this.articleImage);
        this.snackBar.open('Image successfully uploaded', 'Close', { duration: 5000 });
      })
  }
  uploadAttachment() {
    const formData1 = new FormData();
    formData1.append('file', this.fileData);
    this.authService.uploadFile(formData1)
      .subscribe(res => {
        console.log("Image", res);
        this.attachFile = res.fileDownloadUri;
        console.log("File", this.attachFile);
        this.snackBar.open('Attachment successfully uploaded', 'Close', { duration: 5000 });
      })
  }


  getWhitePaperDetails(id){
    this.authService.getResourceById(id).subscribe((res)=>{
      this.wPaperData = res.body;
      console.log('resdata', this.wPaperData);
      // for(let i=0;i<this.wPaperData.resourceTags.length;i++){
      //   let tag = {
      //     "id": this.wPaperData.resourceTags[i].id,
      //     "keywords":this.wPaperData.resourceTags[i].keywords,
      //     "name": this.wPaperData.resourceTags[i].name
      //   }
      //   this.selected4.push(tag);
      //   console.log("tags=",this.selected4);

      // }
      // this.selected3=res.body.person.id;
      for(let i=0;i<res.body.resourceTags.length;i++)
      this.selected4.push(res.body.resourceTags[i].id);
      console.log("tags=",this.selected4);





      this.updateWhitePaperForm.controls['title'].setValue(this.wPaperData.title);
      this.updateWhitePaperForm.controls['longDescription'].setValue(this.wPaperData.longDescription);
      this.updateWhitePaperForm.controls['shortDescription'].setValue(this.wPaperData.shortDescription);
      this.updateWhitePaperForm.controls['categoryId'].setValue(this.wPaperData.category.displayName);
      this.updateWhitePaperForm.controls['tagList'].setValue(this.wPaperData.resourceTags.name);
      this.updateWhitePaperForm.controls['draft'].setValue(this.wPaperData.isDraft);

      this.updateWhitePaperForm.controls['thumbnailImageUrl'].setValidators(null);
      this.updateWhitePaperForm.controls['thumbnailImageUrl'].updateValueAndValidity();
      this.previewUrl = this.wPaperData.thumbnailImageUrl;
      this.articleImage = this.wPaperData.thumbnailImageUrl;
      this.updateWhitePaperForm.controls['downloadUrl'].setValidators(null);
      this.updateWhitePaperForm.controls['downloadUrl'].updateValueAndValidity();
      this.articelAttach = this.wPaperData.resourceLink;

      this.updateWhitePaperForm.controls['targetUserType'].setValidators(null);
      this.updateWhitePaperForm.controls['targetUserType'].updateValueAndValidity();
      this.updateWhitePaperForm.controls['targetUserType'].setValue(this.wPaperData.targetUserType.id);


      this.updateWhitePaperForm.controls['tagList'].setValidators(null);
      this.updateWhitePaperForm.controls['tagList'].updateValueAndValidity();


    })
  }
  updateWhitepaper() {
    if (this.updateWhitePaperForm.valid) {
      let tags: any[] = [];

      // this.updateWhitePaperForm.value.tagList.forEach(m => {
      //   let tag = {
      //     "id": m.id,
      //     "keywords": m.keywords,
      //     "name": m.name
      //   }
      //   tags.push(tag);
      // });
      let catId;
      this.allData.forEach(m => {
        if (m.displayName == this.updateWhitePaperForm.controls['categoryId'].value)
          catId = m.id;
      });
      console.log("cat id", catId);

      // let userId;
      // this.userList.forEach(m=>{
      //   if(m.displayName==this.EditArticleForm.controls['targetUserType'].value)
      //     userId=m.id;
      // });

      let obj = {
        "categoryId": catId,
        "customerProfile": "string",
        "detailImageUrl": "string",
        "downloadUrl": this.articelAttach,
        "id": this.wPaperId,
        "isDraft": true,
        "longDescription": this.updateWhitePaperForm.controls['longDescription'].value,
        "person": {},
        "resourceType": 5,
        "serviceUsed": "string",
        "shortDescription": this.updateWhitePaperForm.controls['shortDescription'].value,
        "tagList": tags,
        "thumbnailImageUrl": this.articleImage,
        "title": this.updateWhitePaperForm.controls['title'].value,
        "targetUserType": this.updateWhitePaperForm.controls['targetUserType'].value
      }
      console.log("post", obj);

      this.authService.saveResource(obj).subscribe(
        (response) => {
          // alert("Successfully Updated");
          console.log("response", response);
          this.snackBar.open('Whitepaper successfully updated', 'Close', { duration: 5000 });
          this.submitted = false;
        },
        (error) => {
          //alert("Error :"+error);
          this.snackBar.open(error, 'Close');
        }
      )
    }
    else {
      this.snackBar.open('Please fill all mandatory fields', 'Close', { duration: 5000 });
    }
  }
createTag() {
  if (this.addTagForm.valid) {
    let flag = true;
    this.tagData.forEach(m => {
      if (m.keywords == this.addTagForm.get(['keywords']).value)
        flag = false;
    })
    let obj = this.addTagForm.value
    if (flag) {
      obj['id'] = 0;
      this.tagData.unshift(obj);
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
