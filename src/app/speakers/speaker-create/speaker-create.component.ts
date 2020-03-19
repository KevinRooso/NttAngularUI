import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-speaker-create',
  templateUrl: './speaker-create.component.html',
  styleUrls: ['./speaker-create.component.css']
})
export class SpeakerCreateComponent implements OnInit {

  createSpeakerForm: FormGroup;

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

  constructor(private frmbuilder: FormBuilder, private authService: AuthServiceService) {
    this.createSpeakerForm = frmbuilder.group({
      fullName: ['', Validators.required],
      description: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      personalEmail: ['', [Validators.required, Validators.email]],
      designation: ['', Validators.required],
      profile: ['', Validators.required],
      origanizationName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      keySkills: ['', Validators.required],
      profileImageUrl: ['', Validators.required]
    });
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



  ngOnInit(): void { }

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
        alert('SUCCESS !!');
      })
  }

  createSpeaker() {
    let fruit1 = '';
    console.log(this.fruits);
    this.fruits.forEach(m => {
      fruit1 = fruit1 + ',' + m.name;
    })

    let obj = {
      "fullName": this.createSpeakerForm.controls['fullName'].value,
      "description": this.createSpeakerForm.controls['description'].value,
      "email": this.createSpeakerForm.controls['email'].value,
      "personalEmail": this.createSpeakerForm.controls['personalEmail'].value,
      "designation": this.createSpeakerForm.controls['designation'].value,
      "profile": this.createSpeakerForm.controls['profile'].value,
      "origanizationName": this.createSpeakerForm.controls['origanizationName'].value,
      "phone": this.createSpeakerForm.controls['phone'].value,
      "keySkills": fruit1.substring(1, fruit1.length - 0),
      "profileImageUrl": this.speakerImage,
      "id": 0
    }
    console.log("post", obj);
    this.authService.saveSpeaker(obj).subscribe(
      (response) => {
        alert("Successfully Created");
        console.log("response", response);
      },
      (error) => console.log(error)
    )
  }

}
