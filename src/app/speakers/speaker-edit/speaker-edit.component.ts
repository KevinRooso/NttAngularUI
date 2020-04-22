import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-speaker-edit',
  templateUrl: './speaker-edit.component.html',
  styleUrls: ['./speaker-edit.component.css']
})
export class SpeakerEditComponent implements OnInit {
  updateSpeakerForm: FormGroup;

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
  speakerImage: any;
  getSpeaker: any;
  spkrID: any;
  chipsData: string[]=['Hi','Hello'];

  checkError:any;
  submitted = false;
  imageValid =false;
  flag=true;
  constructor(private formbuilder: FormBuilder, private location: Location, private router: Router, private authService: AuthServiceService, private router1: ActivatedRoute, public snackBar: MatSnackBar ) {
    const mobnum = '^((\\+91-?)|0)?[0-9]{10}$';
    this.updateSpeakerForm=formbuilder.group({
      fullName: ['', Validators.required],
      description: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      personalEmail: ['', Validators.email],
      designation: ['', Validators.required],
      // profile: ['', Validators.required],
      origanizationName: ['', Validators.required],
      phone: ['',[Validators.required, Validators.pattern(mobnum)]],
      keySkills: ['', Validators.required],
      profileImageUrl: ['', Validators.pattern('(.*?)\.(jpg|png|jpeg)$')]
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

  ngOnInit(): void {
    this.checkError = (controlName: string, errorName: string, checkSubmitted:boolean) => {
      if(checkSubmitted){
        if(this.submitted){
          return this.updateSpeakerForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.updateSpeakerForm.controls[controlName].hasError(errorName);
      }

    }
    this.router1.queryParams.subscribe(params => {
      console.log(params.page);
      this.spkrID = params.page;
      this.getSpeakersDetails(params.page);
    });
    // this.getSpeakersDetails(id);
   }

   fileProgress(fileInput: any) {
    this.previewUrl=null;
    this.imageValid=false;
    this.fileData = fileInput.target.files[0] as File;
    const fileType=this.fileData.type;
     if(fileType=='image/jpeg' || fileType=='image/png'){
      this.imageValid=true;
    this.preview();
    }
  }
  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
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
        console.log('Image', res);
        this.speakerImage = res.fileDownloadUri;
       this.snackBar.open('Image successfully uploaded', 'Close', {duration: 5000});
        console.log(this.speakerImage);
        // alert('SUCCESS !!');
      })
  }

  getSpeakersDetails(id){
    this.authService.getSpeakerDetail(id).subscribe((res)=>{
      this.getSpeaker = res.body;
      console.log('resdata', this.getSpeaker);
      this.updateSpeakerForm.controls['fullName'].setValue(this.getSpeaker.fullName);
      this.updateSpeakerForm.controls['description'].setValue(this.getSpeaker.description);
      this.updateSpeakerForm.controls['email'].setValue(this.getSpeaker.email);
      this.updateSpeakerForm.controls['personalEmail'].setValue(this.getSpeaker.personalEmail);
      this.updateSpeakerForm.controls['designation'].setValue(this.getSpeaker.designation);
      // this.updateSpeakerForm.controls['profile'].setValue(this.getSpeaker.profile);
      this.updateSpeakerForm.controls['phone'].setValue(this.getSpeaker.phone);
      this.updateSpeakerForm.controls['origanizationName'].setValue(this.getSpeaker.origanizationName);
      this.updateSpeakerForm.controls['keySkills'].setValue(null);
      this.updateSpeakerForm.controls['keySkills'].setValidators(null);
      this.updateSpeakerForm.controls['keySkills'].updateValueAndValidity();
      const obj =this.getSpeaker.keySkills.split(',');
      for(let i=0;i<obj.length;i++){
        this.fruits.push({name:obj[i]});
      }
      console.log('Check ME', this.fruits);
      this.previewUrl = this.getSpeaker.profileImageUrl;
      this.speakerImage = res.body.profileImageUrl;


    })
  }

  updateSpeaker(){
    if(this.updateSpeakerForm.valid){
    let fruit1 = '';
    console.log(this.fruits);
    this.fruits.forEach(m => {
      fruit1 = fruit1 + ',' + m.name;
    })

    const obj = {
      fullName: this.updateSpeakerForm.controls['fullName'].value,
      description: this.updateSpeakerForm.controls['description'].value,
      email: this.updateSpeakerForm.controls['email'].value,
      personalEmail: this.updateSpeakerForm.controls['personalEmail'].value,
      designation: this.updateSpeakerForm.controls['designation'].value,
      // "profile": this.updateSpeakerForm.controls['profile'].value,
      origanizationName: this.updateSpeakerForm.controls['origanizationName'].value,
      phone: this.updateSpeakerForm.controls['phone'].value,
      keySkills: fruit1.substring(1, fruit1.length - 0),
      profileImageUrl: this.speakerImage,
      id: this.spkrID
    }
    console.log('post', obj);
    this.authService.saveSpeaker(obj).subscribe(
      (response) => {
        this.snackBar.open('Speaker successfully updated', 'Close', {duration: 5000});
        // alert("Successfully Updated");
        console.log('response', response);
      },
      (error) => {
        this.snackBar.open(error, 'Close');
      }
    )
  }
  else {
    this.snackBar.open('Please fill all mandatory input field', 'Close', {duration: 5000});
  }
  }

  Back() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  setError(){
    if(this.fruits.length==0) {
      this.flag=false;
    }
      else {
      this.flag=true;
    }
   }
}

