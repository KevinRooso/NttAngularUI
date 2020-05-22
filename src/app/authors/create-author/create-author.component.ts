import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.css'],
})
export class CreateAuthorComponent implements OnInit {
  personForm: FormGroup;

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
  authorImage: any;

  checkError: any;
  submitted = false;
  imageValid = false;
  flag = true;
  keySkillCount = true;
  @ViewChild('chipList') chipList: MatChipList;
  resourceId: any;
  title: string;
  buttonText: string;
  authorId: any;
  authors: any;
  snackText: string;
  constructor(
    private frmbuilder: FormBuilder,
    private authService: AuthServiceService,
    private location: Location,
    public snackBar: MatSnackBar,
    private router: Router,
    private router1: ActivatedRoute
  ) {
    const mobnum = '^((\\+91-?)|0)?[0-9]{10}$';

    this.personForm = this.frmbuilder.group({
      fullName: ['', [Validators.required, Validators.maxLength(40)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      email: ['', [Validators.required, Validators.email]],
      designation: ['', [Validators.required, Validators.maxLength(50)]],
      // profile: ['', Validators.required],
      origanizationName: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.pattern(mobnum)]],
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
    // this.person();
    // this.personForm.get('keySkills').valueChanges.subscribe(
    //   // status => this.chipList.errorState = status === 'INVALID'
    //   alert();
    // );
    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.personForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.personForm.controls[controlName].hasError(errorName);
      }
    };

    this.router1.params.subscribe((params) => {
      this.resourceId = params.page;
      if (this.resourceId !== undefined) {
        this.getAuthorData();
        this.title = 'Edit Author';
        this.buttonText = 'Update Details';
        this.snackText = 'updated';
      } else {
        this.title = 'Create Author';
        this.buttonText = 'Submit Details';
        this.snackText = 'created';
      }
    });
  }

  getAuthorData() {
    this.authService.getSpeakerDetail(this.resourceId).subscribe((res) => {
      this.authors = res.body;

      this.personForm.controls['fullName'].setValue(this.authors.fullName);
      this.personForm.controls['description'].setValue(this.authors.description);
      this.personForm.controls['email'].setValue(this.authors.email);
      this.personForm.controls['designation'].setValue(this.authors.designation);
      // this.personForm.controls['profile'].setValue(this.authors.profile);
      this.personForm.controls['phone'].setValue(this.authors.phone);
      this.personForm.controls['origanizationName'].setValue(this.authors.origanizationName);
      this.personForm.controls['keySkills'].setValue(null);
      this.personForm.controls['keySkills'].setValidators(null);
      this.personForm.controls['keySkills'].updateValueAndValidity();
      const obj = this.authors.keySkills.split(',');

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < obj.length; i++) {
        this.fruits.push({ name: obj[i] });
      }

      this.personForm.controls['profileImageUrl'].setValidators(null);
      this.personForm.controls['profileImageUrl'].updateValueAndValidity();
      this.previewUrl = this.authors.profileImageUrl;
      this.authorImage = res.body.profileImageUrl;
    });
  }

  fileProgress(fileInput: any) {
    this.previewUrl = null;
    this.imageValid = false;
    this.fileData = fileInput.target.files[0] as File;
    const img = new Image();
    img.src = window.URL.createObjectURL(this.fileData);
    const fileType = this.fileData.type;
    const fileSize = this.fileData.size;
    if ((fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') && fileSize < 300000) {
      this.imageValid = true;
      // this.preview();
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
      // console.log('Image', res);
      this.authorImage = res.fileDownloadUri;
      // console.log(this.speakerImage);
      this.snackBar.open('Image successfully uploaded', 'Close', { duration: 5000 });
      // alert('SUCCESS !!');
    });
  }

  createAuthor() {
    if (this.personForm.valid) {
      let fruit1 = '';
      // console.log(this.fruits);
      this.fruits.forEach((m) => {
        fruit1 = fruit1 + ',' + m.name;
      });

      let authorId = 0;
      if (this.resourceId !== undefined) {
        authorId = this.resourceId;
      }

      const obj = {
        fullName: this.personForm.controls['fullName'].value,
        description: this.personForm.controls['description'].value,
        email: this.personForm.controls['email'].value,
        // personalEmail: this.personForm.controls['personalEmail'].value,
        designation: this.personForm.controls['designation'].value,
        // "profile": this.personForm.controls['profile'].value,
        origanizationName: this.personForm.controls['origanizationName'].value,
        phone: this.personForm.controls['phone'].value,
        keySkills: fruit1.substring(1, fruit1.length - 0),
        profileImageUrl: this.authorImage,
        id: authorId,
        personType: 'author',
      };
      // console.log('post', obj);
      this.authService.saveSpeaker(obj).subscribe(
        (_response) => {
          this.snackBar.open(`Author successfully ${this.snackText}`, 'Close', { duration: 5000 });
          // alert("Successfully Created");
          this.submitted = false;
          // console.log('response', response);
          this.router.navigate(['resources/blogs/authors']);
        },
        (_error) => {
          this.snackBar.open('Oops, Something went wrong', 'Close', {
            duration: 5000,
          });
        }
      );
    } else {
      this.snackBar.open('Please fill all mandatory input field', 'Close', { duration: 5000 });
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
