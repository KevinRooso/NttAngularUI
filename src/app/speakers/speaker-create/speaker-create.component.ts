import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CmsConstants } from 'src/app/cms-constants';

@Component({
  selector: 'app-speaker-create',
  templateUrl: './speaker-create.component.html',
  styleUrls: ['./speaker-create.component.css'],
})
export class SpeakerCreateComponent implements OnInit {
  createSpeakerForm: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  uploaded = false;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: any[] = [];
  show = false;

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  speakerImage: any;

  checkError: any;
  submitted = false;
  imageValid = false;
  flag = true;
  keySkillCount = true;
  @ViewChild('chipList') chipList: MatChipList;
  constructor(
    private frmbuilder: FormBuilder,
    private authService: AuthServiceService,
    private location: Location,
    public snackBar: MatSnackBar,
    private router: Router
  ) {
    this.createSpeakerForm = this.frmbuilder.group({
      fullName: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      email: ['', [Validators.required, Validators.email]],
      personalEmail: ['', Validators.email],
      designation: ['', [Validators.required, Validators.maxLength(50)]],
      // profile: ['', Validators.required],
      origanizationName: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.pattern(CmsConstants.mobexp)]],
      keySkills: ['', [Validators.required, Validators.maxLength(100)]],
      profileImageUrl: ['', [Validators.required, Validators.pattern('(.*?).(jpg|png|jpeg)$')]],
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
    // this.createSpeaker();
    // this.createSpeakerForm.get('keySkills').valueChanges.subscribe(
    //   // status => this.chipList.errorState = status === 'INVALID'
    //   alert();
    // );
    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.createSpeakerForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.createSpeakerForm.controls[controlName].hasError(errorName);
      }
    };
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
    this.show = true;
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.authService.uploadFile(formData).subscribe((res) => {
      this.uploaded = true;
      this.show = false;
      this.imageValid = false;
      // console.log('Image', res);
      this.speakerImage = res.fileDownloadUri;
      // console.log(this.speakerImage);
      this.snackBar.open('Image successfully uploaded', 'Close', { duration: 5000 });
      // alert('SUCCESS !!');
    });
  }

  createSpeaker() {
    if (this.uploaded) {
      if (this.createSpeakerForm.valid) {
        let fruit1 = '';
        this.show = true;
        // console.log(this.fruits);
        this.fruits.forEach((m) => {
          fruit1 = fruit1 + ',' + m.name;
        });

        const obj = {
          fullName: this.createSpeakerForm.controls['fullName'].value,
          description: this.createSpeakerForm.controls['description'].value,
          email: this.createSpeakerForm.controls['email'].value,
          personalEmail: this.createSpeakerForm.controls['personalEmail'].value,
          designation: this.createSpeakerForm.controls['designation'].value,
          // "profile": this.createSpeakerForm.controls['profile'].value,
          origanizationName: this.createSpeakerForm.controls['origanizationName'].value,
          phone: this.createSpeakerForm.controls['phone'].value,
          keySkills: fruit1.substring(1, fruit1.length - 0),
          profileImageUrl: this.speakerImage,
          personType: 'speaker',
          id: 0,
        };
        // console.log('post', obj);
        this.authService.saveSpeaker(obj).subscribe(
          (_response) => {
            this.show = false;
            this.snackBar.open('Speaker successfully created', 'Close', { duration: 5000 });
            // alert("Successfully Created");
            this.submitted = false;
            // console.log('response', response);
            this.router.navigate(['/speakers']);
          },
          (_error) => {
            this.snackBar.open('Oops, Something went wrong', 'Close', {
              duration: 5000,
            });
          }
        );
      } else {
        this.show = false;
        this.snackBar.open('Please fill all mandatory input field', 'Close', { duration: 5000 });
      }
    } else {
      this.show = false;
      this.snackBar.open('Please Upload Image', 'Close', { duration: 5000 });
    }
  }
  BackMe() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  setError() {
    if (this.fruits.length === 0) {
      this.flag = false;
    } else {
      this.flag = true;
    }
    let fruitStr = this.fruits.toString();
    fruitStr = fruitStr.replace(/,/g, '');

    if (fruitStr.length > 100) {
      this.keySkillCount = false;
    } else {
      this.keySkillCount = true;
    }
  }
}
