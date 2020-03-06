import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators, FormControlName} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-speaker-create',
  templateUrl: './speaker-create.component.html',
  styleUrls: ['./speaker-create.component.css']
})
export class SpeakerCreateComponent implements OnInit {

  createSpeakerForm: FormGroup;
  name: string = '';
  description: string= '';
  email: string = '';
  details: string = '';
  contact: number = null;
  company: string = '';
  designation: string= '';
  keyskills: string = '';


  // public imagePath;
  // imgURL: any;
  // public message: string;
  // preview(files) {
  //   if (files.length === 0)
  //     return;
  //   var mimeType = files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.message = "Only images are supported.";
  //     return;
  //   }
  //   var reader = new FileReader();
  //   this.imagePath = files;
  //   reader.readAsDataURL(files[0]);
  //   reader.onload = (_event) => {
  //     this.imgURL = reader.result;
  //   }
  // }

  constructor(private formbuilder: FormBuilder) {
    this.createSpeakerForm=formbuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      email: ['', Validators.required],
      details: ['', Validators.required],
      contact: ['', Validators.required],
      company: ['', Validators.required],
      designation: ['', Validators.required],
      keyskills: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  createSpeaker(createSpeakerForm:any){

    console.log(this.createSpeakerForm.value);
    if (createSpeakerForm.valid){
      alert("Successfully Generated");
    }else{
      alert("Please Fill All field first");
    }
  }


}
