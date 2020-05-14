import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { textValidation } from 'src/app/validators/general-validators';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css'],
})
export class EditBlogComponent implements OnInit {
  createBlogForm: FormGroup;
  personForm: FormGroup;
  addTagForm: FormGroup;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  speakerImage = '';
  catagoryData: any[] = [];
  tagData: any[] = [];
  persons: any[] = [];
  fruits: any[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  selected2 = '';
  selected3 = '';
  tarUserType = '';
  selected4: string[] = [];
  blogId;
  submitBtnCaption: string;

  checkError: any;
  submitted = false;
  imageValid = false;
  checkErrorPerson: any;
  submittedPerson = false;
  imageValidPerson = false;
  previewUrl1: any = null;
  imageValid1 = false;
  userList: any[] = [];
  today = new Date();

  show1 = false;
  show = false;
  image1button = false;
  image2button = false;
  result1: string;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('closebutton', { static: true }) closebutton;
  @ViewChild('closeModel', { static: true }) closeModel;
  @ViewChild('personButton', { static: true }) personButton;
  personImage = '';
  blogData: any;
  newpersons: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: AuthServiceService,
    private actRoute: ActivatedRoute,
    private location: Location,
    public snackBar: MatSnackBar
  ) {
    this.createBlogForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      longDescription: new FormControl('', [Validators.required, textValidation(700)]),
      shortDescription: new FormControl('', [Validators.required, textValidation(80)]),
      person: ['', Validators.required],
      categoryId: [''],
      tagList: [''],
      targetUserType: ['', Validators.required],
      isDraft: [false],
      expiryDate: ['', Validators.required],
      thumbnailImageUrl: ['', [Validators.required, Validators.pattern('(.*?).(jpg|png|jpeg)$')]],
    });
    this.crateFrorm();
    this.addTagForm = this.formBuilder.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
    });

    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.createBlogForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.createBlogForm.controls[controlName].hasError(errorName);
      }
    };
    this.checkErrorPerson = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submittedPerson) {
          return this.personForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.personForm.controls[controlName].hasError(errorName);
      }
    };
  }
  crateFrorm() {
    const mobnum = '^((\\+91-?)|0)?[0-9]{10}$';
    this.personForm = this.formBuilder.group({
      fullName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(400)]),
      designation: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      email: ['', [Validators.required, Validators.email]],
      keySkills: [''],
      origanizationName: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      phone: ['', Validators.pattern(mobnum)],

      profileImageUrl: ['', [Validators.required, Validators.pattern('(.*?).(jpg|png|jpeg)$')]],
    });
  }
  ngOnInit(): void {
    this.actRoute.params.subscribe((params) => {
      this.blogId = params.page;
      this.getBlogData(params.page);
    });
  }
  getUserList() {
    this.service.getUserList().subscribe((res) => {
      this.userList = res.body;
      if (this.userList != null) {
        this.userList = this.userList.filter((m) => {
          return m.id !== 9;
        });
      }
    });
  }
  getBlogData(id) {
    this.show = true;

    const promise = this.service.getBlogById(id).toPromise();

    promise.then(
      (res) => {
        this.blogData = res.body;
        const url1 = this.blogData.thumbnailImageUrl;
        this.result1 = url1.split('/').pop().split('?')[0].slice(14, url1.length);
        this.setDraftCaption(res.body.isDraft);

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
        this.createBlogForm.controls['thumbnailImageUrl'].setValidators([Validators.pattern('(.*?).(jpg|png|jpeg)$')]);
        this.createBlogForm.controls['thumbnailImageUrl'].updateValueAndValidity();
        if (res.body.targetUserType && Object.keys(res.body.targetUserType).length) {
          this.tarUserType = res.body.targetUserType.id;
        }
        if (res.body.category && Object.keys(res.body.category).length) {
          this.selected2 = res.body.category.id;
        }

        if (res.body.person && Object.keys(res.body.person).length) {
          this.selected3 = res.body.person.id;
        }
        for (let i = 0; i < res.body.resourceTags.length; i++) {
          this.selected4.push(res.body.resourceTags[i].id);
        }

        this.speakerImage = res.body.thumbnailImageUrl;
        this.createBlogForm.get(['title']).setValue(res.body.title);
        this.createBlogForm.get(['longDescription']).setValue(res.body.longDescription);
        this.createBlogForm.get(['shortDescription']).setValue(res.body.shortDescription);
        this.createBlogForm.get(['isDraft']).setValue(res.body.isDraft);
        if (res.body.category?.id) {
          this.createBlogForm.get(['categoryId']).setValue(res.body.category.id);
        }
        if (res.body.person?.id) {
          this.createBlogForm.get(['person']).setValue(res.body.person.id);
        }
        if (res.body.targetUserType?.id) {
          this.createBlogForm.get(['targetUserType']).setValue(res.body.targetUserType.id);
        }

        this.previewUrl = res.body.thumbnailImageUrl;
        this.today = res.body.expiryDate;
        this.createBlogForm.controls['expiryDate'].setValue(res.body.expiryDate);
        this.image1button = true;
        this.getCategoryDetails();
        this.getTagsDetails();
        this.getPersons();
        this.getUserList();
        this.show = false;
      },
      (_error) => {
        this.show = false;
      }
    );
  }
  getCategoryDetails() {
    this.service.getCategoryList().subscribe((res) => {
      this.catagoryData = res.body;
    });
  }
  getTagsDetails() {
    this.service.getTagsList().subscribe((res) => {
      this.tagData = res.body;
    });
  }
  getPersons() {
    this.service.getPersons().subscribe((res) => {
      this.persons = res.body;
      for (let i = 0; i < this.persons.length; i++) {
        this.newpersons[i] = this.persons[this.persons.length - 1 - i];
      }
    });
  }

  fileProgress(fileInput: any) {
    this.previewUrl = null;
    this.imageValid = false;
    this.fileData = fileInput.target.files[0] as File;

    const img = new Image();
    img.src = window.URL.createObjectURL(this.fileData);

    if (this.fileData !== undefined) {
      this.image1button = false;
      const fileType = this.fileData.type;
      const fileSize = this.fileData.size;
      if ((fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') && fileSize < 300000) {
        this.imageValid = true;
        this.result1 = this.fileData.name;
        // this.preview();
      }
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
          this.snackBar.open('Please upload valid image type/size', 'Close', { duration: 5000 });
          this.imageValid = false;
          this.previewUrl = null;
          this.result1 = null;
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
    this.image1button = false;
    this.show = true;
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.service.uploadFile(formData).subscribe(
      (res) => {
        this.speakerImage = res.fileDownloadUri;
        this.show = false;
        this.image1button = true;
        this.imageValid = false;
        this.snackBar.open('Image successfully uploaded', 'Close', {
          duration: 5000,
        });
      },
      (_error) => {
        this.show = false;
        this.snackBar.open('Oops, Something went wrong', 'Close', {
          duration: 5000,
        });
      }
    );
  }

  fileProgress1(fileInput: any) {
    this.previewUrl1 = null;
    this.imageValid1 = false;
    this.fileData = fileInput.target.files[0] as File;
    const img = new Image();
    img.src = window.URL.createObjectURL(this.fileData);
    const fileType = this.fileData.type;
    const fileSize = this.fileData.size;
    if ((fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') && fileSize < 300000) {
      this.imageValid1 = true;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = () => {
      setTimeout(() => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        window.URL.revokeObjectURL(img.src);

        if (width === 480 && height === 240) {
          this.imageValid1 = true;
          this.preview1();
        } else {
          this.snackBar.open('Please upload valid image type/size', 'Close', {
            duration: 5000,
          });
          this.imageValid1 = false;
          this.previewUrl1 = null;
        }
      }, 20);
    };
  }

  preview1() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl1 = reader.result;
    };
  }
  uploadImage1() {
    this.image2button = false;
    this.show1 = true;
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.service.uploadFile(formData).subscribe(
      (res) => {
        this.image2button = true;
        this.show1 = false;
        this.imageValid1 = false;
        this.personImage = res.fileDownloadUri;
        this.snackBar.open('Image successfully uploaded', 'Close', {
          duration: 5000,
        });
      },
      (_error) => {
        this.show = false;
        this.snackBar.open('Oops, Something went wrong', 'Close', {
          duration: 5000,
        });
      }
    );
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
  addPerson() {
    this.router.navigate(['author-create']);
  }
  generateBlog() {
    this.show = true;
    if (!this.image1button) {
      this.snackBar.open('Please Upload Blog Image', 'Close', {
        duration: 5000,
      });
      this.show = false;
      return false;
    }
    const obj = this.createBlogForm.value;
    // if (this.createBlogForm.value.tagList.length === 0) {
    //   this.createBlogForm.controls['tagList'].setValidators(null);
    //   this.createBlogForm.controls['tagList'].updateValueAndValidity();
    // }
    this.submitted = true;
    if (this.createBlogForm.valid) {
      obj['thumbnailImageUrl'] = this.speakerImage;

      let personObj;

      this.persons.forEach((m) => {
        if (this.createBlogForm.get(['person']).value === m.id) {
          personObj = m.id;
        }
      });
      let catObj;
      if (this.createBlogForm.controls['categoryId'].value === '0') {
        catObj = null;
      } else {
        this.catagoryData.forEach((m) => {
          if (this.createBlogForm.get(['categoryId']).value === m.id) {
            catObj = m.id;
          }
        });
      }

      const tags: any[] = [];

      this.tagData.forEach((m) => {
        obj.tagList.forEach((n) => {
          if (n === m.id) {
            const tag = {
              id: m.id,
              keywords: m.keywords,
              name: m.name,
            };
            tags.push(tag);
          }
        });
      });

      const dataObj = {
        longDescription: obj.longDescription,
        categoryId: catObj,
        customerProfile: 'string',
        detailImageUrl: 'string',
        downloadUrl: '',
        id: this.blogId,
        draft: obj.isDraft,
        personId: personObj,
        shortDescription: obj.shortDescription,
        tagList: tags,
        thumbnailImageUrl: obj.thumbnailImageUrl,
        title: obj.title,
        resourceType: 1,
        targetUserType: obj.targetUserType,
        expiryDate: obj.expiryDate,
      };

      this.service.saveResource(dataObj).subscribe(
        (_res) => {
          this.show = false;
          this.snackBar.open('Blog Updated Successfully', 'Close', {
            duration: 5000,
          });
          this.router.navigate(['resources/blogs']);
        },
        (_error) => {
          this.show = false;
          this.snackBar.open('Oops, Something Went Wrong!!', 'Close', {
            duration: 5000,
          });
        }
      );
      // console.log(this.createBlogForm.value);
    } else {
      this.show = false;
      this.snackBar.open('Please fill all mandatory field', 'Close', {
        duration: 5000,
      });
    }
  }
  submitPerson() {
    let flag = false;
    if (!this.image2button) {
      this.snackBar.open('Please Upload Author Image', 'Close', {
        duration: 5000,
      });
      this.show1 = false;
      return false;
    }
    if (this.personForm.valid) {
      let fruit1 = '';

      this.fruits.forEach((m) => {
        fruit1 = fruit1 + ',' + m.name;
      });
      this.persons.forEach((m) => {
        if (m.email === this.personForm.get(['email']).value) {
          flag = true;
        }
      });
      if (!flag) {
        const obj1 = this.personForm.value;
        obj1['keySkills'] = fruit1.substring(1, fruit1.length - 0);
        obj1['profileImageUrl'] = this.personImage;
        obj1['id'] = 0;
        this.persons.unshift(obj1);
        this.closebutton.nativeElement.click();
      } else {
        this.snackBar.open('Author Already Exist', 'Close', { duration: 5000 });
      }
      // alert("Author Already Exist")
    } else {
      this.snackBar.open('Please fill all mandatory field', 'Close', {
        duration: 5000,
      });
    }
  }
  createTag() {
    if (this.addTagForm.valid) {
      let flag = true;
      this.tagData.forEach((m) => {
        if (m.name.toUpperCase() === this.addTagForm.get(['name']).value.toUpperCase()) {
          flag = false;
        }
      });
      const obj = this.addTagForm.value;
      if (flag) {
        obj['id'] = 0;
        this.tagData.unshift(obj);
        this.closeModel.nativeElement.click();
      } else {
        this.snackBar.open('Tag Already Exist', 'Close', { duration: 5000 });
      }
    }
  }
  BackMe() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  OnDraft(e) {
    if (e.checked === true) {
      this.submitBtnCaption = 'Update';
    } else {
      this.submitBtnCaption = 'Publish';
    }
  }

  setDraftCaption(isDraft: boolean) {
    if (isDraft) {
      this.submitBtnCaption = 'Update';
    } else {
      this.submitBtnCaption = 'Publish';
    }
  }
}
