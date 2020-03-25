import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
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
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    fruits: any[] = [];

    fileData: File = null;
    previewUrl: any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;
    speakerImage: string="";

    constructor(private frmbuilder: FormBuilder,
      private authService: AuthServiceService,
      private location: Location,
      private router:Router) {
      let mobnum = "^((\\+91-?)|0)?[0-9]{10}$";
      this.createCases = frmbuilder.group({
        title: ['', Validators.required],
        longDescription: [''],
        serviceUsed: ['', Validators.required],
        thumbnailImageUrl: ['']
      });
    }



    ngOnInit(): void {
      // this.createSpeaker();

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

     let dataObj={
       "isDraft":true,
       "longDescription": obj.longDescription,
        "person": {
        },
        "resourceType":3,
        "serviceUsed": obj.serviceUsed,
        "tagList": [],
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
    BackMe() {
      this.location.back(); // <-- go back to previous location on cancel
    }
  }
