import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CmsConstants } from 'src/app/cms-constants';
@Component({
  selector: 'app-speaker-edit',
  templateUrl: './speaker-edit.component.html',
  styleUrls: ['./speaker-edit.component.css'],
})
export class SpeakerEditComponent implements OnInit {
  updateSpeakerForm: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  show = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: any[] = [];

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  speakerImage: any;
  getSpeaker: any;
  spkrID: any;
  chipsData: string[] = ['Hi', 'Hello'];

  checkError: any;
  submitted = false;
  imageValid = false;
  flag = true;
  constructor(
    private formbuilder: FormBuilder,
    private location: Location,
    private authService: AuthServiceService,
    private router1: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {
    this.updateSpeakerForm = this.formbuilder.group({
      fullName: ['', [Validators.required, Validators.maxLength(40)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      email: ['', [Validators.required, Validators.email]],
      personalEmail: ['', Validators.email],
      designation: ['', [Validators.required, Validators.maxLength(50)]],
      // profile: ['', Validators.required],
      origanizationName: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.pattern(CmsConstants.mobexp)]],
      keySkills: ['', [Validators.required, Validators.maxLength(100)]],
      profileImageUrl: ['', Validators.pattern('(.*?).(jpg|png|jpeg)$')],
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

  ngOnInit(): void {
    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.updateSpeakerForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.updateSpeakerForm.controls[controlName].hasError(errorName);
      }
    };
    this.router1.params.subscribe((params) => {
      this.spkrID = params.page;
      this.getSpeakersDetails(params.page);
    });
    // this.getSpeakersDetails(id);
  }

  fileProgress(fileInput: any) {
    this.previewUrl = null;
    this.imageValid = false;
    this.fileData = fileInput.target.files[0] as File;
    const img = new Image();
    img.src = window.URL.createObjectURL(this.fileData);
    const fileType = this.fileData.type;
    const fileSize = this.fileData.size;
    if ((fileType === 'image/jpeg' || fileType === 'image/png') && fileSize <= 300000) {
      this.imageValid = true;
      this.preview();
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = () => {
      setTimeout(() => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        window.URL.revokeObjectURL(img.src);

        if (width === 480 && height === 240) {
          this.imageValid = true;
          this.preview();
        } else {
          this.snackBar.open('Please upload valid image type/size', 'Close', {
            duration: 5000,
          });
          this.imageValid = false;
          this.previewUrl = null;
        }
      }, 50);
    };
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
    };
  }
  uploadImage() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.authService.uploadFile(formData).subscribe((res) => {
      this.speakerImage = res.fileDownloadUri;
      this.snackBar.open('Image successfully uploaded', 'Close', { duration: 5000 });
    });
  }

  getSpeakersDetails(id) {
    this.authService.getSpeakerDetail(id).subscribe((res) => {
      this.getSpeaker = res.body;
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
      const obj = this.getSpeaker.keySkills.split(',');

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < obj.length; i++) {
        this.fruits.push({ name: obj[i] });
      }

      this.previewUrl = this.getSpeaker.profileImageUrl;
      this.speakerImage = res.body.profileImageUrl;
    });
  }

  updateSpeaker() {
    if (this.updateSpeakerForm.valid) {
      let fruit1 = '';
      this.show = true;

      this.fruits.forEach((m) => {
        fruit1 = fruit1 + ',' + m.name;
      });

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
        personType: 'speaker',
        profileImageUrl: this.speakerImage,
        id: this.spkrID,
      };

      this.authService.saveSpeaker(obj).subscribe(
        (_response) => {
          this.show = false;
          this.snackBar.open('Speaker successfully updated', 'Close', { duration: 5000 });
        },
        (_error) => {
          this.show = false;
          this.snackBar.open('Oops, Something went wrong', 'Close', {
            duration: 5000,
          });
        }
      );
    } else {
      this.show = false;
      this.snackBar.open('Please fill all mandatory input field', 'Close', { duration: 5000 });
    }
  }

  Back() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  setError() {
    if (this.fruits.length === 0) {
      this.flag = false;
    } else {
      this.flag = true;
    }
  }
}
